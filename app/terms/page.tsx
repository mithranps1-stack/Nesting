import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const metadata: Metadata = { title: "Terms of use" };

export default function Terms() {
  return (
    <main id="main" className="legal-page">
      <div className="wrap narrow">
        <p className="kicker">Legal</p>
        <h1>Terms of <em>use.</em></h1>
        <p className="updated">Last updated {SITE.legalUpdated}</p>

        <p>These terms cover your use of {SITE.domain}. By using the site you agree to them. If you do not agree, please do not use it.</p>

        <h2>The site</h2>
        <p>The site describes the services of {SITE.legalName} and lets you create an account and send us a project request. We may change, pause or remove any part of it at any time.</p>

        <h2>Your account</h2>
        <ul>
          <li>Give us accurate information and keep your password private.</li>
          <li>You are responsible for what happens under your account.</li>
          <li>Tell us if you think someone else has used it.</li>
          <li>We may close accounts that are used to harm the site or other people.</li>
        </ul>

        <h2>Acceptable use</h2>
        <p>Do not try to break, overload or gain unauthorized access to the site, send spam through the forms, or use the site to break the law.</p>

        <h2>Project work</h2>
        <p>Pricing on this site shows starting prices, not offers. Any project is governed by a separate written agreement that sets out the scope, price, schedule and who owns what. If that agreement and these terms disagree, the agreement wins for that project.</p>

        <h2>Our content</h2>
        <p>The site’s design, text and images belong to {SITE.legalName} or are used with permission. The example app screens shown here use test data. Please do not copy the site without asking.</p>

        <h2>No guarantees</h2>
        <p>We work to keep the site accurate and available, but we provide it as it is, without promises that it will always be error-free or uninterrupted. To the extent the law allows, {SITE.legalName} is not liable for indirect or consequential losses arising from use of the site.</p>

        <h2>Governing law</h2>
        <p>These terms are governed by the laws of the state where {SITE.legalName} is registered, and the courts there can hear disputes, unless the law where you live says otherwise.</p>

        <h2>Changes and contact</h2>
        <p>We may update these terms and will change the date above when we do. Questions: <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.</p>
      </div>
    </main>
  );
}
