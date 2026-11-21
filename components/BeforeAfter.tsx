"use client";

import { useState } from "react";

const JOBS = [
  { id: "setup", name: "Set-up", spots: 3 },
  { id: "food", name: "Food service", spots: 2 },
  { id: "clean", name: "Clean-up", spots: 3 },
];

export default function BeforeAfter() {
  const [mode, setMode] = useState<"before" | "after">("before");
  const [joined, setJoined] = useState<Record<string, boolean>>({});

  return (
    <div className="ba2">
      <div className="seg" role="tablist" aria-label="Before or after">
        <button role="tab" id="tab-before" aria-selected={mode === "before"} aria-controls="panel-ba" onClick={() => setMode("before")}>Group chat</button>
        <button role="tab" id="tab-after" aria-selected={mode === "after"} aria-controls="panel-ba" onClick={() => setMode("after")}>Nesting</button>
      </div>
      <div className="ba2-card" role="tabpanel" id="panel-ba" aria-labelledby={mode === "before" ? "tab-before" : "tab-after"}>
        {mode === "before" ? (
          <div className="chat" key="before">
            <p className="bub them">Hall is confirmed for the 21st. Doors open at 4.</p>
            <p className="bub them">Can someone bring extension cords for the lamps?</p>
            <p className="bub me">I can!</p>
            <p className="bub them">Who is doing set-up? Need 3 people</p>
            <p className="bub them">+1 going</p>
            <p className="bub them">Can someone count RSVPs??</p>
            <p className="bub them">Sorry, scrolling up, what time was clean-up?</p>
          </div>
        ) : (
          <div className="after-list" key="after">
            <p className="after-h">Open jobs · Saturday supper</p>
            <ul>
              {JOBS.map((j) => {
                const on = !!joined[j.id];
                const left = j.spots - (on ? 1 : 0);
                return (
                  <li key={j.id}>
                    <div><b>{j.name}</b><span>{left} spot{left === 1 ? "" : "s"} left</span></div>
                    <button type="button" className="mini" aria-pressed={on} onClick={() => setJoined((s) => ({ ...s, [j.id]: !s[j.id] }))}>
                      {on ? "You’re in" : "Sign up"}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
      <p className="ba2-note" aria-live="polite">
        {mode === "before" ? "Illustration. Details get buried in the thread and someone counts by hand." : "Example screen. Every open job in one place, and the count updates for everyone."}
      </p>
    </div>
  );
}
