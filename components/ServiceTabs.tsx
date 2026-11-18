"use client";

import { useRef, useState } from "react";
import Link from "next/link";

const SERVICES = [
  { id: "web", h: "Websites", p: "A fast site that explains who you are, shows what is coming up, and works on a phone first.", who: "Anyone who needs a front door", gets: ["Pages you can edit yourself", "Event and contact info that stays current", "A domain and hosting set up in your name"], topic: "Website" },
  { id: "members", h: "Member apps and sign-in", p: "Accounts, approval by an admin, and a view for each role, so people see only what is theirs.", who: "Groups with members", gets: ["Email sign-in, with admin approval for new accounts", "Roles: members, admins, one owner", "Permission rules tested for every role"], topic: "Member app and sign-in" },
  { id: "events", h: "Event and volunteer tools", p: "Open jobs on one board, RSVPs counted for you, rosters for organizers.", who: "Anything run by volunteers", gets: ["A volunteer board with spots left", "RSVPs: going, maybe, can’t make it", "Planning checklists for organizers"], topic: "Events and volunteer tools" },
  { id: "ai", h: "AI helpers", p: "Draft an event or an announcement from a sentence. A person always checks it before it goes out.", who: "Busy organizers", gets: ["Event drafts with volunteer roles", "Announcements ready to share to WhatsApp", "Clear labels on anything AI wrote"], topic: "Not sure yet" },
  { id: "lang", h: "Bilingual interfaces", p: "Build in two languages from the start, with wording checked by a fluent reader.", who: "Multilingual communities", gets: ["Language switch on every screen", "Names and dates shown the way people expect", "A review step with a fluent reader"], topic: "Not sure yet" },
  { id: "handoff", h: "Handoff and training", p: "Code in your GitHub, hosting in your account, a setup guide, and a named owner on your side.", who: "Every project", gets: ["Code and accounts moved to you", "A written setup guide", "Help until someone on your team runs it"], topic: "Not sure yet" },
];

export default function ServiceTabs() {
  const [i, setI] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const s = SERVICES[i];

  const onKey = (e: React.KeyboardEvent, idx: number) => {
    const next = e.key === "ArrowDown" || e.key === "ArrowRight" ? (idx + 1) % SERVICES.length
      : e.key === "ArrowUp" || e.key === "ArrowLeft" ? (idx - 1 + SERVICES.length) % SERVICES.length : null;
    if (next === null) return;
    e.preventDefault();
    setI(next);
    refs.current[next]?.focus();
  };

  return (
    <div className="tabs">
      <div className="tablist" role="tablist" aria-label="Services" aria-orientation="vertical">
        {SERVICES.map((x, idx) => (
          <button key={x.id} ref={(el) => { refs.current[idx] = el; }} role="tab" id={`svc-${x.id}`} aria-selected={idx === i} aria-controls="svc-panel"
            tabIndex={idx === i ? 0 : -1} onClick={() => setI(idx)} onKeyDown={(e) => onKey(e, idx)}>
            {x.h}
          </button>
        ))}
      </div>
      <div className="tabpanel" role="tabpanel" id="svc-panel" aria-labelledby={`svc-${s.id}`} key={s.id}>
        <h3>{s.h}</h3>
        <p className="tp-lede">{s.p}</p>
        <ul className="ticks">{s.gets.map((g) => <li key={g}>{g}</li>)}</ul>
        <p className="tp-for">Good for: {s.who}</p>
        <Link className="btn btn-sm" href={`/start?topic=${encodeURIComponent(s.topic)}`}>Ask about this</Link>
      </div>
    </div>
  );
}
