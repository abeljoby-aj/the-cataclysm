import Image from "next/image";
import Reveal from "@/components/interface/Reveal";
import { mainCashSponsor, sponsors } from "@/config/event";

export default function Sponsors() {
  return (
    <section id="sponsors" className="section sponsors" data-mark="ALLIES" aria-labelledby="sponsors-title">
      <Reveal className="sponsors-heading">
        <div>
          <p className="mono eyebrow"><span className="dot" aria-hidden="true" /> 02 / Our sponsors</p>
          <h2 id="sponsors-title">Our sponsors</h2>
        </div>
      </Reveal>
      <Reveal className="main-cash-sponsor">
        <div className="main-sponsor-logo-panel">
          <Image src={mainCashSponsor.logo} alt="AMT logo — Let’s build IT together" width={508} height={263} className="main-sponsor-logo" />
        </div>
        <div className="main-sponsor-copy">
          <p className="mono main-sponsor-role">{mainCashSponsor.role}</p>
          <h3>{mainCashSponsor.name}</h3>
          <p className="main-sponsor-support">Supporting the cash prize pool.</p>
          <p className="main-sponsor-description">{mainCashSponsor.description}</p>
        </div>
      </Reveal>
      <div className="sponsor-grid">
        {sponsors.map((sponsor, i) => (
          <Reveal key={sponsor.id} className={`sponsor-card sponsor-${sponsor.id}`} delay={i * 0.08}>
            <div className="sponsor-brand">
              <Image src={sponsor.logo} alt={`${sponsor.name} logo`} width={112} height={112} className="sponsor-logo" />
              <div>
                <p className="mono small-label">Event sponsor</p>
                <h3>{sponsor.name}</h3>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
