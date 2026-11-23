import {
  clampQuantity,
  type CartLineKey,
} from '@/features/cart/domain/entities/cart-line';
import type { CartRepository } from '@/features/cart/domain/repositories/cart-repository';

/** One more of the product in that size; the same line again raises its quantity. */
export function makeAddToCart(repository: CartRepository) {
  return function addToCart(
    productId: string,
    size: string | null,
  ): Promise<void> {
    return repository.add({ productId, size }, 1);
  };
}

/** Sets a line's quantity, kept within 1…MAX_QUANTITY. */
export function makeChangeQuantity(repository: CartRepository) {
  return function changeQuantity(
    key: CartLineKey,
    quantity: number,
  ): Promise<void> {
    return repository.setQuantity(key, clampQuantity(quantity));
  };
}

export function makeRemoveFromCart(repository: CartRepository) {
  return function removeFromCart(key: CartLineKey): Promise<void> {
    return repository.remove(key);
  };
}
