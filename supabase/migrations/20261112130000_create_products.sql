-- Products for Home rails ("Biggest discounts", "New collections") and the See all grid.
create type public.gender as enum ('women', 'men');

create table public.products (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references public.categories (id) on delete restrict,
  gender public.gender not null,
  brand text not null,
  name_ka text not null,
  name_en text not null,
  price numeric(10, 2) not null check (price > 0),
  -- Price before the discount; null when the product is not on sale.
  original_price numeric(10, 2) check (original_price is null or original_price > price),
  -- 0 when not on sale, e.g. 55 for 189 instead of 420.
  discount_pct integer generated always as (
    case
      when original_price is null then 0
      else round((1 - price / original_price) * 100)::integer
    end
  ) stored,
  image_paths text[] not null default '{}', -- paths inside the `catalog` Storage bucket
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

-- One index per Home rail query.
create index products_gender_discount_idx
  on public.products (gender, discount_pct desc)
  where is_active;

create index products_gender_created_idx
  on public.products (gender, created_at desc)
  where is_active;

create index products_category_idx on public.products (category_id);

alter table public.products enable row level security;

-- Anyone, guests included, can read active products. Writes only via the dashboard / service role.
create policy "Active products are readable by everyone"
  on public.products
  for select
  to anon, authenticated
  using (is_active);
