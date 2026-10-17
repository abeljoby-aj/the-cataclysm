"use client";

import { useEffect, useState } from "react";
import type { QualityTier } from "@/config/experience";

export interface DeviceProfile {
  ready: boolean;
  reducedMotion: boolean;
  webgl: boolean;
  tier: QualityTier;
}

function detectWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

export function useDeviceProfile(): DeviceProfile {
  const [profile, setProfile] = useState<DeviceProfile>({ ready: false, reducedMotion: false, webgl: false, tier: "low" });

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const nav = navigator as Navigator & { deviceMemory?: number };
    const forceNoGL = new URLSearchParams(window.location.search).get("webgl") === "off";
    const weak = window.innerWidth < 768 || (nav.hardwareConcurrency ?? 8) <= 4 || (nav.deviceMemory ?? 8) <= 4;
    const update = () =>
      setProfile({ ready: true, reducedMotion: media.matches, webgl: !forceNoGL && detectWebGL(), tier: weak ? "low" : "high" });
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return profile;
}
