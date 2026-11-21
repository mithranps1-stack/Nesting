import type { Metadata } from "next";
import ConfigNotice from "@/components/ConfigNotice";
import { ForgotForm } from "@/components/PasswordForms";

export const metadata: Metadata = { title: "Reset your password" };
export const dynamic = "force-dynamic";

export default function ForgotPasswordPage() {
  return (
    <main id="main" className="auth-page">
      <div className="auth-card">
        <h1>Forgot your <em>password?</em></h1>
        <p className="auth-sub">Enter your email and we will send you a link to choose a new one.</p>
        <ConfigNotice />
        <ForgotForm />
      </div>
    </main>
  );
}
