import type {
  CartLine,
  CartLineKey,
} from '@/features/cart/domain/entities/cart-line';

export type CartListener = (lines: readonly CartLine[]) => void;

// The signed-in user's cart, newest line first. Guests have no cart.
export interface CartRepository {
  getLines(): Promise<readonly CartLine[]>;
  /** Adds `quantity` to the line, creating it if needed (capped at MAX_QUANTITY). */
  add(key: CartLineKey, quantity: number): Promise<void>;
  setQuantity(key: CartLineKey, quantity: number): Promise<void>;
  remove(key: CartLineKey): Promise<void>;
  onChange(listener: CartListener): () => void;
}
