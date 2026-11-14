import type { Gender } from '@/features/catalog/domain/entities/gender';

// Rows as Supabase returns them; only the columns the app selects.

export interface CategoryDto {
  id: string;
  slug: string;
  name_ka: string;
  name_en: string;
  image_path: string | null;
}

export interface BannerDto {
  id: string;
  gender: Gender;
  eyebrow_ka: string;
  eyebrow_en: string;
  title_ka: string;
  title_en: string;
  image_path: string | null;
  /** e.g. "rail:discounts" or "category:shoes". */
  target: string;
}

export interface ProductDto {
  id: string;
  category_id: string;
  gender: Gender;
  brand: string;
  name_ka: string;
  name_en: string;
  // Postgres numeric; may arrive as a string.
  price: number | string;
  original_price: number | string | null;
  discount_pct: number;
  image_paths: string[];
}

export const CATEGORY_COLUMNS = 'id, slug, name_ka, name_en, image_path';

export const BANNER_COLUMNS =
  'id, gender, eyebrow_ka, eyebrow_en, title_ka, title_en, image_path, target';

export const PRODUCT_COLUMNS =
  'id, category_id, gender, brand, name_ka, name_en, price, original_price, discount_pct, image_paths';
