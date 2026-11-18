import type { Metadata } from "next";
import AuthForm from "@/components/AuthForm";
import ConfigNotice from "@/components/ConfigNotice";

export const metadata: Metadata = { title: "Create an account" };

export default function SignupPage() {
  return (
    <main id="main" className="auth-page">
      <div className="auth-card">
        <h1>Make a <em>home</em> here.</h1>
        <p className="auth-sub">Create an account to start and follow your project with us.</p>
        <ConfigNotice />
        <AuthForm mode="signup" />
      </div>
    </main>
  );
}
