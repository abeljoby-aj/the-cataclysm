"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { createShard } from "@/lib/geometry";
import { mulberry32 } from "@/lib/random";
import { sceneState } from "@/lib/stage";

interface Item {
  base: THREE.Vector3;
  rot: THREE.Euler;
  spin: THREE.Vector3;
  scale: THREE.Vector3;
  offset: THREE.Vector3;
  velocity: THREE.Vector3;
  phase: number;
}

const GEOMETRY_SEEDS = [11, 23, 37];

// Three distinct shard silhouettes rendered as three InstancedMeshes: low draw-call count, varied shapes.
export default function DebrisField({ count }: { count: number }) {
  const meshes = useRef<(THREE.InstancedMesh | null)[]>([]);
  const { camera, pointer } = useThree();

  const { geometries, material, groups } = useMemo(() => {
    const rnd = mulberry32(7771);
    const geometries = GEOMETRY_SEEDS.map((s, i) => createShard(s, i === 2 ? 1 : 0));
    const material = new THREE.MeshStandardMaterial({ color: "#3a4440", metalness: 0.9, roughness: 0.5, flatShading: true });
    const groups: Item[][] = [[], [], []];
    for (let i = 0; i < count; i++) {
      const ang = rnd() * Math.PI * 2;
      const radius = 5.4 + Math.pow(rnd(), 0.8) * 11;
      const big = rnd() > 0.9;
      const s = (big ? 0.9 : 0.14) + rnd() * (big ? 0.8 : 0.5);
      groups[i % 3].push({
        base: new THREE.Vector3(Math.cos(ang) * radius * 1.15, Math.sin(ang) * radius * 0.75, -6 + rnd() * 12),
        rot: new THREE.Euler(rnd() * 6, rnd() * 6, rnd() * 6),
        spin: new THREE.Vector3((rnd() - 0.5) * 0.18, (rnd() - 0.5) * 0.18, (rnd() - 0.5) * 0.12),
        scale: new THREE.Vector3(s, s * (0.8 + rnd() * 1.6), s * (0.6 + rnd() * 0.8)),
        offset: new THREE.Vector3(),
        velocity: new THREE.Vector3(),
        phase: rnd() * 6.28,
      });
    }
    return { geometries, material, groups };
  }, [count]);

  useEffect(() => {
    const color = new THREE.Color();
    groups.forEach((items, g) => {
      const mesh = meshes.current[g];
      if (!mesh) return;
      items.forEach((_, i) => {
        const l = 0.55 + Math.random() * 0.9;
        mesh.setColorAt(i, color.setRGB(l, l * 1.03, l));
      });
      if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    });
    return () => {
      geometries.forEach((g) => g.dispose());
      material.dispose();
    };
  }, [groups, geometries, material]);

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const world = useMemo(() => new THREE.Vector3(), []);
  const ray = useMemo(() => new THREE.Vector3(), []);

  useFrame(({ clock }, delta) => {
    const dt = Math.min(delta, 0.05);
    const t = clock.elapsedTime;
    // Pointer position on the z=0 plane for localized repulsion.
    ray.set(pointer.x, pointer.y, 0.5).unproject(camera).sub(camera.position).normalize();
    const dist = -camera.position.z / ray.z;
    world.copy(camera.position).addScaledVector(ray, dist);

    groups.forEach((items, g) => {
      const mesh = meshes.current[g];
      if (!mesh) return;
      items.forEach((it, i) => {
        const px = it.base.x + it.offset.x;
        const py = it.base.y + it.offset.y;
        const dx = px - world.x;
        const dy = py - world.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 9) {
          const f = (1 - d2 / 9) * 7 * dt;
          it.velocity.x += (dx / (Math.sqrt(d2) + 0.2)) * f;
          it.velocity.y += (dy / (Math.sqrt(d2) + 0.2)) * f;
        }
        // Spring back to rest with damping.
        it.velocity.x += -it.offset.x * 2.2 * dt;
        it.velocity.y += -it.offset.y * 2.2 * dt;
        it.velocity.multiplyScalar(1 - 2.4 * dt);
        it.offset.addScaledVector(it.velocity, dt * 6);

        const breachPush = sceneState.breach * 0.6 + sceneState.pulse * 0.5;
        dummy.position.set(
          it.base.x * (1 + breachPush * 0.06) + it.offset.x,
          it.base.y * (1 + breachPush * 0.06) + it.offset.y + Math.sin(t * 0.25 + it.phase) * 0.25,
          it.base.z,
        );
        dummy.rotation.set(it.rot.x + t * it.spin.x, it.rot.y + t * it.spin.y, it.rot.z + t * it.spin.z);
        dummy.scale.copy(it.scale).multiplyScalar(0.4 + 0.6 * sceneState.intro);
        dummy.updateMatrix();
        mesh.setMatrixAt(i, dummy.matrix);
      });
      mesh.instanceMatrix.needsUpdate = true;
    });
  });

  return (
    <group>
      {groups.map((items, g) => (
        <instancedMesh
          key={g}
          ref={(m) => { meshes.current[g] = m; }}
          args={[geometries[g], material, items.length]}
          frustumCulled={false}
        />
      ))}
    </group>
  );
}
