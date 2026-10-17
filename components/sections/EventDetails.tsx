import Countdown from "@/components/interface/Countdown";
import Reveal from "@/components/interface/Reveal";
import { eventConfig } from "@/config/event";
import { endDate, formatLongDate, formatTime, startDate } from "@/lib/time";

export default function EventDetails() {
  const ticks = Array.from({ length: 17 }, (_, i) => (17 + i) % 24);
  return (
    <section id="details" className="section details" aria-labelledby="details-title">
      <Reveal className="section-head">
        <p className="mono eyebrow"><span className="dot" aria-hidden="true" /> 03 / Event details</p>
        <h2 id="details-title">Sixteen hours. One night.</h2>
      </Reveal>

      <Reveal className="details-body">
        <div className="big-16" aria-hidden="true">{eventConfig.durationHours}</div>
        <div className="details-main">
          <div className="timeline" aria-hidden="true">
            <div className="timeline-bar"><i /></div>
            <div className="timeline-ticks mono">
              {ticks.map((h, i) => (
                <span key={i} className={i === 0 || i === 16 ? "edge" : undefined}>{i % 4 === 0 || i === 16 ? String(h).padStart(2, "0") : ""}</span>
              ))}
            </div>
          </div>
          <dl className="facts">
            <div><dt className="mono">Start</dt><dd>{formatLongDate(startDate)}<br />{formatTime(startDate)}</dd></div>
            <div><dt className="mono">End</dt><dd>{formatLongDate(endDate)}<br />{formatTime(endDate)}</dd></div>
            <div><dt className="mono">Duration</dt><dd>{eventConfig.durationHours} hours</dd></div>
            <div><dt className="mono">Venue</dt><dd>{eventConfig.venue}<br /><span className="muted">{eventConfig.institution}</span></dd></div>
            <div><dt className="mono">Prize pool</dt><dd className="hl">{eventConfig.prizePool.display}</dd></div>
            <div><dt className="mono">Scale</dt><dd>Approximately {eventConfig.expectedTeams} teams</dd></div>
            <div><dt className="mono">Team size</dt><dd>{eventConfig.teamSizeMin} or {eventConfig.teamSizeMax} members</dd></div>
          </dl>
          <Countdown />
        </div>
      </Reveal>
    </section>
  );
}
