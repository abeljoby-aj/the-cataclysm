import Reveal from "@/components/interface/Reveal";
import { schedule } from "@/config/event";

export default function Schedule() {
  return (
    <section id="schedule" className="section schedule" data-mark="T-MINUS" aria-labelledby="schedule-title">
      <Reveal className="section-head">
        <p className="mono eyebrow"><span className="dot" aria-hidden="true" /> 04 / Schedule</p>
        <h2 id="schedule-title">The night, hour by hour</h2>
      </Reveal>
      <Reveal className="sched-layout">
        <ol className="sched">
          {schedule.map((s) => (
            <li key={s.title}>
              <div className="sched-time">
                <span className="mono">{s.day}</span>
                <b>{s.time}</b>
              </div>
              <span className="sched-node" aria-hidden="true" />
              <div className="sched-body">
                <h3>{s.title}</h3>
                <p>{s.note}</p>
              </div>
            </li>
          ))}
        </ol>
        <aside className="briefing" aria-hidden="true">
          <svg viewBox="0 0 200 200" className="briefing-art">
            <g transform="translate(100 100)">
              <circle r="92" className="b-ring spin" strokeDasharray="4 8" />
              <circle r="68" className="b-ring spin-rev" strokeDasharray="1 5" />
              <circle r="44" className="b-ring" />
              <circle r="14" className="b-core" />
              <path d="M0 -100V100M-100 0H100" className="b-ring" />
            </g>
          </svg>
          <p className="mono">Threat level</p>
          <p className="briefing-big">Doomsday</p>
          <p className="muted">Earth&apos;s mightiest hackers assemble. Sixteen hours to break the reality before it breaks you.</p>
        </aside>
      </Reveal>
    </section>
  );
}
