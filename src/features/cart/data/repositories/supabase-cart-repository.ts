import type { SupabaseClient } from '@supabase/supabase-js';

import {
  CART_ITEM_COLUMNS,
  toCartLine,
  toSizeLabel,
  type CartItemDto,
} from '@/features/cart/data/dto/cart-dto';
import {
  isSameLine,
  MAX_QUANTITY,
  type CartLine,
  type CartLineKey,
} from '@/features/cart/domain/entities/cart-line';
import type {
  CartListener,
  CartRepository,
} from '@/features/cart/domain/repositories/cart-repository';
import { CATALOG_BUCKET } from '@/features/catalog/data/dto/catalog-dto';
import type { ImageUrlResolver } from '@/features/catalog/data/dto/catalog-mappers';

// Keeps the lines in memory so a stepper tap or removal shows at once
// (optimistic) and rolls back if the server refuses. Row-level security limits
// rows to the signed-in user, and `user_id` defaults to auth.uid() on insert.
export function createSupabaseCartRepository(
  client: SupabaseClient,
): CartRepository {
  let lines: readonly CartLine[] = [];
  const listeners = new Set<CartListener>();

  const imageUrl: ImageUrlResolver = (path) =>
    client.storage.from(CATALOG_BUCKET).getPublicUrl(path).data.publicUrl;

  function publish(next: readonly CartLine[]) {
    lines = next;
    listeners.forEach((listener) => listener(lines));
  }

  function rowOf(key: CartLineKey) {
    return client
      .from('cart_items')
      .select('quantity')
      .eq('product_id', key.productId)
      .eq('size_label', toSizeLabel(key.size));
  }

  async function fetchLines(): Promise<readonly CartLine[]> {
    const { data, error } = await client
      .from('cart_items')
      .select(CART_ITEM_COLUMNS)
      .order('created_at', { ascending: false });
    if (error) throw new Error(error.message);
    return (data as unknown as CartItemDto[])
      .map((dto) => toCartLine(dto, imageUrl))
      .filter((line): line is CartLine => line !== null);
  }

  // Applies `change` on screen first, then runs `request`; undoes it on failure.
  async function optimistic(
    change: (current: readonly CartLine[]) => readonly CartLine[],
    request: () => PromiseLike<{ error: { message: string } | null }>,
  ) {
    const previous = lines;
    publish(change(lines));
    const { error } = await request();
    if (error) {
      publish(previous);
      throw new Error(error.message);
    }
  }

  return {
    async getLines() {
      lines = await fetchLines();
      return lines;
    },

    async add(key, quantity) {
      const { data: existing, error: readError } = await rowOf(
        key,
      ).maybeSingle<{ quantity: number }>();
      if (readError) throw new Error(readError.message);

      const next = Math.min(MAX_QUANTITY, (existing?.quantity ?? 0) + quantity);
      const { error } = await client.from('cart_items').upsert(
        {
          product_id: key.productId,
          size_label: toSizeLabel(key.size),
          quantity: next,
        },
        { onConflict: 'user_id,product_id,size_label' },
      );
      if (error) throw new Error(error.message);

      // A new line needs its product details, so reload instead of guessing.
      publish(await fetchLines());
    },

    setQuantity(key, quantity) {
      return optimistic(
        (current) =>
          current.map((line) =>
            isSameLine({ productId: line.product.id, size: line.size }, key)
              ? { ...line, quantity }
              : line,
          ),
        () =>
          client
            .from('cart_items')
            .update({ quantity })
            .eq('product_id', key.productId)
            .eq('size_label', toSizeLabel(key.size)),
      );
    },

    remove(key) {
      return optimistic(
        (current) =>
          current.filter(
            (line) =>
              !isSameLine({ productId: line.product.id, size: line.size }, key),
          ),
        () =>
          client
            .from('cart_items')
            .delete()
            .eq('product_id', key.productId)
            .eq('size_label', toSizeLabel(key.size)),
      );
    },

    onChange(listener) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
  };
}
