import Link from "next/link";
import { LogoMark } from "./Logo";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { SITE } from "@/lib/site";

const NAV = [
  { href: "/#work", label: "Work" },
  { href: "/#services", label: "Services" },
  { href: "/#process", label: "How we work" },
  { href: "/#about", label: "About" },
];

export default async function Header() {
  let signedIn = false;
  if (isSupabaseConfigured) {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();
    signedIn = Boolean(data.user);
  }

  return (
    <>
      <a className="skip" href="#main">Skip to main content</a>
      <header className="site-header">
        <div className="wrap bar">
          <Link href="/" className="brand" aria-label={`${SITE.name} home`}>
            <LogoMark /> <span>nesting</span>
          </Link>
          <nav aria-label="Main" className="nav">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href}>{n.label}</Link>
            ))}
          </nav>
          <div className="bar-actions">
            <Link className="link-quiet" href={signedIn ? "/account" : "/login"}>
              {signedIn ? "Account" : "Sign in"}
            </Link>
            <a className="btn btn-sm" href={`mailto:${SITE.email}?subject=Start%20a%20project`}>Start a project</a>
          </div>
          <details className="menu">
            <summary aria-label="Menu"><span /><span /></summary>
            <div className="menu-panel">
              {NAV.map((n) => (
                <Link key={n.href} href={n.href}>{n.label}</Link>
              ))}
              <Link href={signedIn ? "/account" : "/login"}>{signedIn ? "Account" : "Sign in"}</Link>
            </div>
          </details>
        </div>
      </header>
    </>
  );
}
