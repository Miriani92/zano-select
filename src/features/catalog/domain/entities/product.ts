import type { LocalizedText } from '@/shared/i18n/localized-text';
import type { Gender } from '@/features/catalog/domain/entities/gender';

export interface Product {
  id: string;
  categoryId: string;
  gender: Gender;
  brand: string;
  name: LocalizedText;
  /** Current price in GEL. */
  price: number;
  /** Price before the discount in GEL; null when not on sale. */
  originalPrice: number | null;
  /** 0 when not on sale, e.g. 55 for 189 instead of 420. */
  discountPct: number;
  imageUrls: string[];
}

export function isOnSale(product: Product): boolean {
  return product.originalPrice !== null && product.discountPct > 0;
}
