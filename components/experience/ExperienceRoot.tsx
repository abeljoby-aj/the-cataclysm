"use client";

import dynamic from "next/dynamic";
import type { QualityTier } from "@/config/experience";

const WorldCanvas = dynamic(() => import("./WorldCanvas"), { ssr: false });

interface Props {
  webgl: boolean;
  tier: QualityTier;
  active: boolean;
  reducedMotion: boolean;
}

// The CSS fallback always sits underneath so there is never an empty frame while WebGL loads or if it is unavailable.
export default function ExperienceRoot({ webgl, tier, active, reducedMotion }: Props) {
  return (
    <div className="world" aria-hidden="true">
      <div className="world-fallback">
        <div className="fb-glow" />
        <div className="fb-ring" />
        <div className="fb-ring fb-ring-2" />
      </div>
      {webgl && <WorldCanvas tier={tier} active={active} reducedMotion={reducedMotion} />}
    </div>
  );
}
