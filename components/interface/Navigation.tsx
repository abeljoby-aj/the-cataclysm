import Image from "next/image";
import { eventConfig } from "@/config/event";

export default function Navigation() {
  return (
    <header className="nav">
      <a className="nav-brand mono" href="#top" aria-label={`${eventConfig.name} — top`}>
        <Image src={eventConfig.logo} alt="" width={28} height={28} className="nav-logo" /> <span className="brand-text">CATACLYSM</span>
      </a>
      <nav aria-label="Primary">
        <ul>
          <li><a href="#prize">Prize</a></li>
          <li><a href="#schedule">Schedule</a></li>
          <li><a href="#venue">Venue</a></li>
          <li><a className="nav-cta" href="#register">Register</a></li>
        </ul>
      </nav>
    </header>
  );
}
