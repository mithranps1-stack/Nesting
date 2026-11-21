import type { Metadata } from "next";
import Link from "next/link";
import { ARTICLES } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Resources",
  description: "Practical guides for people who organize.",
};

export default function Resources() {
  return (
    <main id="main">
      <section className="page-hero">
        <div className="wrap">
          <p className="kicker">Resources</p>
          <h1>Practical guides for <em>people who organize.</em></h1>
        </div>
      </section>
      <section className="section tight">
        <div className="wrap articles">
          {ARTICLES.map((a) => (
            <Link key={a.slug} href={`/resources/${a.slug}`} className="article-card">
              <p className="article-meta">{new Date(a.date + "T12:00:00").toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })} · {a.read}</p>
              <h2>{a.title}</h2>
              <p>{a.description}</p>
              <span className="textlink">Read the guide →</span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
