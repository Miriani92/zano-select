-- Product categories shown as chips on Home (Clothing, Shoes, Bags, Accessories).
-- Shared by both genders; products carry the gender.
create table public.categories (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name_ka text not null,
  name_en text not null,
  image_path text, -- path inside the `catalog` Storage bucket
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

alter table public.categories enable row level security;

-- Anyone, guests included, can read categories. Writes only via the dashboard / service role.
create policy "Categories are readable by everyone"
  on public.categories
  for select
  to anon, authenticated
  using (true);
