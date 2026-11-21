import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ARTICLES } from "@/lib/articles";

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const a = ARTICLES.find((x) => x.slug === slug);
  return a ? { title: a.title, description: a.description } : {};
}

export default async function Article({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = ARTICLES.find((x) => x.slug === slug);
  if (!a) notFound();
  return (
    <main id="main" className="legal-page">
      <article className="wrap narrow">
        <p className="kicker"><Link href="/resources">Resources</Link></p>
        <h1>{a.title}</h1>
        <p className="updated">{new Date(a.date + "T12:00:00").toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })} · {a.read}</p>
        {a.body.map((b, i) =>
          b.t === "h2" ? <h2 key={i}>{b.text}</h2>
          : b.t === "p" ? <p key={i}>{b.text}</p>
          : <ul key={i}>{b.items.map((it) => <li key={it}>{it}</li>)}</ul>,
        )}
        <div className="article-cta">
          <h2>Want this built for your group?</h2>
          <p>We make small, phone-first tools for volunteers, RSVPs and members.</p>
          <Link className="btn" href="/start?topic=Events%20and%20volunteer%20tools">Start a project</Link>
        </div>
      </article>
    </main>
  );
}
