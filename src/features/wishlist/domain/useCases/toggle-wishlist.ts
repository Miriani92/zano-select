import type { WishlistRepository } from '@/features/wishlist/domain/repositories/wishlist-repository';

// Saves the product, or removes it when it is already saved.
export function makeToggleWishlist(repository: WishlistRepository) {
  return function toggleWishlist(
    productId: string,
    isSaved: boolean,
  ): Promise<void> {
    return isSaved ? repository.remove(productId) : repository.add(productId);
  };
}
