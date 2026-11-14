import type {
  WishlistListener,
  WishlistRepository,
} from '@/features/wishlist/domain/repositories/wishlist-repository';

// Loads the saved ids once, then emits every change. Returns an unsubscribe function.
// `onError` is called when the first load fails.
export function makeObserveWishlist(repository: WishlistRepository) {
  return function observeWishlist(
    listener: WishlistListener,
    onError?: (error: unknown) => void,
  ): () => void {
    let active = true;
    const unsubscribe = repository.onChange((ids) => {
      if (active) listener(ids);
    });

    repository
      .getProductIds()
      .then((ids) => {
        if (active) listener(ids);
      })
      .catch((error: unknown) => {
        if (active) onError?.(error);
      });

    return () => {
      active = false;
      unsubscribe();
    };
  };
}
