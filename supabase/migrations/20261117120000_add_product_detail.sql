-- Product detail screen: a description and the sizes a product comes in.

alter table public.products
  add column description_ka text not null default '',
  add column description_en text not null default '';

-- One row per size. Products without rows (bags, accessories) are one-size.
create table public.product_sizes (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products (id) on delete cascade,
  label text not null,
  in_stock boolean not null default true,
  sort_order integer not null default 0,
  unique (product_id, label)
);

create index product_sizes_product_idx
  on public.product_sizes (product_id, sort_order);

alter table public.product_sizes enable row level security;

-- Readable by everyone, guests included, but only for products they can see.
-- Writes only via the dashboard / service role.
create policy "Sizes of active products are readable by everyone"
  on public.product_sizes
  for select
  to anon, authenticated
  using (
    exists (
      select 1 from public.products p
      where p.id = product_id and p.is_active
    )
  );
