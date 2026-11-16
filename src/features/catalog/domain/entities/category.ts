import type { LocalizedText } from '@/shared/i18n/localized-text';

// A product category shown as a chip on Home (Clothing, Shoes, Bags, Accessories).
export interface Category {
  id: string;
  slug: string;
  name: LocalizedText;
  imageUrl: string | null;
}
