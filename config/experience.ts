export type QualityTier = "high" | "low";

export interface QualityProfile {
  dpr: [number, number];
  debris: number;
  dust: number;
  postprocessing: boolean;
  antialias: boolean;
  ringSegments: number;
}

// All rendering cost knobs live here.
export const qualityProfiles: Record<QualityTier, QualityProfile> = {
  high: { dpr: [1, 1.75], debris: 120, dust: 700, postprocessing: true, antialias: true, ringSegments: 22 },
  low: { dpr: [1, 1.25], debris: 48, dust: 220, postprocessing: false, antialias: false, ringSegments: 14 },
};

export const palette = {
  void: "#050706",
  steel: "#2b322f",
  gunmetal: "#171c1a",
  pale: "#8d968f",
  emerald: "#35e08a",
  core: "#e9ffd9",
  warning: "#c4483a",
} as const;

export const effects = {
  bloomIntensity: 0.55,
  bloomThreshold: 0.72,
  pointerParallax: 0.55,
  pulseDecay: 1.9,
  breachDurationSeconds: 3.2,
};
