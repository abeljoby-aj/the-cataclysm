"use client";

import { useEffect, useState } from "react";
import { endDate, getPhase, splitDuration, startDate } from "@/lib/time";

const pad = (n: number) => String(n).padStart(2, "0");

export default function Countdown() {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  if (now === null) return <div className="countdown" aria-hidden="true" style={{ minHeight: "5.5rem" }} />;

  const phase = getPhase(now);
  if (phase === "ended") return <p className="countdown-state mono">The event has ended.</p>;

  const target = phase === "live" ? endDate : startDate;
  const d = splitDuration(target.getTime() - now);
  const cells: [string, number][] = [["days", d.days], ["hrs", d.hours], ["min", d.minutes], ["sec", d.seconds]];

  return (
    <div className="countdown-wrap">
      <p className="mono small-label">{phase === "live" ? "Live now — ends in" : "Begins in"}</p>
      <div className="countdown" role="timer" aria-label={`${d.days} days ${d.hours} hours ${d.minutes} minutes`}>
        {cells.map(([label, value]) => (
          <div key={label} className="cd-cell">
            <span className="cd-num">{pad(value)}</span>
            <span className="cd-label mono">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
