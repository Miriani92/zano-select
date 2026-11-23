import type {
  CartListener,
  CartRepository,
} from '@/features/cart/domain/repositories/cart-repository';

// Loads the lines once, then emits every change. Returns an unsubscribe function.
// `onError` is called when the first load fails.
export function makeObserveCart(repository: CartRepository) {
  return function observeCart(
    listener: CartListener,
    onError?: (error: unknown) => void,
  ): () => void {
    let active = true;
    const unsubscribe = repository.onChange((lines) => {
      if (active) listener(lines);
    });

    repository
      .getLines()
      .then((lines) => {
        if (active) listener(lines);
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
