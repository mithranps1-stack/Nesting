"use server";

import { createClient } from "@/lib/supabase/server";
import { CONFIG_MESSAGES, isSupabaseConfigured, supabaseConfigProblem } from "@/lib/supabase/env";
import { SITE } from "@/lib/site";
import type { FormState } from "@/app/auth/actions";

const text = (f: FormData, k: string, max: number) => String(f.get(k) ?? "").trim().slice(0, max);

export async function submitRequest(_: FormState, formData: FormData): Promise<FormState> {
  // Hidden field that real people never fill in.
  if (text(formData, "company", 100)) return { message: "Thanks. We will be in touch." };

  const name = text(formData, "name", 200);
  const email = text(formData, "email", 320);
  const group = text(formData, "group", 100);
  const topic = text(formData, "topic", 100);
  const message = text(formData, "message", 4000);

  if (!name) return { error: "Enter your name." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { error: "Enter a valid email so we can write back." };
  if (!message) return { error: "Tell us a little about what your team needs to get done." };

  if (!isSupabaseConfigured) {
    const why = supabaseConfigProblem === "invalid"
      ? CONFIG_MESSAGES.invalid
      : "The request form is not connected to Supabase yet.";
    return { error: `${why} Until then, email ${SITE.email}.` };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("project_requests")
    .insert({ name, email, group_type: group || null, topic: topic || null, message });
  if (error) {
    return { error: `We could not save your request. Email ${SITE.email} instead.` };
  }
  return { message: `Thanks, ${name.split(" ")[0]}. We got your request and will reply to ${email}.` };
}
