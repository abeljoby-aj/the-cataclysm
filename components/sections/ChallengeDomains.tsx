"use client";

import { useRef } from "react";
import Reveal from "@/components/interface/Reveal";
import { challengeDomains } from "@/config/event";

function HexDump() {
  const rows = ["7f 45 4c 46 02 01 01 00", "48 89 e5 48 83 ec 20 89", "e8 1c ff ff ff 85 c0 74", "48 8d 3d 9a 0e 00 00 e8", "c9 c3 0f 1f 44 00 00 55"];
  return (
    <pre className="art art-hex mono" aria-hidden="true">
      {rows.map((r, i) => (
        <span key={i} className={i === 2 ? "hl" : undefined}>{r}{"\n"}</span>
      ))}
    </pre>
  );
}

function WebTree() {
  return (
    <div className="art art-web mono" aria-hidden="true">
      <div className="urlbar">/admin/<b>..</b>/</div>
      <ul>
        <li>/</li>
        <li className="d1">/api</li>
        <li className="d2 hl">/api/debug</li>
        <li className="d1">/static</li>
      </ul>
    </div>
  );
}

function CipherWheel() {
  const ring = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  return (
    <svg className="art art-wheel" viewBox="-60 -60 120 120" aria-hidden="true">
      <g className="spin">
        <circle r="52" fill="none" stroke="currentColor" strokeOpacity=".3" />
        {ring.map((c, i) => (
          <text key={c} className="mono" fontSize="7" textAnchor="middle" transform={`rotate(${(i * 360) / 26}) translate(0 -43)`} fill="currentColor">{c}</text>
        ))}
      </g>
      <g className="spin-rev">
        <circle r="31" fill="none" stroke="var(--emerald)" strokeOpacity=".7" strokeDasharray="3 5" />
        <circle r="3" fill="var(--emerald)" cy="-31" />
      </g>
    </svg>
  );
}

function OsintMap() {
  return (
    <svg className="art art-osint" viewBox="0 0 120 80" aria-hidden="true">
      <polyline points="14,60 42,24 78,46 104,14" fill="none" stroke="var(--emerald)" strokeOpacity=".6" strokeDasharray="2 3" />
      {[[14, 60], [42, 24], [78, 46], [104, 14]].map(([x, y], i) => (
        <g key={i} transform={`translate(${x} ${y})`}>
          <circle r="7" fill="none" stroke="var(--emerald)" strokeOpacity=".4" className="ping" style={{ animationDelay: `${i * 0.5}s` }} />
          <circle r="2.5" fill="var(--emerald)" />
        </g>
      ))}
    </svg>
  );
}

function ForensicReveal() {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={ref}
      className="art art-forensic mono"
      aria-hidden="true"
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
        e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
      }}
    >
      <span>IMG_0412.jpg · 3.2 MB</span>
      <span className="secret">flag{"{"}…{"}"} in slack space</span>
      <span>deleted · 0x1A4F00</span>
    </div>
  );
}

function Shards() {
  return (
    <svg className="art art-shards" viewBox="0 0 120 80" aria-hidden="true">
      <polygon points="10,60 38,12 50,52" />
      <polygon points="56,70 70,20 98,58" className="g" />
      <polygon points="76,12 108,8 96,34" />
      <polygon points="28,72 46,58 40,78" className="g" />
    </svg>
  );
}

const visuals: Record<string, () => React.ReactElement> = {
  rev: HexDump,
  web: WebTree,
  crypto: CipherWheel,
  osint: OsintMap,
  forensics: ForensicReveal,
  misc: Shards,
};

export default function ChallengeDomains() {
  return (
    <section id="domains" className="section domains" data-mark="BREACH" aria-labelledby="domains-title">
      <Reveal className="section-head">
        <p className="mono eyebrow"><span className="dot" aria-hidden="true" /> 01 / Expected challenge domains</p>
        <h2 id="domains-title">What you may be up against</h2>
        <p className="muted">These areas are tentative and may change before the event.</p>
      </Reveal>
      <ul className="domain-grid">
        {challengeDomains.map((d, i) => {
          const Visual = visuals[d.id];
          return (
            <li key={d.id} className={`domain domain-${d.id}`}>
              <Reveal delay={(i % 3) * 0.08}>
                <div className="domain-inner">
                  <Visual />
                  <span className="mono domain-idx">{String(i + 1).padStart(2, "0")}</span>
                  <h3>{d.name}</h3>
                  <p>{d.note}</p>
                </div>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
