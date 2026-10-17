"use client";

import { useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import { Bloom, ChromaticAberration, EffectComposer, Noise, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";
import { effects, palette, qualityProfiles, type QualityTier } from "@/config/experience";
import { sceneState } from "@/lib/stage";
import ArmoredSilhouette from "./ArmoredSilhouette";
import Atmosphere from "./Atmosphere";
import DebrisField from "./DebrisField";
import DimensionalBreach from "./DimensionalBreach";

interface Props {
  tier: QualityTier;
  active: boolean;
  reducedMotion: boolean;
}

const BACKDROP_DEPTH = 22;

function Rig({ children, back }: { children: React.ReactNode; back: React.ReactNode }) {
  const { camera, size } = useThree();
  const group = useRef<THREE.Group>(null);
  const backdrop = useRef<THREE.Group>(null);

  useEffect(() => {
    const move = (e: PointerEvent) => {
      sceneState.pointerX = (e.clientX / window.innerWidth) * 2 - 1;
      sceneState.pointerY = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);

  useFrame((_, delta) => {
    const wide = size.width / size.height > 1.15;
    const scroll = Math.min(1, window.scrollY / Math.max(1, window.innerHeight));
    const k = 1 - Math.exp(-delta * 3);
    const tx = sceneState.pointerX * effects.pointerParallax * 1.4;
    const ty = sceneState.pointerY * effects.pointerParallax * 0.8;
    const baseZ = (wide ? 19 : 25) - scroll * 7 - (1 - sceneState.intro) * 3;
    camera.position.x += (tx - camera.position.x) * k;
    camera.position.y += (ty - camera.position.y) * k;
    camera.position.z += (baseZ - camera.position.z) * k;
    camera.lookAt(0, 0, 0);
    if (group.current) {
      const px = wide ? 5.2 : 0;
      const py = wide ? 0 : 4.3;
      const s = wide ? 0.92 : 0.8;
      group.current.position.set(px, py, 0);
      group.current.scale.setScalar(s);
      group.current.rotation.y = sceneState.pointerX * 0.1;
      group.current.rotation.x = -sceneState.pointerY * 0.06;
      // The backdrop sits far behind the gate; offset it so it stays centred on the gate in screen space.
      const k2 = BACKDROP_DEPTH / Math.max(1, camera.position.z);
      backdrop.current?.position.set((px * k2) / s, (py * k2) / s, -BACKDROP_DEPTH / s);
    }
  });

  return (
    <group ref={group}>
      {children}
      <group ref={backdrop}>{back}</group>
    </group>
  );
}

function Studio() {
  return (
    <Environment resolution={64} frames={1}>
      <color attach="background" args={["#020403"]} />
      <Lightformer form="rect" intensity={1.6} position={[-6, 4, 6]} scale={[10, 3, 1]} color="#b8d4c4" />
      <Lightformer form="rect" intensity={2.4} position={[8, -2, 4]} scale={[3, 12, 1]} color={palette.emerald} />
      <Lightformer form="ring" intensity={1.2} position={[0, 0, -8]} scale={9} color={palette.core} />
    </Environment>
  );
}

export default function WorldCanvas({ tier, active, reducedMotion }: Props) {
  const q = qualityProfiles[tier];
  return (
    <Canvas
      frameloop={!active ? "never" : reducedMotion ? "demand" : "always"}
      dpr={q.dpr}
      camera={{ fov: 36, position: [0, 0, 22], near: 0.1, far: 90 }}
      gl={{ antialias: q.antialias, powerPreference: "high-performance", alpha: false }}
      onCreated={({ gl, scene }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.05;
        scene.background = new THREE.Color(palette.void);
        scene.fog = new THREE.FogExp2(palette.void, 0.018);
      }}
      aria-hidden
    >
      <Studio />
      <ambientLight intensity={0.12} />
      <directionalLight position={[-8, 7, 10]} intensity={1.1} color="#c9dccf" />
      <Rig back={<ArmoredSilhouette />}>
        <DimensionalBreach segments={q.ringSegments} />
      </Rig>
      <DebrisField count={q.debris} />
      <Atmosphere dust={q.dust} />
      {q.postprocessing && (
        <EffectComposer multisampling={0}>
          <Bloom intensity={effects.bloomIntensity} luminanceThreshold={effects.bloomThreshold} mipmapBlur />
          <ChromaticAberrationFlash />
          <Noise opacity={0.05} />
          <Vignette eskil={false} offset={0.2} darkness={0.85} />
        </EffectComposer>
      )}
    </Canvas>
  );
}

function ChromaticAberrationFlash() {
  const ref = useRef<{ offset: THREE.Vector2 } | null>(null);
  useFrame(() => {
    const o = ref.current?.offset;
    if (o) o.set(0.0035 * sceneState.flash, 0.002 * sceneState.flash);
  });
  return <ChromaticAberration ref={ref as never} offset={new THREE.Vector2(0, 0)} radialModulation={false} modulationOffset={0} />;
}
