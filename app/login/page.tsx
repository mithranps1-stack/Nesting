import type { Metadata } from "next";
import AuthForm from "@/components/AuthForm";
import ConfigNotice from "@/components/ConfigNotice";

export const metadata: Metadata = { title: "Sign in" };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; error?: string }>;
}) {
  const { next, error } = await searchParams;
  return (
    <main id="main" className="auth-page">
      <div className="auth-card">
        <h1>Welcome <em>back.</em></h1>
        <p className="auth-sub">Sign in to see your account.</p>
        {error === "link" && (
          <p className="notice error" role="alert">
            That link has expired or was already used. Sign in below or request a new link.
          </p>
        )}
        <ConfigNotice />
        <AuthForm mode="login" next={next} />
      </div>
    </main>
  );
}
