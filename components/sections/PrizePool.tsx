import Reveal from "@/components/interface/Reveal";
import { examBenefits, eventConfig, proAccessPrizes, proAccessRecipient } from "@/config/event";

export default function PrizePool() {
  return (
    <section id="prize" className="section prize" data-mark="REWARDS" aria-labelledby="prize-title">
      <Reveal className="prize-inner">
        <div className="prize-heading">
          <p className="mono eyebrow"><span className="dot" aria-hidden="true" /> 01 / Prizes & rewards</p>
          <h2 id="prize-title">The stakes just<br /><span>got higher.</span></h2>
          <p className="prize-sub">Cash on the line. New opportunities beyond the competition.</p>
        </div>
        <div className="reward-totals">
          <div className="reward-total reward-cash">
            <p className="mono reward-label">Cash prize pool</p>
            <p className="reward-amount">{eventConfig.prizePool.display}</p>
            <p>For the winning teams.</p>
          </div>
          <span className="reward-plus" aria-hidden="true">+</span>
          <div className="reward-total reward-sponsored">
            <p className="mono reward-label">Additional rewards</p>
            <p className="reward-amount" aria-label={eventConfig.sponsorRewards.display}>{eventConfig.sponsorRewards.short}</p>
            <p>Estimated value of training access, exam vouchers & discounts</p>
          </div>
        </div>
        <div className="reward-breakdown">
          <div className="winner-rewards">
            <h3 className="reward-group-title">For the top 3 teams</h3>
            <div className="winner-vouchers">
              <h4>One free exam voucher per team member</h4>
              <p className="muted">{examBenefits.freeVouchers} {examBenefits.exam} vouchers total, shared across the top 3 teams.</p>
            </div>
            <h4>Pro training access</h4>
            <p className="reward-recipient muted">{proAccessRecipient}</p>
            <ol className="podium-rewards">
              {proAccessPrizes.map((prize, i) => (
                <li key={prize.position}>
                  <span className="podium-number mono" aria-hidden="true">0{i + 1}</span>
                  <p className="mono podium-place">{prize.position}</p>
                  <p className="podium-duration"><strong>{prize.months}</strong> {prize.months === 1 ? "month" : "months"}</p>
                  <p className="muted">For the team’s top scorer</p>
                </li>
              ))}
            </ol>
          </div>
          <div className="participant-rewards">
            <h3 className="reward-group-title">For all registered participants</h3>
            <p className="participant-discount"><strong>{examBenefits.discountPercent}%</strong> off</p>
            <p className="muted">the {examBenefits.exam} exam</p>
            <p className="reward-recipient muted">Available to every registered participant, regardless of final ranking.</p>
          </div>
        </div>
        <div className="reward-footnote">
          <p>The estimated value includes non-cash rewards and discounts, in addition to the {eventConfig.prizePool.display} cash pool.</p>
          <a className="btn btn-primary" href="#register">Compete for the rewards <span aria-hidden="true">↗</span></a>
        </div>
      </Reveal>
    </section>
  );
}
