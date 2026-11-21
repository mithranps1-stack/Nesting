import { QUOTES } from "@/lib/quotes";

/** Shows nothing until you add real quotes in lib/quotes.ts. */
export default function Quotes() {
  if (QUOTES.length === 0) return null;
  return (
    <section className="section" aria-labelledby="qt-h">
      <div className="wrap">
        <header className="sec-head">
          <p className="kicker">What people say</p>
          <h2 id="qt-h">In their <em>words.</em></h2>
        </header>
        <div className="quotes">
          {QUOTES.map((q) => (
            <figure key={q.name} className="qcard">
              <blockquote>“{q.text}”</blockquote>
              <figcaption><b>{q.name}</b><span>{q.role}</span></figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
