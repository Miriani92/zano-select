export type WishlistListener = (productIds: ReadonlySet<string>) => void;

// The signed-in user's saved products. Guests have no wishlist.
export interface WishlistRepository {
  /** Loads the saved product ids from the server. */
  getProductIds(): Promise<ReadonlySet<string>>;
  add(productId: string): Promise<void>;
  remove(productId: string): Promise<void>;
  /** Called whenever the saved ids change (including optimistic updates). */
  onChange(listener: WishlistListener): () => void;
}
