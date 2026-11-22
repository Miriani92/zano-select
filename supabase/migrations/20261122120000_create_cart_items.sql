-- Products a signed-in user put in the cart. Guests can't (they get a sign-in sheet).
-- One row per product + size; adding the same one again raises the quantity.
create table public.cart_items (
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  product_id uuid not null references public.products (id) on delete cascade,
  -- A label from product_sizes, or '' for one-size products (bags, accessories).
  size_label text not null default '',
  quantity integer not null default 1 check (quantity between 1 and 10),
  created_at timestamptz not null default now(),
  primary key (user_id, product_id, size_label)
);

-- Cart screen lists newest first.
create index cart_items_user_created_idx
  on public.cart_items (user_id, created_at desc);

alter table public.cart_items enable row level security;

-- Each user sees, adds, changes and removes only their own rows.
create policy "Users read their own cart"
  on public.cart_items
  for select
  to authenticated
  using ((select auth.uid()) = user_id);

create policy "Users add to their own cart"
  on public.cart_items
  for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

create policy "Users change their own cart"
  on public.cart_items
  for update
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "Users remove from their own cart"
  on public.cart_items
  for delete
  to authenticated
  using ((select auth.uid()) = user_id);
