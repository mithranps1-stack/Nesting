import Link from "next/link";
import { LogoMark } from "./Logo";
import { SITE } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap foot">
        <div>
          <Link href="/" className="brand"><LogoMark /> <span>nesting</span></Link>
          <p className="foot-note">{SITE.tagline}.</p>
        </div>
        <div>
          <h2 className="foot-h">Site</h2>
          <ul>
            <li><Link href="/#services">Services</Link></li>
            <li><Link href="/#work">Work</Link></li>
            <li><Link href="/pricing">Pricing</Link></li>
            <li><Link href="/resources">Resources</Link></li>
            <li><Link href="/founders">Founders</Link></li>
            <li><Link href="/start">Start a project</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="foot-h">Account</h2>
          <ul>
            <li><Link href="/login">Sign in</Link></li>
            <li><Link href="/signup">Create an account</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="foot-h">Contact</h2>
          <ul>
            <li><a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
            <li><Link href="/privacy">Privacy policy</Link></li>
            <li><Link href="/terms">Terms of use</Link></li>
          </ul>
        </div>
      </div>
      <div className="wrap legal">
        <span>© {new Date().getFullYear()} {SITE.legalName}</span>
        <span>GATSapp screens are shown with test data.</span>
      </div>
    </footer>
  );
}
