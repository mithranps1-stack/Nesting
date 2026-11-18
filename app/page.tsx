import Link from "next/link";
import NestPreview from "@/components/NestPreview";
import BeforeAfter from "@/components/BeforeAfter";
import ServiceTabs from "@/components/ServiceTabs";
import StartingPoint from "@/components/StartingPoint";
import WorkTabs from "@/components/WorkTabs";
import { SITE } from "@/lib/site";

const AUDIENCE = ["Clubs and leagues", "Nonprofits", "Faith communities", "School groups", "Cultural associations", "Local businesses"];

const STEPS = [
  { h: "Watch how it works today", p: "We talk to the people who run it and ask them to walk us through the last event, the last renewal, the last rush." },
  { h: "Build a working version on phones", p: "You get something you can tap through early, not a slide deck about something you will get later." },
  { h: "Review it with the people who use it", p: "Organizers, members and volunteers each try their own view. We change what confuses them." },
  { h: "Hand it over", p: "We move the code and accounts to you, write the guide, and stay on until someone on your team is running it." },
];

export default function Home() {
  return (
    <main id="main">
      {/* Hero */}
      <section className="hero">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <p className="kicker">A small studio for sites and apps</p>
            <h1>
              Websites and apps built for the way your team <em>actually works.</em>
            </h1>
            <p className="lede">
              Nesting builds phone-first tools for clubs, nonprofits and local businesses. We start by watching
              how the work gets done today, then build the smallest thing that replaces the mess.
            </p>
            <div className="cta-row">
              <Link className="btn" href="/start">Start a project</Link>
              <Link className="btn btn-ghost" href="/#quiz">Find your starting point</Link>
            </div>
            <ul className="points">
              <li>Phone-first from day one</li>
              <li>Your code, your accounts, your data</li>
              <li>Hosting that can run at $0 a month</li>
            </ul>
          </div>
          <NestPreview />
        </div>
      </section>

      {/* Before / after */}
      <section className="section tint" aria-labelledby="ba-h">
        <div className="wrap split">
          <header>
            <p className="kicker">Before and after</p>
            <h2 id="ba-h">From group chat to <em>one place.</em></h2>
            <p className="sec-lede">
              Most groups run on a chat thread and a spreadsheet. Flip the switch to see the same Saturday supper
              both ways.
            </p>
          </header>
          <BeforeAfter />
        </div>
      </section>

      {/* Audience */}
      <section className="section" aria-labelledby="aud-h">
        <div className="wrap split">
          <h2 id="aud-h">We build for <em>people who organize.</em></h2>
          <ul className="chips">
            {AUDIENCE.map((a) => (<li key={a}>{a}</li>))}
          </ul>
        </div>
      </section>

      {/* Qualities */}
      <section className="section tint" aria-labelledby="q-h">
        <div className="wrap">
          <header className="sec-head">
            <p className="kicker">What you can expect</p>
            <h2 id="q-h">Listened. Built. <em>Handed over.</em></h2>
          </header>
          <div className="trio">
            <article>
              <h3>We listen first</h3>
              <p>Before any design, we sit with the person who does the job and ask them to walk us through it.</p>
            </article>
            <article>
              <h3>We build what people use</h3>
              <p>We change the design when the people using it tell us it is confusing, and we rebuild when they are right.</p>
            </article>
            <article>
              <h3>We hand it over</h3>
              <p>Sign-in with approval, roles that are tested, free-tier hosting where it fits, and a setup guide your team can follow.</p>
            </article>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section" id="services" aria-labelledby="s-h">
        <div className="wrap">
          <header className="sec-head">
            <p className="kicker">Services</p>
            <h2 id="s-h">What we <em>make.</em></h2>
          </header>
          <ServiceTabs />
        </div>
      </section>

      {/* Quiz */}
      <section className="section tint" id="quiz" aria-labelledby="z-h">
        <div className="wrap split">
          <header>
            <p className="kicker">Not sure where to begin?</p>
            <h2 id="z-h">Find your <em>starting point.</em></h2>
            <p className="sec-lede">Three questions. You get a suggestion for what to build first, and you can send it to us in one click.</p>
          </header>
          <StartingPoint />
        </div>
      </section>

      {/* Work */}
      <section className="section work" id="work" aria-labelledby="w-h">
        <div className="wrap">
          <header className="sec-head">
            <p className="kicker light">Our first project</p>
            <h2 id="w-h">GATSapp, for the Greater Atlanta <em>Tamil Sangam.</em></h2>
            <p className="sec-lede">
              Members find an open volunteer job and sign up in one tap. Organizers see who is coming. Built for the
              GATS Youth NextGen Summit 2026, with email sign-in, admin approval, and English and Tamil screens.
            </p>
          </header>
          <WorkTabs />
          <div className="work-foot">
            <a className="btn btn-light" href={SITE.gatsLiveUrl} target="_blank" rel="noopener noreferrer">Open the live app</a>
            <p className="credit">Screens shown with test data. Pilot targets are proposed, not results yet.</p>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section" id="process" aria-labelledby="p-h">
        <div className="wrap">
          <header className="sec-head">
            <p className="kicker">How we work</p>
            <h2 id="p-h">From first call to <em>your team running it.</em></h2>
          </header>
          <div className="process">
            <ol className="steps">
              {STEPS.map((s) => (
                <li key={s.h}><div><h3>{s.h}</h3><p>{s.p}</p></div></li>
              ))}
            </ol>
            <aside className="check">
              <h3>The handoff checklist</h3>
              <ul>
                <li>Code in your GitHub</li>
                <li>Hosting in your account</li>
                <li>Sign-in with approval and roles, tested</li>
                <li>A written setup guide</li>
                <li>A named owner on your side</li>
              </ul>
            </aside>
          </div>
        </div>
      </section>

      {/* Founders teaser */}
      <section className="section tint" id="about" aria-labelledby="a-h">
        <div className="wrap split">
          <h2 id="a-h">A small team <em>you can reach.</em></h2>
          <div className="prose">
            <p>Nesting is a studio of four founders, not an agency. You talk to the people building your tool, and they talk to the people who will use it.</p>
            <p><Link className="btn btn-ghost" href="/founders">Meet the founders</Link></p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta" aria-labelledby="c-h">
        <div className="wrap cta-inner">
          <h2 id="c-h">Tell us what your team needs <em>to get done.</em></h2>
          <div className="cta-row">
            <Link className="btn btn-light" href="/start">Start a project</Link>
            <Link className="btn btn-outline-light" href="/signup">Create an account</Link>
          </div>
          <p className="cta-mail">Or write to {SITE.email}</p>
        </div>
      </section>
    </main>
  );
}
