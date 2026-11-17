# Nesting

Marketing site and sign-in for Nesting. Next.js 15 (App Router), Supabase Auth, deployed on Vercel.

- `/` marketing page with the GATSapp case study
- `/login`, `/signup` email and password, plus "email me a sign-in link"
- `/account` signed-in page (redirects to `/login` if signed out)
- `/auth/callback` finishes email-confirmation and sign-in-link flows

The site renders without Supabase. Sign-in shows a "not connected" notice until you add the two keys below.

## 1. Run it locally

```bash
npm install
cp .env.example .env.local   # then fill in the two Supabase values
npm run dev                  # http://localhost:3000
```

## 2. Put it on GitHub

```bash
git init
git add .
git commit -m "Nesting site"
git branch -M main
# create an empty repo on github.com first, then:
git remote add origin https://github.com/YOUR-NAME/nesting.git
git push -u origin main
```

## 3. Create the Supabase project

1. supabase.com > New project. Save the database password somewhere safe.
2. Project Settings > API. Copy the **Project URL** and the **anon** key (the newer **publishable** key also works).
3. Authentication > Providers: **Email** is on by default. Leave "Confirm email" on for production.
4. Authentication > URL Configuration:
   - **Site URL:** `https://nesting.com` (use your Vercel URL until the domain is connected)
   - **Redirect URLs:** add all of these
     - `http://localhost:3000/**`
     - `https://*.vercel.app/**`
     - `https://nesting.com/**`
     - `https://www.nesting.com/**`

## 4. Deploy on Vercel

1. vercel.com > Add New > Project > import the GitHub repo. The framework is detected as Next.js.
2. Before the first deploy, open Environment Variables and add:

   | Name | Value |
   | --- | --- |
   | `NEXT_PUBLIC_SUPABASE_URL` | your Project URL |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | your anon or publishable key |
   | `NEXT_PUBLIC_SITE_URL` | `https://nesting.com` |

3. Deploy. Every push to `main` redeploys.
4. Settings > Domains: add `nesting.com` and follow the DNS steps.

## 5. Check sign-in

Open `/signup`, create an account, open the confirmation email, and you land on `/account`.

## Before you launch

- **Email sending:** Supabase's built-in email is rate-limited and meant for testing. Add your own SMTP provider under Authentication > SMTP Settings before real users sign up.
- **Contact address:** change `email` in `lib/site.ts`. It is a placeholder (`hello@nesting.com`).
- **Copy:** all marketing text is in `app/page.tsx`. It is a first draft based on the GATSapp project; edit it to match what Nesting offers.
- **Domain:** confirm nesting.com is available to you before you build around it.

## Where things are

| Path | What it does |
| --- | --- |
| `app/page.tsx` | Marketing page |
| `app/globals.css` | All styling and colors (tokens at the top) |
| `app/auth/actions.ts` | Sign in, sign up, sign-in link, sign out |
| `middleware.ts`, `lib/supabase/middleware.ts` | Refreshes the session; add paths to protect in `PROTECTED` |
| `lib/supabase/*` | Supabase clients for browser, server and middleware |
| `public/gats/` | GATSapp screens (test data) |

## Add Google sign-in later

Supabase > Authentication > Providers > Google, add your client ID and secret, then call
`supabase.auth.signInWithOAuth({ provider: "google", options: { redirectTo: `${location.origin}/auth/callback` } })`
from a button. The callback route already handles it.
