"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { configMessage, isSupabaseConfigured } from "@/lib/supabase/env";

export type FormState = { error?: string; message?: string };

const notConfigured = () => configMessage();

/** Only allow same-site relative redirects. */
function safeNext(value: FormDataEntryValue | null) {
  const next = typeof value === "string" ? value : "";
  return next.startsWith("/") && !next.startsWith("//") ? next : "/account";
}

function friendly(message: string) {
  return /fetch failed|network/i.test(message)
    ? "We could not reach the sign-in service. Try again in a moment."
    : message;
}

async function siteOrigin() {
  const h = await headers();
  const origin = h.get("origin");
  if (origin) return origin;
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  const host = h.get("x-forwarded-host") ?? h.get("host");
  return `${h.get("x-forwarded-proto") ?? "https"}://${host}`;
}

export async function signIn(_: FormState, formData: FormData): Promise<FormState> {
  if (!isSupabaseConfigured) return { error: notConfigured() };
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  if (!email || !password) return { error: "Enter your email and password." };

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    if (error.code === "email_not_confirmed")
      return { error: "Confirm your email first. We sent you a link when you signed up." };
    if (error.code === "invalid_credentials")
      return { error: "That email and password do not match. Check them and try again." };
    return { error: friendly(error.message) };
  }
  redirect(safeNext(formData.get("next")));
}

export async function signUp(_: FormState, formData: FormData): Promise<FormState> {
  if (!isSupabaseConfigured) return { error: notConfigured() };
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  if (!name || !email) return { error: "Enter your name and email." };
  if (password.length < 8) return { error: "Use a password with at least 8 characters." };

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: name },
      emailRedirectTo: `${await siteOrigin()}/auth/callback`,
    },
  });
  if (error) return { error: friendly(error.message) };

  // With email confirmation on, there is no session yet.
  if (!data.session) {
    return { message: `We sent a confirmation link to ${email}. Open it to finish signing up.` };
  }
  redirect("/account");
}

export async function sendMagicLink(_: FormState, formData: FormData): Promise<FormState> {
  if (!isSupabaseConfigured) return { error: notConfigured() };
  const email = String(formData.get("email") ?? "").trim();
  if (!email) return { error: "Enter your email to get a sign-in link." };

  const supabase = await createClient();
  const next = encodeURIComponent(safeNext(formData.get("next")));
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: { emailRedirectTo: `${await siteOrigin()}/auth/callback?next=${next}` },
  });
  if (error) return { error: friendly(error.message) };
  return { message: `Check ${email} for a sign-in link.` };
}

export async function signOut() {
  if (isSupabaseConfigured) {
    const supabase = await createClient();
    await supabase.auth.signOut();
  }
  redirect("/");
}
