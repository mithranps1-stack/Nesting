// Emails the founders when someone sends a project request. Optional: does nothing until
// RESEND_API_KEY and NOTIFY_EMAIL are set. A failure here never blocks the form.
type Req = { name: string; email: string; group: string; topic: string; message: string };

export async function notifyFounders(r: Req) {
  const key = process.env.RESEND_API_KEY;
  const to = (process.env.NOTIFY_EMAIL ?? "").split(",").map((s) => s.trim()).filter(Boolean);
  if (!key || to.length === 0) return;
  const from = process.env.NOTIFY_FROM ?? "Nesting <onboarding@resend.dev>";
  const clean = (s: string) => s.replace(/[\r\n]+/g, " ").slice(0, 120);
  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to,
        reply_to: r.email,
        subject: `New project request from ${clean(r.name)}`,
        text: [
          `Name: ${r.name}`,
          `Email: ${r.email}`,
          `Group: ${r.group || "(not given)"}`,
          `Needs: ${r.topic || "(not given)"}`,
          "",
          r.message,
          "",
          "Reply to this email to answer them. See all requests at /admin on your site.",
        ].join("\n"),
      }),
      signal: AbortSignal.timeout(6000),
    });
  } catch {
    // ignore: the request is already saved
  }
}
