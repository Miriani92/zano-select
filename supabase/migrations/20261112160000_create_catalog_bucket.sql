-- Public bucket for product, category and banner photos.
-- Public = anyone (guests too) can load a photo by its public URL.
-- No insert/update/delete policies: uploads only from the Dashboard / service role.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'catalog',
  'catalog',
  true,
  5242880, -- 5 MB per file
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do nothing;
