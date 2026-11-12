-- Products a signed-in user saved with the heart button. Guests can't save (they get a sign-in sheet).
create table public.wishlist_items (
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  product_id uuid not null references public.products (id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, product_id)
);

-- Wishlist screen lists newest first.
create index wishlist_items_user_created_idx
  on public.wishlist_items (user_id, created_at desc);

alter table public.wishlist_items enable row level security;

-- Each user sees, adds and removes only their own rows. No update: a row is either there or not.
create policy "Users read their own wishlist"
  on public.wishlist_items
  for select
  to authenticated
  using ((select auth.uid()) = user_id);

create policy "Users add to their own wishlist"
  on public.wishlist_items
  for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

create policy "Users remove from their own wishlist"
  on public.wishlist_items
  for delete
  to authenticated
  using ((select auth.uid()) = user_id);
