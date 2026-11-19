"use client";

import { useState } from "react";
import Link from "next/link";

type Key = "site" | "members" | "events";
const QUESTIONS: { q: string; a: { t: string; s: Partial<Record<Key, number>> }[] }[] = [
  { q: "What are you organizing?", a: [
    { t: "A group with members", s: { members: 2 } },
    { t: "Events and volunteers", s: { events: 2 } },
    { t: "A local business", s: { site: 2 } },
    { t: "Not sure yet", s: { site: 1, members: 1 } } ] },
  { q: "Where does the work happen today?", a: [
    { t: "Group chats", s: { events: 2, members: 1 } },
    { t: "Spreadsheets and email", s: { members: 2, events: 1 } },
    { t: "Social media only", s: { site: 2 } },
    { t: "An old website", s: { site: 2 } } ] },
  { q: "What should people do on their phone?", a: [
    { t: "Sign up for things", s: { events: 2 } },
    { t: "See what is coming up", s: { site: 2 } },
    { t: "Log in and see their own stuff", s: { members: 2 } },
    { t: "Book or get in touch", s: { site: 2 } } ] },
];
const RESULTS: Record<Key, { title: string; why: string; topic: string }> = {
  site: { title: "A website that works on a phone", why: "Your biggest gap is a clear front door. People should find what you do and what is next without asking someone.", topic: "Website" },
  members: { title: "A member app with sign-in", why: "Your work centers on people and what is theirs. Accounts, approval and a view for each role come first.", topic: "Member app and sign-in" },
  events: { title: "An events and volunteer tool", why: "Your work is jobs, dates and headcounts. One board with sign-up and RSVPs replaces the chat scroll.", topic: "Events and volunteer tools" },
};

export default function StartingPoint() {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState<Record<Key, number>>({ members: 0, events: 0, site: 0 });
  const done = step >= QUESTIONS.length;

  const pick = (s: Partial<Record<Key, number>>) => {
    setScore((prev) => ({ members: prev.members + (s.members ?? 0), events: prev.events + (s.events ?? 0), site: prev.site + (s.site ?? 0) }));
    setStep((n) => n + 1);
  };
  const best = (Object.keys(score) as Key[]).reduce((a, b) => (score[b] > score[a] ? b : a), "members" as Key);
  const reset = () => { setStep(0); setScore({ members: 0, events: 0, site: 0 }); };

  return (
    <div className="quiz">
      <div className="quiz-top" aria-hidden="true">
        {QUESTIONS.map((_, n) => <span key={n} className={n < step ? "on" : ""} />)}
      </div>
      {!done ? (
        <div key={step}>
          <p className="quiz-count">Question {step + 1} of {QUESTIONS.length}</p>
          <h3>{QUESTIONS[step].q}</h3>
          <div className="quiz-opts">
            {QUESTIONS[step].a.map((o) => (
              <button key={o.t} type="button" onClick={() => pick(o.s)}>{o.t}</button>
            ))}
          </div>
        </div>
      ) : (
        <div className="quiz-result" aria-live="polite">
          <p className="quiz-count">We would start with</p>
          <h3>{RESULTS[best].title}</h3>
          <p>{RESULTS[best].why}</p>
          <div className="cta-row" style={{ marginTop: 20 }}>
            <Link className="btn" href={`/start?topic=${encodeURIComponent(RESULTS[best].topic)}`}>Start a project with this</Link>
            <button type="button" className="btn btn-ghost" onClick={reset}>Start over</button>
          </div>
        </div>
      )}
    </div>
  );
}
