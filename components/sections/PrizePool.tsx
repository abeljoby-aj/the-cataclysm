import Reveal from "@/components/interface/Reveal";
import { eventConfig } from "@/config/event";

export default function PrizePool() {
  return (
    <section id="prize" className="section prize" data-mark="25K" aria-labelledby="prize-title">
      <Reveal className="prize-inner">
        <p className="mono eyebrow"><span className="dot" aria-hidden="true" /> 02 / Prize pool</p>
        <h2 id="prize-title" className="sr-only">Prize pool</h2>
        <p className="prize-amount" aria-label={`Prize pool ${eventConfig.prizePool.display}`}>{eventConfig.prizePool.display}</p>
        <p className="prize-sub">Total prize pool for the winning teams.</p>
      </Reveal>
    </section>
  );
}
