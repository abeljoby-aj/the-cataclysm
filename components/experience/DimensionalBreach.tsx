"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { palette } from "@/config/experience";
import { createFracturedPlate, createScratchTexture } from "@/lib/geometry";
import { membraneFragment, membraneVertex } from "@/lib/shaders";
import { mulberry32 } from "@/lib/random";
import { sceneState } from "@/lib/stage";

interface PlateData {
  geometry: THREE.BufferGeometry;
  material: THREE.Material;
  dirX: number;
  dirY: number;
  baseZ: number;
  baseRot: number;
  phase: number;
  push: number;
  layer: "inner" | "outer";
}

export default function DimensionalBreach({ segments }: { segments: number }) {
  const group = useRef<THREE.Group>(null);
  const plateRefs = useRef<(THREE.Mesh | null)[]>([]);
  const light = useRef<THREE.PointLight>(null);
  const { camera, size } = useThree();

  const { plates, materials, scratch, uniforms, membrane } = useMemo(() => {
    const scratch = createScratchTexture();
    const common = { flatShading: true, roughnessMap: scratch } as const;
    const materials = [
      new THREE.MeshStandardMaterial({ ...common, color: palette.steel, metalness: 0.92, roughness: 0.55 }),
      new THREE.MeshStandardMaterial({ ...common, color: palette.gunmetal, metalness: 0.8, roughness: 0.7 }),
      new THREE.MeshStandardMaterial({ ...common, color: "#7b857e", metalness: 0.95, roughness: 0.42 }),
    ];
    const rnd = mulberry32(4107);
    const list: PlateData[] = [];
    const step = (Math.PI * 2) / segments;
    for (let i = 0; i < segments; i++) {
      const a0 = i * step + step * 0.06;
      const a1 = (i + 1) * step - step * (0.05 + rnd() * 0.1);
      const mid = (a0 + a1) / 2;
      const big = i % 5 === 0;
      list.push({
        geometry: createFracturedPlate(100 + i, a0, a1, 3.1 + rnd() * 0.25, big ? 5.1 : 4.2 + rnd() * 0.5, 0.5 + rnd() * 0.9),
        material: materials[i % 7 === 0 ? 2 : i % 3 === 0 ? 1 : 0],
        dirX: Math.cos(mid),
        dirY: Math.sin(mid),
        baseZ: (rnd() - 0.5) * 1.1,
        baseRot: (rnd() - 0.5) * 0.05,
        phase: rnd() * 6.28,
        push: 0.25 + rnd() * 0.6,
        layer: "inner",
      });
    }
    const outerCount = Math.max(6, Math.round(segments / 3));
    const ostep = (Math.PI * 2) / outerCount;
    for (let i = 0; i < outerCount; i++) {
      const a0 = i * ostep + rnd() * 0.15;
      const a1 = a0 + ostep * (0.45 + rnd() * 0.35);
      const mid = (a0 + a1) / 2;
      list.push({
        geometry: createFracturedPlate(500 + i, a0, a1, 6.0 + rnd() * 0.8, 7.2 + rnd() * 2.2, 0.8 + rnd() * 1.4),
        material: materials[1],
        dirX: Math.cos(mid),
        dirY: Math.sin(mid),
        baseZ: -2.2 - rnd() * 3,
        baseRot: (rnd() - 0.5) * 0.12,
        phase: rnd() * 6.28,
        push: 0.8 + rnd(),
        layer: "outer",
      });
    }
    const uniforms = {
      uTime: { value: 0 },
      uBreach: { value: 0 },
      uPulse: { value: 0 },
      uFlash: { value: 0 },
      uIntro: { value: 0 },
      uPulseOrigin: { value: new THREE.Vector2() },
    };
    const membrane = new THREE.ShaderMaterial({
      vertexShader: membraneVertex,
      fragmentShader: membraneFragment,
      uniforms,
      blending: THREE.AdditiveBlending,
      transparent: true,
      depthWrite: false,
    });
    return { plates: list, materials, scratch, uniforms, membrane };
  }, [segments]);

  useEffect(
    () => () => {
      plates.forEach((p) => p.geometry.dispose());
      materials.forEach((m) => m.dispose());
      scratch.dispose();
      membrane.dispose();
    },
    [plates, materials, scratch, membrane],
  );

  const c = useMemo(() => new THREE.Vector3(), []);
  const e = useMemo(() => new THREE.Vector3(), []);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const { intro, breach, flash, pulse } = sceneState;
    uniforms.uTime.value = t;
    uniforms.uBreach.value = breach;
    uniforms.uIntro.value = intro;
    uniforms.uPulse.value = pulse;
    uniforms.uFlash.value = flash;

    if (pulse > 0 && group.current) {
      group.current.updateWorldMatrix(true, false);
      c.setFromMatrixPosition(group.current.matrixWorld).project(camera);
      e.set(3, 0, 0).applyMatrix4(group.current.matrixWorld).project(camera);
      const rN = Math.max(0.0001, Math.abs(e.x - c.x));
      uniforms.uPulseOrigin.value.set((sceneState.pulseX - c.x) / rN, ((sceneState.pulseY - c.y) * size.height) / (rN * size.width));
    }

    plates.forEach((p, i) => {
      const mesh = plateRefs.current[i];
      if (!mesh) return;
      const off = breach * p.push * (p.layer === "outer" ? 1.2 : 0.55) + pulse * 0.12;
      const scaleIn = 0.55 + 0.45 * intro;
      mesh.position.set(p.dirX * off, p.dirY * off, p.baseZ + Math.sin(t * 0.22 + p.phase) * 0.12 - (1 - intro) * 2);
      mesh.rotation.z = p.baseRot + Math.sin(t * 0.13 + p.phase) * 0.012 * breach;
      mesh.scale.setScalar(scaleIn);
    });

    if (light.current) light.current.intensity = intro * 6 + breach * 90 + flash * 160 + pulse * 40;
  });

  return (
    <group ref={group}>
      {plates.map((p, i) => (
        <mesh key={i} ref={(m) => { plateRefs.current[i] = m; }} geometry={p.geometry} material={p.material} />
      ))}
      <mesh position={[0, 0, -0.35]} material={membrane}>
        <circleGeometry args={[3, 96]} />
      </mesh>
      <pointLight ref={light} position={[0, 0, 1.6]} color={palette.emerald} distance={28} decay={1.6} />
    </group>
  );
}
