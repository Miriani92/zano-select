import type { CartLine } from '@/features/cart/domain/entities/cart-line';

export interface CartSummary {
  /** Units of every line, sold-out ones included (the tab badge). */
  itemCount: number;
  /** Units that can be bought. */
  availableCount: number;
  /** What the available units cost before discounts, in GEL. */
  subtotal: number;
  /** subtotal − total. */
  discount: number;
  /** What the shopper pays for the available units, before delivery. */
  total: number;
}

// Money is summed in tetri (1/100 GEL) so totals never pick up float noise.
function toTetri(amount: number): number {
  return Math.round(amount * 100);
}

export function cartSummary(lines: readonly CartLine[]): CartSummary {
  let itemCount = 0;
  let availableCount = 0;
  let subtotal = 0;
  let total = 0;

  for (const line of lines) {
    itemCount += line.quantity;
    if (!line.available) continue;
    const { price, originalPrice } = line.product;
    availableCount += line.quantity;
    subtotal += toTetri(originalPrice ?? price) * line.quantity;
    total += toTetri(price) * line.quantity;
  }

  return {
    itemCount,
    availableCount,
    subtotal: subtotal / 100,
    discount: (subtotal - total) / 100,
    total: total / 100,
  };
}
