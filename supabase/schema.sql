create table if not exists public.site_state (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.site_state enable row level security;

create policy "Public can read site state"
  on public.site_state for select
  using (true);

create policy "Authenticated admins can write site state"
  on public.site_state for all
  to authenticated
  using (true)
  with check (true);

alter publication supabase_realtime add table public.site_state;
