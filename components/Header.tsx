import Link from "next/link";
import { LogoMark } from "./Logo";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { SITE } from "@/lib/site";

const NAV = [
  { href: "/#services", label: "Services" },
  { href: "/#work", label: "Work" },
  { href: "/#process", label: "How we work" },
  { href: "/founders", label: "Founders" },
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
            <Link className="btn btn-sm" href="/start">Start a project</Link>
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
