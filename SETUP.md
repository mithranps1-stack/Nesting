# Nesting: what to do next

Work through this top to bottom. Each part says how long it takes and whether it is required.
Parts 1 to 3 are required. The rest make the site better and can be done in any order.

---

## Part 0. Put the new files on GitHub (5 min, required)

1. Unzip `nesting.zip`.
2. Open your cloned `nesting` repo folder on your computer (the one GitHub Desktop made).
3. Delete everything inside it **except the hidden `.git` folder** (press Cmd + Shift + . on Mac to show hidden files).
4. Copy everything from the unzipped `nesting` folder into the repo folder. Include hidden files like `.gitignore` and `.env.example`.
5. In GitHub Desktop: type a message ("Add pricing, admin, legal and more"), click **Commit to main**, then **Push origin**.
6. Vercel redeploys on its own. Open Deployments and wait for "Ready".

> The site works right after this, but the Request form, the founder admin page and password reset need Parts 1 to 3.

---

## Part 1. Update the database (3 min, required)

1. Supabase > **SQL Editor** > **New query**.
2. Open `supabase/schema.sql` from this project, copy **all of it**, paste it in, click **Run**. You should see "Success".
   It is safe to run more than once.
3. Now make yourselves admins. In a new query, run this with **your real emails** (the same email you sign in to the site with):
   ```sql
   insert into public.admins (email)
   values ('you@example.com'), ('cofounder@example.com')
   on conflict do nothing;
   ```
4. Check it: sign in on your site, open **Account**. You should see an **Open founder requests** button. That opens `/admin`.

**Important:** admin access only works for emails that are **confirmed**. Leave "Confirm email" turned on in Supabase (Authentication > Sign In / Providers > Email) once you are done testing. That is what stops a stranger from signing up with a founder's email address.

---

## Part 2. Fix the email limits (15 to 30 min, required before real users)

Supabase's built-in email sends **2 emails per hour** and only to your own team. Pick one:

**Quick stopgap: a dedicated Gmail account** (about 15 min)
1. Create a new Gmail account just for this.
2. Turn on 2-Step Verification, then create an **app password** at myaccount.google.com/apppasswords. Copy the 16 characters.
3. Supabase > Authentication > **SMTP Settings** > turn on custom SMTP:
   host `smtp.gmail.com`, port `465`, username = the Gmail address, password = the app password,
   sender email = the Gmail address, sender name = `Nesting`.
4. Save, then sign up with a new address to test.

**Better, once you own your domain: Resend** (about 30 min)
1. Create a free account at resend.com and **add and verify your domain** (they show you DNS records to add where you bought the domain).
2. Create an API key.
3. Supabase > Authentication > SMTP Settings: host `smtp.resend.com`, port `465`, username `resend`, password = your API key, sender email = `hello@yourdomain`, sender name = `Nesting`. (If a field differs, follow Resend's "Send with Supabase" guide.)
4. Optional: Authentication > Email Templates lets you edit the wording of the emails.

Also check Supabase > Authentication > **URL Configuration**: Site URL is your live address, and Redirect URLs include `https://YOUR-SITE/**`.

---

## Part 3. Get an email when someone sends a request (10 min, recommended)

1. At resend.com, create an API key (you can reuse the one from Part 2).
2. In Vercel > Settings > Environment Variables, add (Production and Preview):

   | Name | Value |
   | --- | --- |
   | `RESEND_API_KEY` | your key (starts with `re_`) |
   | `NOTIFY_EMAIL` | the email(s) that should get alerts, separated by commas |
   | `NOTIFY_FROM` | optional. Leave out at first. Later: `Nesting <hello@yourdomain>` |

3. Redeploy. Then send a test from `/start`.

Until your domain is verified in Resend, alerts can only go to the email address you used to sign up for Resend. That is fine for testing. Verify your domain to send to everyone on the team.
If no alert arrives, the request is still saved: check `/admin`.

---

## Part 4. "Book a call" button (10 min)

1. Create a free account at cal.com (or calendly.com) and make a 30-minute event type, for example "Intro call". Check their current free-plan limits.
2. Copy the public link to that event.
3. In Vercel add `NEXT_PUBLIC_BOOKING_URL` = that link, then redeploy.

Until you do, the button says "Request a call" and opens the request form.

---

## Part 5. Sign in with Google (30 to 45 min, optional)

1. In Supabase > Authentication > Providers > **Google**, copy the **Callback URL** it shows (it ends in `/auth/v1/callback`).
2. Go to console.cloud.google.com, create a project, then **APIs & Services > OAuth consent screen**. Fill in the app name (Nesting), your support email, and your domain. Publish the app when asked.
3. **Credentials > Create credentials > OAuth client ID > Web application.** Under *Authorized redirect URIs* paste the Callback URL from step 1. Create it and copy the **Client ID** and **Client secret**.
4. Back in Supabase, enable the Google provider and paste both in. Save.
5. In Vercel add `NEXT_PUBLIC_ENABLE_GOOGLE` = `true` and redeploy. A "Continue with Google" button appears on the sign-in and sign-up pages.

---

## Part 6. Turn on analytics (2 min)

The code is already in. In Vercel open your project > **Analytics** tab > **Enable**. Visits appear after the next deploy.

---

## Part 7. Your domain and email address (30 min)

1. Buy your domain from a registrar such as Cloudflare, Namecheap or Google Domains alternatives. **First check that nesting.com is available.** If not, pick a close name.
2. Vercel > your project > Settings > **Domains** > add it, then add the DNS records Vercel shows you at your registrar.
3. When the domain works, update these:
   - Vercel: add `NEXT_PUBLIC_SITE_URL` = `https://yourdomain.com`, redeploy.
   - Supabase > Authentication > URL Configuration: Site URL and Redirect URLs use the new domain.
   - `lib/site.ts`: change `domain` and `email`.
4. Set up the `hello@` mailbox. A free option is forwarding to your own inbox (Cloudflare Email Routing or your registrar's forwarding). Google Workspace or Zoho give a real mailbox.

---

## Part 8. Content only you can supply (do before launch)

| Item | Where | What to do |
| --- | --- | --- |
| Founder bios and photos | `lib/founders.ts`, `public/founders/` | Replace the short placeholder bios. Add a square photo per person and set `photo: "/founders/name.jpg"`. Fix the roles if they are not right. |
| Prices | `lib/pricing.ts` | Prices and what each plan includes. See "Decisions that are yours" below. |
| FAQ | `lib/pricing.ts` | Check every answer is true for how you will work, especially payments. |
| A real quote | `lib/quotes.ts` | Ask GATS or the event planner for one sentence and permission to use their name. The section stays hidden until you add one. |
| GATS permission | n/a | Ask GATS that you may show their name and the app screens. |
| Second case study | `app/work/` | Even a small project for another group. Copy `app/work/gatsapp/page.tsx` as a starting point. |
| Legal | `app/privacy`, `app/terms` | These are plain-language drafts, not legal advice. **Have a lawyer or a legal clinic review them** before you take payments. Add your registered business name in `lib/site.ts` (`legalName`). |
| More guides | `lib/articles.ts` | Add one article every month or two. They help people find you on Google. |

---

## Decisions that are yours

I chose these so the site is complete. Change any of them.

- **Prices.** Website from $1,500, Events and volunteer tool from $3,500, Member app from $5,000, Care plan from $75 a month.
  One 2026 cost estimate puts small charity websites at $3,750 to $7,500 from a freelancer, member portals as add-ons of $1,900 or more, and basic maintenance at about $100 a month. Your starting prices sit below that because you are a new studio with a reusable foundation and free-tier hosting. Raise them after your first few clients.
- **Payment terms.** The FAQ says half to start, half at handoff. Make sure you are happy to do that.
- **"Hosting can run at $0 a month".** True while traffic is small and the free plans fit. Do not promise it forever.
- **Roles and "Founder" titles** on the founders page.
- **"Three habits"** on the founders page.

---

## Before you announce the site

- [ ] Part 0, 1 and 2 done
- [ ] Test: create an account, confirm the email, sign in, sign out, reset the password
- [ ] Test: send a request at `/start`, see it in `/admin`, change its status
- [ ] Founder bios and photos replaced
- [ ] Prices and FAQ reviewed
- [ ] Privacy and terms reviewed by a professional
- [ ] "Confirm email" is turned on in Supabase
- [ ] Domain connected, Site URL and Redirect URLs updated
- [ ] Look at the site on your phone

## Where things are

| What | File |
| --- | --- |
| Home page text | `app/page.tsx` |
| Colors and all styling | `app/globals.css` (colors at the top) |
| Prices and FAQ | `lib/pricing.ts` |
| Email, domain, booking link | `lib/site.ts` |
| Founders | `lib/founders.ts` |
| Quotes | `lib/quotes.ts` |
| Guides | `lib/articles.ts` |
| Database setup | `supabase/schema.sql` |

## Environment variables (all in Vercel > Settings > Environment Variables)

| Name | Needed? |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Required |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Required |
| `NEXT_PUBLIC_SITE_URL` | When you have a domain |
| `RESEND_API_KEY`, `NOTIFY_EMAIL`, `NOTIFY_FROM` | For request alerts |
| `NEXT_PUBLIC_BOOKING_URL` | For the Book a call button |
| `NEXT_PUBLIC_ENABLE_GOOGLE` | `true` after Part 5 |

Changing a variable only takes effect after you **redeploy**.

## If something breaks

- **`/admin` says page not found.** Your email is not in `public.admins`, or you have not confirmed it. Re-run Part 1 step 3 with the exact email you signed in with.
- **"Could not load requests".** You have not run `supabase/schema.sql` (Part 1).
- **Request form says it could not save.** Same cause: the table or its permissions are missing.
- **No alert emails.** Check the three Resend variables, then redeploy. Without a verified domain, alerts only reach your Resend sign-up email.
- **Password reset link goes to the wrong address.** Fix Supabase URL Configuration (Part 2) and request a new link.
- **Open the reset link in the same browser** you asked from. It will not work from a different one.
- **Google button does not appear.** `NEXT_PUBLIC_ENABLE_GOOGLE` must be exactly `true`, and you must redeploy.
