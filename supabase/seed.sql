-- Test data for the Home screen. Run AFTER all migrations, in SQL Editor.
-- Safe to run again: categories upsert by slug; banners and products are only added when their table is empty.
-- Photos are empty for now (image_path null / image_paths '{}'); upload them to the `catalog` bucket later.

insert into public.categories (slug, name_ka, name_en, sort_order) values
  ('clothing', 'ტანსაცმელი', 'Clothing', 1),
  ('shoes', 'ფეხსაცმელი', 'Shoes', 2),
  ('bags', 'ჩანთები', 'Bags', 3),
  ('accessories', 'აქსესუარები', 'Accessories', 4)
on conflict (slug) do update
  set name_ka = excluded.name_ka,
      name_en = excluded.name_en,
      sort_order = excluded.sort_order;

insert into public.banners (gender, eyebrow_ka, eyebrow_en, title_ka, title_en, target, sort_order)
select * from (values
  ('women'::public.gender, 'ქალის კოლექცია', 'Women''s collection', 'ფასდაკლება 70%-მდე', 'Up to 70% off', 'rail:discounts', 1),
  ('men'::public.gender, 'მამაკაცის კოლექცია', 'Men''s collection', 'ფასდაკლება 70%-მდე', 'Up to 70% off', 'rail:discounts', 1)
) as v(gender, eyebrow_ka, eyebrow_en, title_ka, title_en, target, sort_order)
where not exists (select 1 from public.banners);

insert into public.products (category_id, gender, brand, name_ka, name_en, price, original_price, created_at)
select c.id, v.gender, v.brand, v.name_ka, v.name_en, v.price, v.original_price, now() - v.age
from (values
  -- Women: on sale
  ('clothing',    'women'::public.gender, 'Zano Basics', 'შალის პალტო',         'Wool coat',          189.00, 420.00, interval '20 days'),
  ('shoes',       'women'::public.gender, 'Zano Basics', 'ტყავის ჩექმა',         'Leather boots',      149.00, 299.00, interval '18 days'),
  ('clothing',    'women'::public.gender, 'Zano Basics', 'აბრეშუმის პერანგი',    'Silk shirt',          69.00, 129.00, interval '15 days'),
  ('bags',        'women'::public.gender, 'Zano Basics', 'ტყავის ჩანთა',         'Leather bag',        119.00, 199.00, interval '12 days'),
  ('accessories', 'women'::public.gender, 'Zano Basics', 'კაშემირის შარფი',      'Cashmere scarf',      45.00, 110.00, interval '10 days'),
  -- Women: new
  ('shoes',       'women'::public.gender, 'Zano Basics', 'სპორტული ფეხსაცმელი',  'Sneakers',           159.00, null,   interval '2 days'),
  ('clothing',    'women'::public.gender, 'Zano Basics', 'ტრიკოტაჟის კაბა',      'Knit dress',          99.00, 139.00, interval '1 day'),
  ('clothing',    'women'::public.gender, 'Zano Basics', 'ჯინსის ქურთუკი',       'Denim jacket',       129.00, null,   interval '3 hours'),
  -- Men: on sale
  ('clothing',    'men'::public.gender,   'Zano Basics', 'კაშემირის სვიტერი',    'Cashmere sweater',   139.00, 320.00, interval '20 days'),
  ('shoes',       'men'::public.gender,   'Zano Basics', 'ტყავის ფეხსაცმელი',    'Leather shoes',      179.00, 349.00, interval '18 days'),
  ('clothing',    'men'::public.gender,   'Zano Basics', 'ბამბის პერანგი',       'Cotton shirt',        59.00,  99.00, interval '15 days'),
  ('clothing',    'men'::public.gender,   'Zano Basics', 'ზამთრის ქურთუკი',      'Winter jacket',      229.00, 379.00, interval '12 days'),
  -- Men: new
  ('shoes',       'men'::public.gender,   'Zano Basics', 'სპორტული ფეხსაცმელი',  'Sneakers',           169.00, null,   interval '2 days'),
  ('clothing',    'men'::public.gender,   'Zano Basics', 'ჩინოს შარვალი',        'Chinos',              89.00, 119.00, interval '1 day'),
  ('accessories', 'men'::public.gender,   'Zano Basics', 'ტყავის ქამარი',        'Leather belt',        49.00, null,   interval '3 hours')
) as v(category_slug, gender, brand, name_ka, name_en, price, original_price, age)
join public.categories c on c.slug = v.category_slug
where not exists (select 1 from public.products);
