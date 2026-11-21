import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const metadata: Metadata = { title: "Privacy policy" };

export default function Privacy() {
  return (
    <main id="main" className="legal-page">
      <div className="wrap narrow">
        <p className="kicker">Legal</p>
        <h1>Privacy <em>policy.</em></h1>
        <p className="updated">Last updated {SITE.legalUpdated}</p>

        <p>This policy explains what {SITE.legalName} (“we”, “us”) collects when you use {SITE.domain}, and what we do with it.</p>

        <h2>What we collect</h2>
        <ul>
          <li><b>Account details.</b> Your name (if you give it), your email address, and a password that is stored in scrambled form. If you sign in with Google, we receive your name and email from Google.</li>
          <li><b>Project requests.</b> What you type into the Start a project form: your name, email, the kind of group you represent, what you need, and your message.</li>
          <li><b>Sign-in cookies.</b> Small files that keep you signed in. We do not use them for advertising.</li>
          <li><b>Basic visit statistics.</b> Page views and general device and location information, collected by our analytics provider without following you across other sites.</li>
        </ul>

        <h2>How we use it</h2>
        <ul>
          <li>To create and protect your account, and send sign-in, confirmation and password-reset emails.</li>
          <li>To read and answer your project request.</li>
          <li>To understand which pages are useful and to fix problems.</li>
        </ul>
        <p>We do not sell your information.</p>

        <h2>Who handles it for us</h2>
        <p>We use services that store or process data on our behalf: Supabase (accounts and project requests), Vercel (hosting and analytics), and an email provider (messages we send you). They may process data in the United States and other countries. If you sign in with Google, Google handles that sign-in under its own policy.</p>

        <h2>How long we keep it</h2>
        <p>We keep account details while your account exists. We keep project requests for as long as they are useful to answer you and to keep a record of our work. You can ask us to delete either at any time.</p>

        <h2>Your choices</h2>
        <p>You can ask to see, correct or delete your information by writing to <a href={`mailto:${SITE.email}`}>{SITE.email}</a>. You can also delete cookies in your browser, though you will be signed out.</p>

        <h2>Children</h2>
        <p>This site is for organizers and businesses, not for children under 13. We do not knowingly collect information from children under 13. If you think a child has given us information, write to us and we will delete it.</p>

        <h2>Changes</h2>
        <p>If we change this policy, we will update the date above. If the change is significant, we will say so on this page.</p>

        <h2>Contact</h2>
        <p>Questions about this policy: <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.</p>
      </div>
    </main>
  );
}
