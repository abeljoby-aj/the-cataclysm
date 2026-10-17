"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import ExperienceRoot from "@/components/experience/ExperienceRoot";
import { eventConfig } from "@/config/event";
import { useDeviceProfile } from "@/hooks/useDeviceProfile";
import { playIntro, triggerPulse, type Stage } from "@/lib/stage";
import { formatLongDate, formatTime, startDate } from "@/lib/time";

const TITLE_WORDS = ["THE", "CATACLYSM"];

export default function OpeningSequence() {
  const profile = useDeviceProfile();
  const [stage, setStage] = useState<Stage>("dormant");
  const [visible, setVisible] = useState(true);
  const hero = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!profile.ready) return;
    return playIntro(setStage, profile.reducedMotion);
  }, [profile.ready, profile.reducedMotion]);

  useEffect(() => {
    const el = hero.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest("a,button")) return;
    triggerPulse((e.clientX / window.innerWidth) * 2 - 1, -((e.clientY / window.innerHeight) * 2 - 1));
  }, []);

  let letterIndex = 0;

  return (
    <section ref={hero} id="top" className="hero" data-stage={stage} onPointerDown={onPointerDown} aria-labelledby="title">
      <ExperienceRoot webgl={profile.webgl} tier={profile.tier} active={visible} reducedMotion={profile.reducedMotion} />
      <div className="hero-shade" aria-hidden="true" />

      <div className="hero-copy">
        <p className="mono eyebrow">
          <Image src={eventConfig.logo} alt="" width={26} height={26} className="eyebrow-logo" /> {eventConfig.organizer} presents
        </p>
        <h1 id="title" className="title" aria-label={eventConfig.name}>
          {TITLE_WORDS.map((word) => (
            <span className="title-word" aria-hidden="true" key={word}>
              {word.split("").map((ch) => {
                const i = letterIndex++;
                return (
                  <span key={i} className="letter" style={{ ["--i" as string]: i }}>
                    {ch}
                  </span>
                );
              })}
            </span>
          ))}
        </h1>
        <p className="lede">
          An inter-college cybersecurity Capture the Flag. Sixteen hours, teams of {eventConfig.teamSizeMin}–{eventConfig.teamSizeMax}, one collapsing reality to solve your way out of.
        </p>
        <dl className="hero-facts mono">
          <div>
            <dt>Starts</dt>
            <dd>{formatLongDate(startDate)} · {formatTime(startDate)}</dd>
          </div>
          <div>
            <dt>Prize pool</dt>
            <dd className="hl">{eventConfig.prizePool.display}</dd>
          </div>
          <div>
            <dt>Venue</dt>
            <dd>{eventConfig.venue}</dd>
          </div>
        </dl>
        <div className="cta-row">
          <a className="btn btn-primary" href="#register">
            Register now
          </a>
          <a className="btn btn-ghost" href="#details">Event details</a>
        </div>
      </div>

      <a className="scroll-hint mono" href="#domains" aria-label="Scroll to challenge domains">
        <span aria-hidden="true" /> Scroll
      </a>
    </section>
  );
}
