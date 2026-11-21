-- Run this in Supabase: SQL Editor > New query > paste everything > Run.
-- Safe to run more than once.

-- 1. Project requests from the "Start a project" form ------------------------------
create table if not exists public.project_requests (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  user_id     uuid references auth.users(id) on delete set null default auth.uid(),
  name        text not null check (char_length(name) between 1 and 200),
  email       text not null check (char_length(email) between 3 and 320),
  group_type  text check (char_length(group_type) <= 100),
  topic       text check (char_length(topic) <= 100),
  message     text check (char_length(message) <= 4000)
);
alter table public.project_requests
  add column if not exists status text not null default 'new'
  check (status in ('new', 'contacted', 'in_progress', 'done', 'archived'));

alter table public.project_requests enable row level security;

drop policy if exists "Anyone can send a request" on public.project_requests;
create policy "Anyone can send a request"
  on public.project_requests for insert to anon, authenticated with check (true);

-- 2. Founders who can open /admin ---------------------------------------------------
create table if not exists public.admins (email text primary key);
alter table public.admins enable row level security;   -- no policies: nobody can read it directly

-- True only for a signed-in user whose email is in public.admins AND is confirmed.
create or replace function public.is_admin() returns boolean
language sql security definer set search_path = public, auth stable as $$
  select exists (
    select 1
    from auth.users u
    join public.admins a on lower(a.email) = lower(u.email)
    where u.id = auth.uid() and u.email_confirmed_at is not null
  );
$$;
revoke all on function public.is_admin() from public, anon;
grant execute on function public.is_admin() to authenticated;

drop policy if exists "Admins can read requests" on public.project_requests;
create policy "Admins can read requests"
  on public.project_requests for select to authenticated using (public.is_admin());

drop policy if exists "Admins can update requests" on public.project_requests;
create policy "Admins can update requests"
  on public.project_requests for update to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- 3. Add each founder's email (use the same email you sign in with). Edit, then run:
-- insert into public.admins (email) values ('you@example.com'), ('cofounder@example.com')
--   on conflict do nothing;
