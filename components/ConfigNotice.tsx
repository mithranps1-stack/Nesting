import { CONFIG_MESSAGES, supabaseConfigProblem } from "@/lib/supabase/env";

export default function ConfigNotice() {
  if (!supabaseConfigProblem) return null;
  return <p className="notice warn" role="status">{CONFIG_MESSAGES[supabaseConfigProblem]}</p>;
}
