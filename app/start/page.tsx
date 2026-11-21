import type { Metadata } from "next";
import StartForm from "@/components/StartForm";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { SITE } from "@/lib/site";

export const metadata: Metadata = { title: "Start a project" };

export default async function StartPage({ searchParams }: { searchParams: Promise<{ topic?: string }> }) {
  const { topic } = await searchParams;
  let name: string | undefined;
  let email: string | undefined;
  if (isSupabaseConfigured) {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();
    email = data.user?.email ?? undefined;
    name = (data.user?.user_metadata?.full_name as string | undefined) ?? undefined;
  }
  return (
    <main id="main" className="auth-page">
      <div className="auth-card wide">
        <h1>Start a <em>project.</em></h1>
        <p className="auth-sub">Tell us what your team needs to get done. You can also write to {SITE.email}.</p>
        <StartForm topic={topic ?? ""} name={name} email={email} />
      </div>
    </main>
  );
}
