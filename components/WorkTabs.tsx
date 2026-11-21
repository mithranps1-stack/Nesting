"use client";

import Image from "next/image";
import { useState } from "react";

const SCREENS = [
  { id: "signin", tab: "Sign in", img: "signin", alt: "GATSapp sign-in screen with email field and Google option", h: "Join with an email link", p: "A new member enters an email and gets a sign-in link. New accounts wait for an admin to approve them." },
  { id: "board", tab: "Volunteer board", img: "board", alt: "GATSapp volunteer board listing open jobs with spots left", h: "Every open job in one place", p: "Members see each job with spots left and sign up in one tap. Their job and RSVP update instantly." },
  { id: "plan", tab: "Organizer tools", img: "plan", alt: "GATSapp plan-an-event screen with AI drafting", h: "Plan an event from a sentence", p: "Organizers describe an event and AI drafts it, volunteer roles included. Built and ready to switch on." },
];

export default function WorkTabs() {
  const [i, setI] = useState(1);
  const s = SCREENS[i];
  return (
    <div className="wt">
      <div className="wt-copy">
        <div className="seg seg-dark" role="tablist" aria-label="GATSapp screens">
          {SCREENS.map((x, n) => (
            <button key={x.id} role="tab" id={`wt-${x.id}`} aria-selected={n === i} aria-controls="wt-panel" onClick={() => setI(n)}>{x.tab}</button>
          ))}
        </div>
        <div role="tabpanel" id="wt-panel" aria-labelledby={`wt-${s.id}`} className="wt-panel" key={s.id}>
          <h3>{s.h}</h3>
          <p>{s.p}</p>
        </div>
      </div>
      <div className="wt-shot" key={s.img}>
        <Image src={`/gats/${s.img}.webp`} width={400} height={841} alt={s.alt} />
      </div>
    </div>
  );
}
