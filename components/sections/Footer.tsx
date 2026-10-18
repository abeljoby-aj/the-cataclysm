import Image from "next/image";
import { eventConfig } from "@/config/event";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-logos">
        <a className="footer-logo" href={eventConfig.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="OxCode on Instagram">
          <Image src={eventConfig.logo} alt="OxCode" width={72} height={72} />
        </a>
        <span className="footer-x" aria-hidden="true">×</span>
        <Image className="footer-mm" src={eventConfig.multimediaLogo} alt="Multimedia Club" width={96} height={96} />
      </div>
      <p className="muted">{eventConfig.copyright}</p>
      <a className="mono" href="#top">Back to the breach ↑</a>
    </footer>
  );
}
