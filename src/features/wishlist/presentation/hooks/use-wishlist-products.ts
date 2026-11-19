import { useMemo, useState } from 'react';

import { catalogUseCases } from '@/di/container';
import type { Product } from '@/features/catalog/domain/entities/product';
import { useWishlist } from '@/features/wishlist/presentation/hooks/use-wishlist';
import { useAsyncData } from '@/shared/hooks/use-async-data';

/**
 * The saved products, newest first, for the Wishlist tab. Products are only
 * fetched again when a new id is saved; an unsaved one just disappears, so a
 * tap on a heart removes its card at once.
 */
export function useWishlistProducts() {
  const wishlist = useWishlist();
  const ids = wishlist.ids;
  const [requested, setRequested] = useState<ReadonlySet<string> | null>(null);

  // Adjusting state while rendering: the next fetch starts in the same render.
  if (ids && (!requested || [...ids].some((id) => !requested.has(id)))) {
    setRequested(ids);
  }

  const load = useMemo(
    () =>
      requested ? () => catalogUseCases.getProductsByIds([...requested]) : null,
    [requested],
  );
  const products = useAsyncData(load);

  const visible = useMemo(() => {
    if (!ids || !products.data) return null;
    const byId = new Map(products.data.map((product) => [product.id, product]));
    return [...ids]
      .map((id) => byId.get(id))
      .filter((product): product is Product => product !== undefined);
  }, [ids, products.data]);

  const status =
    wishlist.status !== 'ready' ? wishlist.status : products.status;

  return {
    data: status === 'ready' ? visible : null,
    status,
    retry: wishlist.status === 'error' ? wishlist.retry : products.retry,
    isRefreshing: products.isRefreshing,
    refresh: products.refresh,
  };
}
