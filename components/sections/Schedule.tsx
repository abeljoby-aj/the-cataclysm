import Reveal from "@/components/interface/Reveal";
import { schedule } from "@/config/event";

export default function Schedule() {
  return (
    <section id="schedule" className="section schedule" aria-labelledby="schedule-title">
      <Reveal className="section-head">
        <p className="mono eyebrow"><span className="dot" aria-hidden="true" /> 04 / Schedule</p>
        <h2 id="schedule-title">The night, hour by hour</h2>
      </Reveal>
      <Reveal>
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
      </Reveal>
    </section>
  );
}
