import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import BookCall from "@/components/BookCall";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "GATSapp case study",
  description: "How we built a volunteer and RSVP app for the Greater Atlanta Tamil Sangam.",
};

const SCREENS = [
  { img: "signin", h: "Sign in", p: "Members enter an email and get a sign-in link. Google sign-in is planned.", alt: "GATSapp sign-in screen" },
  { img: "people", h: "Approve members", p: "New accounts wait for an admin to approve them. Only the owner can make someone an admin.", alt: "GATSapp People tab with a pending member to approve" },
  { img: "home", h: "Next event", p: "The next event, how many are coming, and one tap to answer Going, Maybe or Can’t make it.", alt: "GATSapp home screen with the next event" },
  { img: "board", h: "Volunteer board", p: "Every open job with the date and spots left.", alt: "GATSapp volunteer board" },
  { img: "signedup", h: "One-tap sign-up", p: "The job and RSVP update instantly and appear under “Your volunteer jobs”.", alt: "GATSapp after signing up for a job" },
  { img: "plan", h: "Plan with AI", p: "Describe an event and AI drafts it with volunteer roles. Built and ready to switch on.", alt: "GATSapp plan an event with AI" },
  { img: "announce", h: "WhatsApp announcement", p: "AI drafts an announcement. Organizers check it, then copy it or share it to WhatsApp.", alt: "GATSapp announcement draft" },
  { img: "chat", h: "Admin team chat", p: "Admins coordinate in the app. Members keep using WhatsApp for the rest.", alt: "GATSapp private team chat" },
  { img: "tamil", h: "English and தமிழ்", p: "The whole app switches to Tamil. The wording still needs a fluent reader.", alt: "GATSapp in Tamil" },
];

export default function GatsCaseStudy() {
  return (
    <main id="main">
      <section className="page-hero">
        <div className="wrap">
          <p className="kicker">Case study</p>
          <h1>GATSapp, for the Greater Atlanta <em>Tamil Sangam.</em></h1>
          <p className="lede">A phone-first app where members find an open volunteer job and sign up in one tap, and organizers see who is coming. Built for the GATS Youth NextGen Summit 2026.</p>
          <div className="cta-row">
            <a className="btn" href={SITE.gatsLiveUrl} target="_blank" rel="noopener noreferrer">Open the live app</a>
            <Link className="btn btn-ghost" href="/start">Start a project</Link>
          </div>
        </div>
      </section>

      <section className="section tight">
        <div className="wrap cs-grid">
          <article>
            <h2>The problem</h2>
            <p>Organizers counted RSVPs and volunteers by hand. Members lost event details in long group chats. Volunteers could not see which jobs were open until the last week.</p>
          </article>
          <article>
            <h2>How we learned it</h2>
            <p>We talked to an event planner who walked us through collecting RSVPs and volunteers across WhatsApp and spreadsheets. Most of the time went into counting heads and finding open jobs too late.</p>
          </article>
          <article>
            <h2>What changed after feedback</h2>
            <p>Mock-presentation reviewers said to make it more volunteer-oriented, so we added the volunteer board, a “your jobs” list, one-tap sign-up and rosters. The planner said to focus on navigability and reliability, so we rebuilt it as a phone-first app with simple tabs.</p>
          </article>
        </div>
      </section>

      <section className="section tint" aria-labelledby="sc-h">
        <div className="wrap">
          <header className="sec-head">
            <p className="kicker">The screens</p>
            <h2 id="sc-h">Nine screens, <em>one flow.</em></h2>
            <p className="sec-lede">Shown with test data.</p>
          </header>
          <div className="gallery">
            {SCREENS.map((s) => (
              <figure key={s.img}>
                <Image src={`/gats/${s.img}.webp`} width={400} height={841} alt={s.alt} />
                <figcaption><b>{s.h}</b><span>{s.p}</span></figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="ho-h">
        <div className="wrap three">
          <article className="col-card">
            <h2 id="ho-h">Works today</h2>
            <ul className="ticks">
              <li>Live app with email sign-in and admin approval</li>
              <li>A view for each role</li>
              <li>Volunteer board, RSVPs and planning checklists</li>
              <li>Permission rules tested for every role</li>
            </ul>
          </article>
          <article className="col-card">
            <h2>Handoff</h2>
            <ul className="ticks">
              <li>Hosting on free plans: $0 a month</li>
              <li>Code on GitHub with a setup guide</li>
              <li>Any GATS official can run it</li>
              <li>Later: a GATS email address and low-cost AI tools</li>
            </ul>
          </article>
          <article className="col-card">
            <h2>Still to do</h2>
            <ul className="ticks">
              <li>Switch on the AI tools and team chat</li>
              <li>Google sign-in and a GATS email address</li>
              <li>Tamil wording checked by a fluent reader</li>
              <li>A pilot at a real event</li>
            </ul>
          </article>
        </div>
        <div className="wrap">
          <div className="targets">
            <h3>How we will know it worked</h3>
            <p>Proposed targets, not results yet: every volunteer job filled 3 to 7 days ahead, and headcount within 10% of who actually comes.</p>
          </div>
          <p className="credit-dark">Built by Jay Gaur, Mithran Saravanan, Shriyan Thangeda and Aaron Jacob.</p>
        </div>
      </section>

      <section className="cta" aria-labelledby="c-h">
        <div className="wrap cta-inner">
          <h2 id="c-h">Want something like this <em>for your group?</em></h2>
          <div className="cta-row">
            <Link className="btn btn-light" href="/start">Start a project</Link>
            <BookCall className="btn btn-outline-light" />
          </div>
        </div>
      </section>
    </main>
  );
}
