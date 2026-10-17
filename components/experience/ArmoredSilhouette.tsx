"use client";

import { useEffect, useMemo } from "react";
import * as THREE from "three";
import { palette } from "@/config/experience";
import { createMaskParts } from "@/lib/geometry";

// A colossal armored silhouette half-lost in fog behind the breach. Original geometry, not an official asset.
export default function ArmoredSilhouette() {
  const { parts, hoodMat, faceMat, eyeMat, darkMat } = useMemo(() => {
    return {
      parts: createMaskParts(),
      hoodMat: new THREE.MeshStandardMaterial({ color: "#0c100e", metalness: 0.85, roughness: 0.6, flatShading: true }),
      faceMat: new THREE.MeshStandardMaterial({ color: "#313a35", metalness: 0.95, roughness: 0.38, flatShading: true }),
      darkMat: new THREE.MeshStandardMaterial({ color: "#161b19", metalness: 0.9, roughness: 0.5, flatShading: true }),
      eyeMat: new THREE.MeshBasicMaterial({ color: "#8dffc0", toneMapped: false, fog: false }),
    };
  }, []);

  useEffect(
    () => () => {
      Object.values(parts).forEach((g) => g.dispose());
      [hoodMat, faceMat, eyeMat, darkMat].forEach((m) => m.dispose());
    },
    [parts, hoodMat, faceMat, eyeMat, darkMat],
  );

  return (
    <group position={[0, -0.4, 0]} scale={1.15}>
      <mesh geometry={parts.hood} material={hoodMat} position={[0, 0, -0.6]} />
      <mesh geometry={parts.face} material={faceMat} position={[0, 0.3, 0.2]} />
      <mesh geometry={parts.brow} material={darkMat} position={[0, 0.3, 0.55]} />
      <mesh geometry={parts.nose} material={darkMat} position={[0, 0.3, 0.45]} />
      <mesh geometry={parts.grille} material={darkMat} position={[0, 0.3, 0.4]} />
      <mesh geometry={parts.eyes} material={eyeMat} position={[0, 0.3, 0.62]} />
    </group>
  );
}
