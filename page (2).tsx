import type { Metadata } from "next";
import AuthForm from "@/components/AuthForm";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export const metadata: Metadata = { title: "Create an account" };

export default function SignupPage() {
  return (
    <main id="main" className="auth-page">
      <div className="auth-card">
        <h1>Make a <em>home</em> here.</h1>
        <p className="auth-sub">Create an account to start and follow your project with us.</p>
        {!isSupabaseConfigured && (
          <p className="notice warn">
            Supabase is not connected yet. Add <code>NEXT_PUBLIC_SUPABASE_URL</code> and{" "}
            <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code>, then restart.
          </p>
        )}
        <AuthForm mode="signup" />
      </div>
    </main>
  );
}
