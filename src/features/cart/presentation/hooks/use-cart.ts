import { useEffect, useMemo, useState } from 'react';

import { cartUseCases } from '@/di/container';
import { useSession } from '@/features/auth/presentation/components/session-provider';
import {
  cartLineKey,
  type CartLine,
} from '@/features/cart/domain/entities/cart-line';
import { cartSummary } from '@/features/cart/domain/entities/cart-summary';
import type { AsyncStatus } from '@/shared/hooks/use-async-data';

const NONE: readonly CartLine[] = [];

interface Loaded {
  userId: string;
  attempt: number;
  lines: readonly CartLine[] | null;
  failed: boolean;
}

/**
 * The signed-in user's cart, shared by every screen through the repository.
 * Guests get `canAdd: false` and an empty cart.
 */
export function useCart() {
  const { user } = useSession();
  const userId = user?.id ?? null;
  const [attempt, setAttempt] = useState(0);
  const [loaded, setLoaded] = useState<Loaded | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    if (!userId) return;
    return cartUseCases.observeCart(
      (lines) => {
        setLoaded({ userId, attempt, lines, failed: false });
        setIsRefreshing(false);
      },
      () => {
        setIsRefreshing(false);
        setLoaded((previous) =>
          // A failed reload keeps lines that were already shown.
          previous?.userId === userId && previous.lines
            ? previous
            : { userId, attempt, lines: null, failed: true },
        );
      },
    );
  }, [userId, attempt]);

  // Lines loaded for a previous account never show for the current one.
  const current = userId && loaded?.userId === userId ? loaded : null;
  const lines = current?.lines ?? NONE;
  const status: AsyncStatus = current?.lines
    ? 'ready'
    : current?.failed && current.attempt === attempt
      ? 'error'
      : 'loading';
  const summary = useMemo(() => cartSummary(lines), [lines]);

  // A fresh subscription reloads from the server; shown lines stay meanwhile.
  function refresh() {
    setIsRefreshing(true);
    setAttempt((value) => value + 1);
  }

  function changeQuantity(line: CartLine, quantity: number) {
    cartUseCases.changeQuantity(cartLineKey(line), quantity).catch(() => {
      // The repository already rolled the change back.
    });
  }

  function remove(line: CartLine) {
    cartUseCases.removeFromCart(cartLineKey(line)).catch(() => {
      // The repository already put the line back.
    });
  }

  return {
    canAdd: userId !== null,
    /** Newest first; empty until loaded and for guests. */
    lines: status === 'ready' ? lines : NONE,
    summary,
    status,
    isRefreshing,
    retry: () => setAttempt((value) => value + 1),
    refresh,
    /** Resolves when saved; rejects when the server refused. */
    add: (productId: string, size: string | null) =>
      cartUseCases.addToCart(productId, size),
    changeQuantity,
    remove,
  };
}
