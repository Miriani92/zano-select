import type { SupabaseClient } from '@supabase/supabase-js';

import type {
  WishlistListener,
  WishlistRepository,
} from '@/features/wishlist/domain/repositories/wishlist-repository';

interface WishlistItemDto {
  product_id: string;
}

// Keeps the saved ids in memory so every screen sees a tap at once (optimistic),
// and rolls back if the server refuses. Row-level security limits rows to the
// signed-in user, and `user_id` defaults to auth.uid() on insert.
export function createSupabaseWishlistRepository(
  client: SupabaseClient,
): WishlistRepository {
  let ids: ReadonlySet<string> = new Set();
  const listeners = new Set<WishlistListener>();

  function publish(next: ReadonlySet<string>) {
    ids = next;
    listeners.forEach((listener) => listener(ids));
  }

  function withId(productId: string, saved: boolean): ReadonlySet<string> {
    const next = new Set(ids);
    if (saved) next.add(productId);
    else next.delete(productId);
    return next;
  }

  async function change(productId: string, saved: boolean) {
    const previous = ids;
    publish(withId(productId, saved));

    const { error } = saved
      ? await client
          .from('wishlist_items')
          .upsert(
            { product_id: productId },
            { onConflict: 'user_id,product_id', ignoreDuplicates: true },
          )
      : await client
          .from('wishlist_items')
          .delete()
          .eq('product_id', productId);

    if (error) {
      publish(previous);
      throw new Error(error.message);
    }
  }

  return {
    async getProductIds() {
      const { data, error } = await client
        .from('wishlist_items')
        .select('product_id');
      if (error) throw new Error(error.message);
      ids = new Set((data as WishlistItemDto[]).map((row) => row.product_id));
      return ids;
    },
    add: (productId) => change(productId, true),
    remove: (productId) => change(productId, false),
    onChange(listener) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
  };
}
