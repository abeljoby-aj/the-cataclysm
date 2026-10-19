import Reveal from "@/components/interface/Reveal";
import { faqs } from "@/config/event";

export default function Faq() {
  return (
    <section id="faq" className="section faq" data-mark="FAQ" aria-labelledby="faq-title">
      <Reveal className="section-head">
        <p className="mono eyebrow"><span className="dot" aria-hidden="true" /> 07 / FAQ</p>
        <h2 id="faq-title">Before you ask.</h2>
      </Reveal>
      <Reveal>
        <div className="faq-list">
          {faqs.map((f, i) => (
            <details key={f.q} className="faq-item" name="faq">
              <summary>
                <span className="mono faq-idx">{String(i + 1).padStart(2, "0")}</span>
                <span className="faq-q">{f.q}</span>
                <span className="faq-plus" aria-hidden="true" />
              </summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
