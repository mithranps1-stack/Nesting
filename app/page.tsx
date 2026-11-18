import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/site";

const phone = (name: string, alt: string, className?: string) => (
  <Image className={className} src={`/gats/${name}.webp`} width={400} height={841} alt={alt} />
);

const AUDIENCE = [
  "Cultural associations",
  "Nonprofits",
  "Clubs and leagues",
  "Faith communities",
  "Student organizations",
  "Local businesses",
];

const SERVICES = [
  { h: "Websites", p: "A fast site that explains who you are, shows what is coming up, and works on a phone first.", t: "For: anyone who needs a front door" },
  { h: "Member apps and sign-in", p: "Accounts, approval by an admin, and a view for each role, so people see only what is theirs.", t: "For: groups with members" },
  { h: "Event and volunteer tools", p: "Open jobs on one board, RSVPs counted for you, rosters for organizers.", t: "For: anything run by volunteers" },
  { h: "AI helpers", p: "Draft an event or an announcement from a sentence. A person always checks it before it goes out.", t: "For: busy organizers" },
  { h: "Bilingual interfaces", p: "Build in two languages from the start, with wording checked by a fluent reader.", t: "For: multilingual communities" },
  { h: "Handoff and training", p: "Code in your GitHub, hosting in your account, a setup guide, and a named owner on your side.", t: "For: every project" },
];

const STEPS = [
  { h: "Watch how it works today", p: "We talk to the people who run it and ask them to walk us through the last event, the last renewal, the last rush." },
  { h: "Build a working version on phones", p: "You get something you can tap through in days, not a slide deck about something you will get later." },
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
              <a className="btn" href={`mailto:${SITE.email}?subject=Start%20a%20project`}>Start a project</a>
              <Link className="btn btn-ghost" href="/#work">See our work</Link>
            </div>
            <ul className="points">
              <li>Phone-first from day one</li>
              <li>Your code, your accounts, your data</li>
              <li>Hosting that can run at $0 a month</li>
            </ul>
          </div>
          <div className="nest" aria-hidden="false">
            <div><div><div>{phone("home", "GATSapp home screen showing the next event, who is coming, and open volunteer jobs")}</div></div></div>
          </div>
        </div>
      </section>

      {/* Before / after */}
      <section className="section tint" aria-labelledby="ba-h">
        <div className="wrap">
          <header className="sec-head">
            <p className="kicker">Before and after</p>
            <h2 id="ba-h">From group chat to <em>one tap.</em></h2>
            <p className="sec-lede">
              GATS, a cultural association in Atlanta, counted RSVPs and filled volunteer jobs by hand in group
              chats. We built them an app where a member finds an open job and signs up in one tap.
            </p>
          </header>
          <div className="ba">
            <figure className="ba-card before">
              <figcaption><span className="tag">Before</span> Illustration of a typical group chat</figcaption>
              <div className="chat" aria-label="Example group chat messages">
                <p className="bub them">Hall is confirmed for the 21st. Doors open at 4.</p>
                <p className="bub them">Can someone bring extension cords for the lamps?</p>
                <p className="bub me">I can!</p>
                <p className="bub them">Who is doing setup? Need 4 people</p>
                <p className="bub them">+1 going</p>
                <p className="bub them">Can someone count RSVPs??</p>
                <p className="bub them">Sorry, scrolling up, what time was cleanup?</p>
              </div>
            </figure>
            <figure className="ba-card after">
              <figcaption><span className="tag on">After</span> GATSapp volunteer board, shown with test data</figcaption>
              <div className="after-shot">{phone("board", "GATSapp volunteer board listing open jobs with spots left and a sign-up button")}</div>
            </figure>
          </div>
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
              <p>Before any design, we sit with the person who does the job. For GATSapp that was an event planner who walked us through collecting RSVPs across WhatsApp and spreadsheets.</p>
            </article>
            <article>
              <h3>We build what people use</h3>
              <p>Reviewers told us to make it more volunteer-oriented. A planner told us to focus on navigability and reliability. We rebuilt it as a phone-first app with simple tabs.</p>
            </article>
            <article>
              <h3>We hand it over</h3>
              <p>GATSapp runs on free hosting plans, has sign-in with admin approval, and comes with a setup guide so any GATS official can run it.</p>
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
          <div className="cards">
            {SERVICES.map((s) => (
              <article key={s.h} className="card">
                <h3>{s.h}</h3>
                <p>{s.p}</p>
                <p className="card-for">{s.t}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Work */}
      <section className="section work" id="work" aria-labelledby="w-h">
        <div className="wrap">
          <header className="sec-head">
            <p className="kicker light">Work</p>
            <h2 id="w-h">GATSapp, for the Greater Atlanta <em>Tamil Sangam.</em></h2>
            <p className="sec-lede">
              A phone-first app where members find an open volunteer job and sign up in one tap, and organizers
              see who is coming. Built for the GATS Youth NextGen Summit 2026.
            </p>
          </header>
          <div className="work-grid">
            <div className="work-shots" aria-hidden="false">
              {phone("signedup", "GATSapp after a member signs up for a volunteer job", "p1")}
              {phone("announce", "GATSapp announcement drafted by AI for sharing to WhatsApp", "p2")}
              {phone("chat", "GATSapp private team chat for admins", "p3")}
            </div>
            <div className="work-facts">
              <dl>
                <div><dt>The problem</dt><dd>Organizers counted RSVPs and volunteers by hand. Members lost details in long chats. Volunteers could not see open jobs until the last week.</dd></div>
                <div><dt>What we built</dt><dd>Email sign-in with admin approval, a volunteer board, a “your jobs” list, RSVPs, planning checklists, a view for each role, and an English and Tamil interface.</dd></div>
                <div><dt>Ready to switch on</dt><dd>AI event drafts, WhatsApp announcements and an admin team chat are built. Tamil wording still needs a fluent reader.</dd></div>
                <div><dt>Next</dt><dd>A pilot at a real event. Proposed targets, not results yet: every job filled 3 to 7 days ahead, and headcount within 10% of who comes.</dd></div>
              </dl>
              <div className="cta-row">
                <a className="btn btn-light" href={SITE.gatsLiveUrl} target="_blank" rel="noopener noreferrer">Open the live app</a>
              </div>
              <p className="credit">Built by Jay Gaur, Mithran Saravanan, Shriyan Thangeda and Aaron Jacob. Screens shown with test data.</p>
            </div>
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

      {/* About */}
      <section className="section tint" id="about" aria-labelledby="a-h">
        <div className="wrap split">
          <h2 id="a-h">A small team <em>you can reach.</em></h2>
          <div className="prose">
            <p>Nesting is a studio, not an agency. You talk to the people building your tool, and they talk to the people who will use it.</p>
            <p>We name a nest as a place that holds many things together. That is what a good tool does for a group: one place for the jobs, the dates and the people.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta" aria-labelledby="c-h">
        <div className="wrap cta-inner">
          <h2 id="c-h">Tell us what your team needs <em>to get done.</em></h2>
          <div className="cta-row">
            <a className="btn btn-light" href={`mailto:${SITE.email}?subject=Start%20a%20project`}>Start a project</a>
            <Link className="btn btn-outline-light" href="/signup">Create an account</Link>
          </div>
          <p className="cta-mail">Or write to {SITE.email}</p>
        </div>
      </section>
    </main>
  );
}
