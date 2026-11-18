export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
export const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/** False until the two Supabase env vars are set. The site still renders without them. */
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseKey);
