import Image from "next/image";
import Reveal from "@/components/interface/Reveal";
import { sponsors } from "@/config/event";

export default function Sponsors() {
  return (
    <section id="sponsors" className="section sponsors" data-mark="ALLIES" aria-labelledby="sponsors-title">
      <Reveal className="sponsors-heading">
        <div>
          <p className="mono eyebrow"><span className="dot" aria-hidden="true" /> 02 / Our sponsors</p>
          <h2 id="sponsors-title">Our sponsors</h2>
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
