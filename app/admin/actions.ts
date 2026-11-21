"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";

const STATUSES = ["new", "contacted", "in_progress", "done", "archived"];

export async function setStatus(formData: FormData) {
  if (!isSupabaseConfigured) return;
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "");
  if (!id || !STATUSES.includes(status)) return;
  const supabase = await createClient();
  const { data: ok } = await supabase.rpc("is_admin");
  if (!ok) return; // row-level security would block it anyway
  await supabase.from("project_requests").update({ status }).eq("id", id);
  revalidatePath("/admin");
}
