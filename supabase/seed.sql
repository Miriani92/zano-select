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

-- Product detail (needs 20261117120000_add_product_detail.sql). Safe to run again.
update public.products p
set description_ka = v.description_ka,
    description_en = v.description_en
from (values
  ('Wool coat',        'შალის პალტო სწორი ჭრილით, ორი ჯიბით და ღილებით.',        'Straight-cut wool coat with two pockets and buttons.'),
  ('Leather boots',    'ნატურალური ტყავის ჩექმა დაბალ ქუსლზე.',                    'Genuine leather boots on a low heel.'),
  ('Silk shirt',       'მსუბუქი აბრეშუმის პერანგი თავისუფალი ჭრილით.',            'Light silk shirt with a relaxed fit.'),
  ('Leather bag',      'ტყავის ჩანთა ორი განყოფილებით და მხრის თასმით.',         'Leather bag with two compartments and a shoulder strap.'),
  ('Cashmere scarf',   'რბილი კაშემირის შარფი.',                                   'Soft cashmere scarf.'),
  ('Sneakers',         'მსუბუქი სპორტული ფეხსაცმელი ყოველდღიური ტარებისთვის.',   'Light sneakers for everyday wear.'),
  ('Knit dress',       'ტრიკოტაჟის კაბა მუხლამდე.',                                'Knee-length knit dress.'),
  ('Denim jacket',     'კლასიკური ჯინსის ქურთუკი.',                                'Classic denim jacket.'),
  ('Cashmere sweater', 'კაშემირის სვიტერი მრგვალი საყელოთი.',                     'Crew-neck cashmere sweater.'),
  ('Leather shoes',    'ნატურალური ტყავის კლასიკური ფეხსაცმელი.',                 'Classic genuine leather shoes.'),
  ('Cotton shirt',     'ბამბის პერანგი ღილიანი საყელოთი.',                        'Cotton shirt with a button-down collar.'),
  ('Winter jacket',    'თბილი ზამთრის ქურთუკი კაპიუშონით.',                       'Warm winter jacket with a hood.'),
  ('Chinos',           'ბამბის ჩინოს შარვალი სწორი ჭრილით.',                      'Straight-cut cotton chinos.'),
  ('Leather belt',     'ნატურალური ტყავის ქამარი ლითონის ბალთით.',                'Genuine leather belt with a metal buckle.')
) as v(name_en, description_ka, description_en)
where p.name_en = v.name_en and p.description_en = '';

-- Clothing: XS–XL, shoes: 36–41 (women) / 40–45 (men). One size per product is sold out, to show that state.
insert into public.product_sizes (product_id, label, in_stock, sort_order)
select p.id, u.label, u.label <> sizes.sold_out, u.ord::integer
from public.products p
join public.categories c on c.id = p.category_id
cross join lateral (
  select
    case
      when c.slug = 'clothing' then array['XS', 'S', 'M', 'L', 'XL']
      when p.gender = 'women' then array['36', '37', '38', '39', '40', '41']
      else array['40', '41', '42', '43', '44', '45']
    end as labels,
    case
      when c.slug = 'clothing' then 'L'
      when p.gender = 'women' then '39'
      else '43'
    end as sold_out
) sizes
cross join lateral unnest(sizes.labels) with ordinality as u(label, ord)
where c.slug in ('clothing', 'shoes')
on conflict (product_id, label) do nothing;
