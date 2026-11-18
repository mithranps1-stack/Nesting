import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { signOut } from "@/app/auth/actions";

export const metadata: Metadata = { title: "Your account" };

export default async function AccountPage() {
  if (!isSupabaseConfigured) redirect("/login");
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  const user = data.user;
  if (!user) redirect("/login?next=/account");

  const name = (user.user_metadata?.full_name as string | undefined) ?? user.email?.split("@")[0];
  const since = new Date(user.created_at).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <main id="main" className="auth-page">
      <div className="auth-card wide">
        <h1>Hi, <em>{name}.</em></h1>
        <dl className="facts">
          <div><dt>Email</dt><dd>{user.email}</dd></div>
          <div><dt>Member since</dt><dd>{since}</dd></div>
        </dl>
        <div className="empty">
          <h2>No projects yet</h2>
          <p>
            When we start working together, your project will show up here. To begin, tell us what your
            team needs to get done.
          </p>
          <Link className="btn" href="/start">Start a project</Link>
        </div>
        <form action={signOut}>
          <button className="btn btn-ghost" type="submit">Sign out</button>
        </form>
        <p className="switch"><Link href="/">Back to the site</Link></p>
      </div>
    </main>
  );
}
