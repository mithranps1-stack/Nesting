const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
const rawKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();

export const supabaseUrl = rawUrl;
export const supabaseKey = rawKey;

// Real keys are plain ASCII. A key copied from a masked field is made of "•" dots instead.
const plain = (s?: string) => !!s && /^[\x21-\x7E]+$/.test(s);

/** "missing": not set. "invalid": set but not a real URL/key (for example copied as dots). */
export const supabaseConfigProblem: "missing" | "invalid" | null =
  !rawUrl || !rawKey
    ? "missing"
    : !plain(rawUrl) || !plain(rawKey) || !/^https?:\/\//.test(rawUrl)
      ? "invalid"
      : null;

/** False until both Supabase env vars are set to real values. The site still renders without them. */
export const isSupabaseConfigured = supabaseConfigProblem === null;

export const CONFIG_MESSAGES = {
  missing:
    "Sign-in is not set up yet. Add the two Supabase environment variables, then redeploy.",
  invalid:
    "The Supabase values in your environment variables look wrong. They may have been copied as dots (••••) instead of the real text. Copy them again from Supabase, save them in Vercel, then redeploy.",
} as const;
