import type { LocalizedText } from '@/shared/i18n/localized-text';
import type { Product } from '@/features/catalog/domain/entities/product';

export interface ProductSize {
  /** e.g. "M" or "38". */
  label: string;
  inStock: boolean;
}

/** A product with what only its detail screen shows. */
export interface ProductDetail extends Product {
  description: LocalizedText;
  /** In display order; empty for one-size products (bags, accessories). */
  sizes: ProductSize[];
}

/** One-size products go to the cart without picking a size. */
export function needsSize(product: ProductDetail): boolean {
  return product.sizes.length > 0;
}
