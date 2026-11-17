import type { Metadata } from "next";
import AuthForm from "@/components/AuthForm";
import { isSupabaseConfigured } from "@/lib/supabase/env";

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
        {!isSupabaseConfigured && (
          <p className="notice warn">
            Supabase is not connected yet. Add <code>NEXT_PUBLIC_SUPABASE_URL</code> and{" "}
            <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code>, then restart.
          </p>
        )}
        <AuthForm mode="login" next={next} />
      </div>
    </main>
  );
}
