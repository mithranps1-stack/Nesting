import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { setStatus } from "./actions";

export const metadata: Metadata = { title: "Requests", robots: { index: false } };
export const dynamic = "force-dynamic";

const STATUSES = [
  { id: "new", label: "New" },
  { id: "contacted", label: "Contacted" },
  { id: "in_progress", label: "In progress" },
  { id: "done", label: "Done" },
  { id: "archived", label: "Archived" },
];

type Row = {
  id: string; created_at: string; name: string; email: string;
  group_type: string | null; topic: string | null; message: string | null; status: string;
};

export default async function AdminPage({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  if (!isSupabaseConfigured) redirect("/login");
  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) redirect("/login?next=/admin");
  const { data: isAdmin } = await supabase.rpc("is_admin");
  if (!isAdmin) notFound();

  const { status: filter } = await searchParams;
  const { data, error } = await supabase
    .from("project_requests")
    .select("id, created_at, name, email, group_type, topic, message, status")
    .order("created_at", { ascending: false })
    .limit(300);
  const rows = (data ?? []) as Row[];
  const counts = Object.fromEntries(STATUSES.map((s) => [s.id, rows.filter((r) => r.status === s.id).length]));
  const shown = filter && STATUSES.some((s) => s.id === filter) ? rows.filter((r) => r.status === filter) : rows;

  return (
    <main id="main" className="admin">
      <div className="wrap">
        <p className="kicker">Founders only</p>
        <h1>Project <em>requests.</em></h1>
        {error && <p className="notice error">Could not load requests: {error.message}. Did you run supabase/schema.sql?</p>}
        <nav className="seg admin-tabs" aria-label="Filter by status">
          <Link href="/admin" aria-current={!filter ? "page" : undefined}>All ({rows.length})</Link>
          {STATUSES.map((s) => (
            <Link key={s.id} href={`/admin?status=${s.id}`} aria-current={filter === s.id ? "page" : undefined}>
              {s.label} ({counts[s.id]})
            </Link>
          ))}
        </nav>
        {shown.length === 0 ? (
          <div className="empty"><h2>Nothing here yet</h2><p>New requests from the Start a project form will show up in this list.</p></div>
        ) : (
          <ul className="req-list">
            {shown.map((r) => (
              <li key={r.id} className="req">
                <div className="req-top">
                  <div>
                    <h2>{r.name}</h2>
                    <a href={`mailto:${r.email}?subject=Your%20Nesting%20project`}>{r.email}</a>
                  </div>
                  <time dateTime={r.created_at}>
                    {new Date(r.created_at).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })}
                  </time>
                </div>
                <p className="req-tags">
                  {r.group_type && <span>{r.group_type}</span>}
                  {r.topic && <span>{r.topic}</span>}
                </p>
                <p className="req-msg">{r.message}</p>
                <form action={setStatus} className="req-status">
                  <input type="hidden" name="id" value={r.id} />
                  <label htmlFor={`st-${r.id}`}>Status</label>
                  <select id={`st-${r.id}`} name="status" defaultValue={r.status}>
                    {STATUSES.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
                  </select>
                  <button className="btn btn-sm" type="submit">Save</button>
                </form>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
