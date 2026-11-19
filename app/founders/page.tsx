import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FOUNDERS } from "@/lib/founders";

export const metadata: Metadata = {
  title: "Founders",
  description: "Meet the four founders behind Nesting.",
};

const BELIEFS = [
  { h: "Watch before we build", p: "The best idea in the room is usually how someone already works around a problem. We start there." },
  { h: "Small and finished", p: "A tool that does three things well beats a plan for thirty. We ship the small version first." },
  { h: "You own it", p: "Code, accounts and data live with you. We write the guide so your team can run it without us." },
];

export default function FoundersPage() {
  return (
    <main id="main">
      <section className="page-hero">
        <div className="wrap">
          <p className="kicker">The founders</p>
          <h1>The people behind <em>Nesting.</em></h1>
          <p className="lede">Four of us, building simple tools for community groups. You talk to the people building your tool.</p>
        </div>
      </section>

      <section className="section tight">
        <div className="wrap founders">
          {FOUNDERS.map((f) => (
            <article key={f.name} className="founder">
              <div className="avatar" aria-hidden={f.photo ? undefined : true}>
                {f.photo ? <Image src={f.photo} alt={f.name} width={160} height={160} /> : <span>{f.initials}</span>}
              </div>
              <div>
                <h2>{f.name}</h2>
                <p className="role">{f.role}</p>
                <p className="bio">{f.bio}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section tint" aria-labelledby="story-h">
        <div className="wrap split">
          <h2 id="story-h">Nesting started with <em>one app.</em></h2>
          <div className="prose">
            <p>We built GATSapp for the Greater Atlanta Tamil Sangam: a phone app where members find a volunteer job and sign up in one tap, and organizers see who is coming.</p>
            <p>Reviewers told us to make it more volunteer-oriented. An event planner told us to focus on navigability and reliability. We rebuilt it as a phone-first app with simple tabs.</p>
            <p>Nesting is the studio we are building to make tools like it for other groups. <Link className="textlink" href="/#work">See the first project</Link>.</p>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="bel-h">
        <div className="wrap">
          <header className="sec-head">
            <p className="kicker">What we hold to</p>
            <h2 id="bel-h">Three <em>habits.</em></h2>
          </header>
          <div className="trio">
            {BELIEFS.map((b) => (
              <article key={b.h}><h3>{b.h}</h3><p>{b.p}</p></article>
            ))}
          </div>
        </div>
      </section>

      <section className="cta" aria-labelledby="c-h">
        <div className="wrap cta-inner">
          <h2 id="c-h">Want to build something <em>with us?</em></h2>
          <div className="cta-row">
            <Link className="btn btn-light" href="/start">Start a project</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
