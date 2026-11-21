-- Name and phone a signed-in user adds on the Edit profile screen. Email stays in auth.users.
-- A row is created on the first save (upsert), so a user with no row just has an empty profile.
create table public.profiles (
  id uuid primary key default auth.uid() references auth.users (id) on delete cascade,
  first_name text check (char_length(first_name) <= 50),
  last_name text check (char_length(last_name) <= 50),
  phone text check (char_length(phone) <= 20),
  updated_at timestamptz not null default now()
);

-- Keep updated_at current on every change.
create function public.set_profiles_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_set_updated_at
  before update on public.profiles
  for each row
  execute function public.set_profiles_updated_at();

alter table public.profiles enable row level security;

-- Each user reads, creates and edits only their own row. No delete: the row goes with the account.
create policy "Users read their own profile"
  on public.profiles
  for select
  to authenticated
  using ((select auth.uid()) = id);

create policy "Users create their own profile"
  on public.profiles
  for insert
  to authenticated
  with check ((select auth.uid()) = id);

create policy "Users update their own profile"
  on public.profiles
  for update
  to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);
