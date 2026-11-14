import { useEffect, useState } from 'react';

import { wishlistUseCases } from '@/di/container';
import { useSession } from '@/features/auth/presentation/components/session-provider';

const NONE: ReadonlySet<string> = new Set();

interface Saved {
  userId: string;
  ids: ReadonlySet<string>;
}

/**
 * The signed-in user's saved products. Guests get `canSave: false`, and the
 * screen shows the sign-in sheet instead of calling `toggle`.
 */
export function useWishlist() {
  const { user } = useSession();
  const userId = user?.id ?? null;
  const [saved, setSaved] = useState<Saved | null>(null);

  useEffect(() => {
    if (!userId) return;
    return wishlistUseCases.observeWishlist((ids) => setSaved({ userId, ids }));
  }, [userId]);

  // Ids loaded for a previous account never show for the current one.
  const ids = userId && saved?.userId === userId ? saved.ids : NONE;

  function toggle(productId: string) {
    wishlistUseCases.toggleWishlist(productId, ids.has(productId)).catch(() => {
      // The repository already rolled the heart back.
    });
  }

  return {
    canSave: userId !== null,
    isSaved: (productId: string) => ids.has(productId),
    toggle,
  };
}
