import gsap from "gsap";
import { effects } from "@/config/experience";

export type Stage = "dormant" | "awakening" | "breach" | "revelation" | "exploration";

// Shared mutable state read by the render loop; written by the intro timeline and interaction handlers.
export const sceneState = {
  intro: 0,
  breach: 0,
  flash: 0,
  pulse: 0,
  pulseX: 0,
  pulseY: 0,
  pointerX: 0,
  pointerY: 0,
};

export function triggerPulse(ndcX: number, ndcY: number) {
  sceneState.pulseX = ndcX;
  sceneState.pulseY = ndcY;
  gsap.killTweensOf(sceneState, "pulse");
  sceneState.pulse = 1;
  gsap.to(sceneState, { pulse: 0, duration: effects.pulseDecay, ease: "power2.out" });
}

export function playIntro(setStage: (stage: Stage) => void, reducedMotion: boolean): () => void {
  if (reducedMotion) {
    Object.assign(sceneState, { intro: 1, breach: 1, flash: 0 });
    setStage("exploration");
    return () => undefined;
  }

  const d = effects.breachDurationSeconds;
  const tl = gsap.timeline();
  tl.call(() => setStage("awakening"), [], 0.15)
    .to(sceneState, { intro: 1, duration: 1.5, ease: "power1.inOut" }, 0.15)
    .call(() => setStage("breach"), [], 1.1)
    .to(sceneState, { breach: 1, duration: d * 0.5, ease: "power3.in" }, 1.1)
    .to(sceneState, { flash: 1, duration: 0.14, ease: "power2.out" }, 1.1 + d * 0.5)
    .to(sceneState, { flash: 0, duration: 0.9, ease: "power2.out" }, 1.1 + d * 0.5 + 0.14)
    .call(() => setStage("revelation"), [], 1.1 + d * 0.5)
    .call(() => setStage("exploration"), [], 1.1 + d * 0.5 + 1.6);

  return () => {
    tl.kill();
    gsap.killTweensOf(sceneState);
  };
}
