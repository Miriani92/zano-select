export type WishlistListener = (productIds: ReadonlySet<string>) => void;

// The signed-in user's saved products. Guests have no wishlist.
export interface WishlistRepository {
  getProductIds(): Promise<ReadonlySet<string>>;
  add(productId: string): Promise<void>;
  remove(productId: string): Promise<void>;
  onChange(listener: WishlistListener): () => void;
}
