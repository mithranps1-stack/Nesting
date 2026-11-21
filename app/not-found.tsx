import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="auth-page">
      <div className="auth-card">
        <p className="kicker">404</p>
        <h1>That page is <em>not here.</em></h1>
        <p className="auth-sub">The link may be old, or the page may have moved.</p>
        <p><Link className="btn" href="/">Back to the home page</Link></p>
      </div>
    </main>
  );
}
