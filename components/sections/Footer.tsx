import Image from "next/image";
import { eventConfig } from "@/config/event";

export default function Footer() {
  return (
    <footer className="footer">
      <a className="footer-logo" href={eventConfig.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="OxCode on Instagram">
        <Image src={eventConfig.logo} alt="OxCode" width={72} height={72} />
      </a>
      <p className="muted">{eventConfig.copyright}</p>
      <a className="mono" href="#top">Back to the breach ↑</a>
    </footer>
  );
}
