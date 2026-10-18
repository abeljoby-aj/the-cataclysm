import Reveal from "@/components/interface/Reveal";
import { contacts } from "@/config/event";

export default function Contact() {
  return (
    <section id="contact" className="section contact" data-mark="ASSEMBLE" aria-labelledby="contact-title">
      <Reveal className="section-head">
        <p className="mono eyebrow"><span className="dot" aria-hidden="true" /> 07 / Contact us</p>
        <h2 id="contact-title">Questions? Reach the team.</h2>
      </Reveal>
      <Reveal>
        <ul className="contact-grid">
          {contacts.map((c) => (
            <li key={c.role}>
              <span className="mono small-label">{c.role}</span>
              <h3>{c.name}</h3>
              <a href={`tel:${c.phone.replace(/\s/g, "")}`}>{c.phone}</a>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
