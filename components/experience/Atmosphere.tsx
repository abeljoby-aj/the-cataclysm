"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { palette } from "@/config/experience";
import { mulberry32 } from "@/lib/random";
import { shaftFragment, shaftVertex } from "@/lib/shaders";
import { sceneState } from "@/lib/stage";

export default function Atmosphere({ dust }: { dust: number }) {
  const points = useRef<THREE.Points>(null);
  const { geometry, material, shaftUniforms, shaftMaterial } = useMemo(() => {
    const rnd = mulberry32(31337);
    const arr = new Float32Array(dust * 3);
    for (let i = 0; i < dust; i++) {
      arr[i * 3] = (rnd() - 0.5) * 36;
      arr[i * 3 + 1] = (rnd() - 0.5) * 22;
      arr[i * 3 + 2] = (rnd() - 0.5) * 30 - 4;
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(arr, 3));
    const material = new THREE.PointsMaterial({ color: "#a9c4b2", size: 0.045, transparent: true, opacity: 0.55, depthWrite: false, sizeAttenuation: true });
    const shaftUniforms = { uTime: { value: 0 }, uStrength: { value: 0 }, uColor: { value: new THREE.Color(palette.emerald) } };
    const shaftMaterial = new THREE.ShaderMaterial({
      vertexShader: shaftVertex,
      fragmentShader: shaftFragment,
      uniforms: shaftUniforms,
      blending: THREE.AdditiveBlending,
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
    return { geometry, material, shaftUniforms, shaftMaterial };
  }, [dust]);

  useEffect(() => () => { geometry.dispose(); material.dispose(); shaftMaterial.dispose(); }, [geometry, material, shaftMaterial]);

  useFrame(({ clock }) => {
    shaftUniforms.uTime.value = clock.elapsedTime;
    shaftUniforms.uStrength.value = 0.05 + sceneState.breach * 0.2 + sceneState.flash * 0.25;
    if (points.current) points.current.rotation.y = clock.elapsedTime * 0.006;
  });

  return (
    <>
      <points ref={points} geometry={geometry} material={material} />
      <mesh position={[-2, 1, -6]} rotation={[0, 0, 0.5]} material={shaftMaterial}>
        <planeGeometry args={[4.5, 30]} />
      </mesh>
      <mesh position={[3, 2, -8]} rotation={[0, 0, -0.38]} material={shaftMaterial}>
        <planeGeometry args={[3, 28]} />
      </mesh>
    </>
  );
}
