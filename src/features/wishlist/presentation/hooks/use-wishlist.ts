import { useEffect, useState } from 'react';

import { wishlistUseCases } from '@/di/container';
import { useSession } from '@/features/auth/presentation/components/session-provider';
import type { AsyncStatus } from '@/shared/hooks/use-async-data';

const NONE: ReadonlySet<string> = new Set();

interface Saved {
  userId: string;
  attempt: number;
  ids: ReadonlySet<string> | null;
  failed: boolean;
}

/**
 * The signed-in user's saved products. Guests get `canSave: false`, and the
 * screen shows the sign-in sheet instead of calling `toggle`.
 */
export function useWishlist() {
  const { user } = useSession();
  const userId = user?.id ?? null;
  const [attempt, setAttempt] = useState(0);
  const [saved, setSaved] = useState<Saved | null>(null);

  useEffect(() => {
    if (!userId) return;
    return wishlistUseCases.observeWishlist(
      (ids) => setSaved({ userId, attempt, ids, failed: false }),
      () =>
        setSaved((previous) =>
          // A failed reload keeps ids that were already shown.
          previous?.userId === userId && previous.ids
            ? previous
            : { userId, attempt, ids: null, failed: true },
        ),
    );
  }, [userId, attempt]);

  // Ids loaded for a previous account never show for the current one.
  const current = userId && saved?.userId === userId ? saved : null;
  const ids = current?.ids ?? NONE;
  const status: AsyncStatus = current?.ids
    ? 'ready'
    : current?.failed && current.attempt === attempt
      ? 'error'
      : 'loading';

  function toggle(productId: string) {
    wishlistUseCases.toggleWishlist(productId, ids.has(productId)).catch(() => {
      // The repository already rolled the heart back.
    });
  }

  return {
    canSave: userId !== null,
    /** Saved ids, newest first; null until the first load succeeds. */
    ids: status === 'ready' ? ids : null,
    status,
    retry: () => setAttempt((value) => value + 1),
    isSaved: (productId: string) => ids.has(productId),
    toggle,
  };
}
