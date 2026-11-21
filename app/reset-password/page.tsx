import type { Metadata } from "next";
import { ResetForm } from "@/components/PasswordForms";

export const metadata: Metadata = { title: "Choose a new password" };
export const dynamic = "force-dynamic";

// The reset email lands here after /auth/callback signs the visitor in. The middleware
// sends anyone who is not signed in to /login.
export default function ResetPasswordPage() {
  return (
    <main id="main" className="auth-page">
      <div className="auth-card">
        <h1>Choose a new <em>password.</em></h1>
        <ResetForm />
      </div>
    </main>
  );
}
