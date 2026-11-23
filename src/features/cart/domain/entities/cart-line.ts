import type { Product } from '@/features/catalog/domain/entities/product';

/** Most of one product + size a cart line can hold. */
export const MAX_QUANTITY = 10;

/** One product in one size, with how many the shopper wants. */
export interface CartLine {
  product: Product;
  /** e.g. "M" or "38"; null for one-size products. */
  size: string | null;
  quantity: number;
  /** False when the size sold out or the product was taken off sale. */
  available: boolean;
}

/** Identifies a line: the same product in another size is another line. */
export interface CartLineKey {
  productId: string;
  size: string | null;
}

export function cartLineKey(line: CartLine): CartLineKey {
  return { productId: line.product.id, size: line.size };
}

export function isSameLine(a: CartLineKey, b: CartLineKey): boolean {
  return a.productId === b.productId && a.size === b.size;
}

export function clampQuantity(quantity: number): number {
  return Math.min(MAX_QUANTITY, Math.max(1, Math.round(quantity)));
}
