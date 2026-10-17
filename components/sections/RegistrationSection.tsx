"use client";

import { useState } from "react";
import RegistrationLink from "@/components/interface/RegistrationLink";
import Reveal from "@/components/interface/Reveal";
import { eventConfig } from "@/config/event";

export default function RegistrationSection() {
  const [members, setMembers] = useState<number>(eventConfig.teamSizeMax);
  const options = [eventConfig.teamSizeMin, eventConfig.teamSizeMax];

  return (
    <section id="register" className="section register" aria-labelledby="register-title">
      <Reveal className="register-card">
        <p className="mono eyebrow"><span className="dot" aria-hidden="true" /> 05 / Registration</p>
        <h2 id="register-title">Enter the breach</h2>
        <p className="fee">
          <span className="fee-num">₹{eventConfig.participantFee}</span>
          <span className="muted"> per participant</span>
        </p>
        <div className="calc">
          <span className="mono small-label" id="team-label">Indicative team total</span>
          <div className="seg" role="group" aria-labelledby="team-label">
            {options.map((n) => (
              <button key={n} type="button" aria-pressed={members === n} onClick={() => setMembers(n)}>{n} members</button>
            ))}
          </div>
          <p className="calc-out" aria-live="polite">
            {members} × ₹{eventConfig.participantFee} = <b>₹{members * eventConfig.participantFee}</b>
          </p>
        </div>
        <RegistrationLink />
      </Reveal>
    </section>
  );
}
