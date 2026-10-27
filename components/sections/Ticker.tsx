import { eventConfig } from "@/config/event";

const LINES = [
  "Avengers: Doomsday",
  "The Cataclysm",
  "OxCode × Multimedia Club",
  "Earth's mightiest hackers assemble",
  `${eventConfig.prizePool.display} prize pool`,
  "Doom is coming",
  "16 hours · one night",
];

export default function Ticker() {
  const row = [...LINES, ...LINES];
  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker-track mono">
        {[0, 1].map((k) => (
          <div className="ticker-row" key={k}>
            {row.map((t, i) => (
              <span key={i}>{t}<i /></span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
