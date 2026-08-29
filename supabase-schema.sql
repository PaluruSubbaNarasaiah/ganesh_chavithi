-- Run this in Supabase SQL Editor:
-- https://supabase.com/dashboard/project/htgfsbmdmnzmjafglgdo/sql/new
--
-- IMPORTANT: Before running this SQL, enable Email auth in Supabase:
-- Dashboard → Authentication → Providers → Email → Enable
-- Then create your admin user:
-- Dashboard → Authentication → Users → Add User (enter email + password)
--

create table if not exists public.site_state (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.site_state enable row level security;

-- Drop ALL existing policies (including ones created in previous runs)
drop policy if exists "Public can read site state" on public.site_state;
drop policy if exists "Authenticated admins can write site state" on public.site_state;
drop policy if exists "Anon can write site state" on public.site_state;
drop policy if exists "Public read" on public.site_state;
drop policy if exists "Anon write" on public.site_state;
drop policy if exists "Auth write" on public.site_state;

-- Allow everyone (anon + authenticated) to read
create policy "Public read"
  on public.site_state for select
  using (true);

-- Allow anon key to write (app uses anon key for all operations)
create policy "Anon write"
  on public.site_state for all
  to anon
  using (true)
  with check (true);

-- Also allow authenticated
create policy "Auth write"
  on public.site_state for all
  to authenticated
  using (true)
  with check (true);

-- Enable realtime (safe/idempotent)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_rel pr
    JOIN pg_class c ON c.oid = pr.prrelid
    JOIN pg_publication p ON p.oid = pr.prpubid
    WHERE p.pubname = 'supabase_realtime' AND c.relname = 'site_state'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.site_state;
  END IF;
END $$;
