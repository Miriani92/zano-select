-- Sale banner at the top of Home, one set per gender.
create table public.banners (
  id uuid primary key default gen_random_uuid(),
  gender public.gender not null,
  eyebrow_ka text not null, -- small line above the title, e.g. "ქალის კოლექცია"
  eyebrow_en text not null,
  title_ka text not null, -- e.g. "ფასდაკლება 70%-მდე"
  title_en text not null,
  image_path text, -- optional, path inside the `catalog` Storage bucket
  -- Where a tap leads, e.g. "rail:discounts" or "category:shoes".
  target text not null,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  starts_at timestamptz, -- null = already started
  ends_at timestamptz, -- null = no end date
  created_at timestamptz not null default now(),
  check (ends_at is null or starts_at is null or ends_at > starts_at)
);

create index banners_gender_sort_idx
  on public.banners (gender, sort_order)
  where is_active;

alter table public.banners enable row level security;

-- Anyone, guests included, can read banners that are active and running now.
create policy "Running banners are readable by everyone"
  on public.banners
  for select
  to anon, authenticated
  using (
    is_active
    and (starts_at is null or starts_at <= now())
    and (ends_at is null or ends_at > now())
  );
