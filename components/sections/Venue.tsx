import Reveal from "@/components/interface/Reveal";
import { eventConfig } from "@/config/event";

export default function Venue() {
  return (
    <section id="venue" className="section venue" aria-labelledby="venue-title">
      <Reveal className="venue-grid">
        <div className="venue-info">
          <p className="mono eyebrow"><span className="dot" aria-hidden="true" /> 06 / Venue</p>
          <h2 id="venue-title">{eventConfig.venue}</h2>
          <p className="muted">{eventConfig.institution}</p>
          <a className="mono map-link" href={eventConfig.map.linkUrl} target="_blank" rel="noopener noreferrer">
            Open in Google Maps ↗
          </a>
        </div>
        <div className="map-frame">
          <iframe
            title={`Map of ${eventConfig.venue}, ${eventConfig.institution}`}
            src={eventConfig.map.embedUrl}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </Reveal>
    </section>
  );
}
