-- Run this once in Supabase: SQL Editor > New query > paste > Run.
-- Stores messages from the "Start a project" form (/start).

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

alter table public.project_requests enable row level security;

-- Anyone can send a request. Nobody can read them through the public API;
-- you read them in the Supabase dashboard: Table Editor > project_requests.
drop policy if exists "Anyone can send a request" on public.project_requests;
create policy "Anyone can send a request"
  on public.project_requests
  for insert
  to anon, authenticated
  with check (true);
