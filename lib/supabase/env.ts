// Reads the two Supabase variables at runtime, cleans common paste mistakes,
// and reports exactly what is wrong (without printing the secret itself).
const URL_NAME = "NEXT_PUBLIC_SUPABASE_URL";
const KEY_NAME = "NEXT_PUBLIC_SUPABASE_ANON_KEY";

// Prefer the value present at runtime; fall back to the one baked in at build time.
const BUILT: Record<string, string | undefined> = {
  [URL_NAME]: process.env.NEXT_PUBLIC_SUPABASE_URL,
  [KEY_NAME]: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
};
const read = (name: string) => process.env[name] || BUILT[name];

function strip(raw: string | undefined, name: string) {
  let v = (raw ?? "").trim();
  if (v.startsWith(`${name}=`)) v = v.slice(name.length + 1); // pasted "NAME=value"
  return v.replace(/^["'`]+|["'`]+$/g, "").trim();
}

const badChars = (s: string) => [...s].filter((c) => c.charCodeAt(0) < 33 || c.charCodeAt(0) > 126).length;

function roleOf(jwt: string): string | null {
  try {
    const part = jwt.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(atob(part)).role ?? null;
  } catch {
    return null;
  }
}

const problems: string[] = [];

// URL: remove stray spaces, add https:// if missing, drop any path.
let url = strip(read(URL_NAME), URL_NAME).replace(/\s+/g, "");
if (!url) {
  problems.push(`${URL_NAME} is not set.`);
} else {
  try {
    url = new URL(/^https?:\/\//i.test(url) ? url : `https://${url}`).origin;
  } catch {
    problems.push(`${URL_NAME} is not a valid web address. It should look like https://abcdxyz.supabase.co`);
  }
}

// Key: a real key has no spaces or line breaks, so remove any that came from copy and paste.
const key = strip(read(KEY_NAME), KEY_NAME).replace(/\s+/g, "");
if (!key) {
  problems.push(`${KEY_NAME} is not set.`);
} else {
  const bad = badChars(key);
  if (bad > 0) {
    problems.push(`${KEY_NAME} contains ${bad} character${bad === 1 ? "" : "s"} that are not part of a real key (for example the dots •). Copy it again with Supabase's copy button.`);
  } else if (key.startsWith("sb_secret_") || roleOf(key) === "service_role") {
    problems.push(`${KEY_NAME} is a secret key. Use the anon or publishable key instead, and rotate the secret key in Supabase because it was exposed.`);
  } else if (key.length < 20) {
    problems.push(`${KEY_NAME} looks too short (${key.length} characters). It may have been cut off when copied.`);
  }
}

export const supabaseUrl = url || undefined;
export const supabaseKey = key || undefined;

/** "missing": nothing set. "invalid": set, but something is wrong. */
export const supabaseConfigProblem: "missing" | "invalid" | null =
  problems.length === 0 ? null : !read(URL_NAME) && !read(KEY_NAME) ? "missing" : "invalid";

export const isSupabaseConfigured = supabaseConfigProblem === null;

/** Plain-language explanation to show on pages and in form errors. */
export function configMessage(): string {
  if (supabaseConfigProblem === null) return "";
  const fix = "Fix it in Vercel under Settings > Environment Variables, then redeploy.";
  if (supabaseConfigProblem === "missing")
    return `Sign-in is not set up yet. Add ${URL_NAME} and ${KEY_NAME}. ${fix}`;
  return `Supabase is connected incorrectly. ${problems.join(" ")} ${fix}`;
}
