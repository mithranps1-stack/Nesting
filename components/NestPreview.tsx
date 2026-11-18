"use client";

import { useState } from "react";

type Job = { id: string; name: string; spots: number };
type Kind = {
  id: string;
  label: string;
  group: string;
  next: { name: string; meta: string; going: number };
  jobs: Job[];
};

// Fictional example groups for the demo. Not real clients.
const KINDS: Kind[] = [
  { id: "club", label: "Club", group: "Riverside Running Club", next: { name: "Saturday long run", meta: "7:30 AM · Park entrance", going: 14 },
    jobs: [{ id: "water", name: "Water station", spots: 3 }, { id: "cheer", name: "Cheer squad", spots: 2 }, { id: "snacks", name: "Post-run snacks", spots: 1 }] },
  { id: "nonprofit", label: "Nonprofit", group: "Eastside Food Pantry", next: { name: "Saturday food drive", meta: "9:00 AM · Community lot", going: 9 },
    jobs: [{ id: "sort", name: "Sorting", spots: 4 }, { id: "load", name: "Loading cars", spots: 2 }, { id: "greet", name: "Greeters", spots: 1 }] },
  { id: "faith", label: "Faith community", group: "Maple Street Fellowship", next: { name: "Community supper", meta: "6:00 PM · Fellowship hall", going: 32 },
    jobs: [{ id: "setup", name: "Set-up crew", spots: 3 }, { id: "kitchen", name: "Kitchen", spots: 2 }, { id: "clean", name: "Clean-up", spots: 3 }] },
  { id: "school", label: "School group", group: "Oakview PTA", next: { name: "Spirit week kickoff", meta: "8:15 AM · Main gym", going: 21 },
    jobs: [{ id: "doors", name: "Morning doors", spots: 2 }, { id: "photos", name: "Photo table", spots: 2 }, { id: "bake", name: "Bake sale", spots: 4 }] },
  { id: "shop", label: "Local shop", group: "Corner Bike Shop", next: { name: "Saturday group ride", meta: "8:00 AM · In front of the shop", going: 11 },
    jobs: [{ id: "lead", name: "Ride leader", spots: 1 }, { id: "sweep", name: "Sweep rider", spots: 1 }, { id: "snack", name: "Snack stop", spots: 2 }] },
];

export default function NestPreview() {
  const [kindId, setKindId] = useState(KINDS[0].id);
  const [flags, setFlags] = useState<Record<string, boolean>>({});
  const kind = KINDS.find((k) => k.id === kindId)!;
  const toggle = (key: string) => setFlags((f) => ({ ...f, [key]: !f[key] }));
  const going = kind.next.going + (flags[`${kind.id}:going`] ? 1 : 0);

  return (
    <div className="np">
      <div className="nest">
        <div><div><div>
          <div className="phone-ui" role="group" aria-label={`Example app for ${kind.group}`}>
            <div className="pu-bar"><span className="pu-logo">nesting</span><span>Example group</span></div>
            <h2 className="pu-title" aria-live="polite">{kind.group}</h2>
            <div className="pu-next">
              <small>Next up</small>
              <b>{kind.next.name}</b>
              <span>{kind.next.meta}</span>
              <div className="pu-row">
                <span>{going} going</span>
                <button type="button" aria-pressed={!!flags[`${kind.id}:going`]} onClick={() => toggle(`${kind.id}:going`)}>
                  {flags[`${kind.id}:going`] ? "You’re going" : "I’m going"}
                </button>
              </div>
            </div>
            <p className="pu-sub">Jobs needed</p>
            <ul className="pu-jobs">
              {kind.jobs.map((j) => {
                const on = !!flags[`${kind.id}:${j.id}`];
                const left = j.spots - (on ? 1 : 0);
                return (
                  <li key={j.id}>
                    <div><b>{j.name}</b><span>{left > 0 ? `${left} spot${left === 1 ? "" : "s"} left` : "Full"}</span></div>
                    <button type="button" aria-pressed={on} onClick={() => toggle(`${kind.id}:${j.id}`)}>
                      {on ? "You’re in" : "Sign up"}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div></div></div>
      </div>
      <div className="np-pick" role="group" aria-label="Pick a kind of group">
        <p>Try it. Pick your kind of group, then tap a button.</p>
        {KINDS.map((k) => (
          <button key={k.id} type="button" className="pill" aria-pressed={k.id === kindId} onClick={() => setKindId(k.id)}>
            {k.label}
          </button>
        ))}
      </div>
    </div>
  );
}
