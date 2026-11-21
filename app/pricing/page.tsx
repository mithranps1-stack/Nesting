import type { Metadata } from "next";
import Link from "next/link";
import BookCall from "@/components/BookCall";
import { ADDONS, CARE, FAQ, PLANS, money } from "@/lib/pricing";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Starting prices for Nesting websites, events and volunteer tools, and member apps.",
};

export default function PricingPage() {
  return (
    <main id="main">
      <section className="page-hero">
        <div className="wrap">
          <p className="kicker">Pricing</p>
          <h1>Fixed prices, <em>no surprises.</em></h1>
          <p className="lede">Start from one of these. After we talk, you get one price in writing before any work begins.</p>
        </div>
      </section>

      <section className="section tight" aria-label="Plans">
        <div className="wrap plans">
          {PLANS.map((p) => (
            <article key={p.id} className={`plan${p.featured ? " featured" : ""}`}>
              {p.featured && <span className="badge">Most chosen starting point</span>}
              <h2>{p.name}</h2>
              <p className="plan-blurb">{p.blurb}</p>
              <p className="price"><small>from</small> {money(p.from)}</p>
              <ul className="ticks">{p.includes.map((i) => <li key={i}>{i}</li>)}</ul>
              <Link className={`btn ${p.featured ? "" : "btn-ghost"} btn-block`} href={`/start?topic=${encodeURIComponent(p.topic)}`}>
                Ask about this
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="section tint" aria-labelledby="care-h">
        <div className="wrap split">
          <div>
            <p className="kicker">After the handoff</p>
            <h2 id="care-h">The {CARE.name}, <em>if you want it.</em></h2>
            <p className="sec-lede">{CARE.blurb}</p>
          </div>
          <div className="care">
            <p className="price"><small>from</small> {money(CARE.perMonth)}<small> / month</small></p>
            <ul className="ticks">{CARE.includes.map((i) => <li key={i}>{i}</li>)}</ul>
            <p className="addons-h">Add-ons, quoted with your project</p>
            <ul className="chips small">{ADDONS.map((a) => <li key={a}>{a}</li>)}</ul>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="faq-h">
        <div className="wrap split">
          <header>
            <p className="kicker">Questions</p>
            <h2 id="faq-h">Before you <em>ask.</em></h2>
            <p className="sec-lede">Something missing? Ask on a call and we will answer it here too.</p>
          </header>
          <div className="faq">
            {FAQ.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="cta" aria-labelledby="c-h">
        <div className="wrap cta-inner">
          <h2 id="c-h">Not sure which one <em>fits?</em></h2>
          <div className="cta-row">
            <BookCall className="btn btn-light" />
            <Link className="btn btn-outline-light" href="/start">Start a project</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
