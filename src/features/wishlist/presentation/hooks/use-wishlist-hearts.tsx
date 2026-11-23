import { useState } from 'react';

import { SignInSheet } from '@/features/auth/presentation/components/sign-in-sheet';
import { WishlistHeart } from '@/features/wishlist/presentation/components/wishlist-heart';
import { useWishlist } from '@/features/wishlist/presentation/hooks/use-wishlist';
import { useTranslation } from '@/shared/i18n';

/**
 * For a product list screen: `heartFor(id)` renders a card's heart, and
 * `sheet` (render it once) asks guests to sign in instead of saving.
 */
export function useWishlistHearts(onSignIn: () => void) {
  const { t } = useTranslation();
  const wishlist = useWishlist();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  function heartFor(productId: string, options?: { large?: boolean }) {
    return (
      <WishlistHeart
        large={options?.large}
        saved={wishlist.isSaved(productId)}
        onPress={() => {
          if (wishlist.canSave) wishlist.toggle(productId);
          else setIsSheetOpen(true);
        }}
      />
    );
  }

  const sheet = (
    <SignInSheet
      visible={isSheetOpen}
      title={t('home.signInSheet.title')}
      message={t('home.signInSheet.message')}
      icon="heart-outline"
      onDismiss={() => setIsSheetOpen(false)}
      onSignIn={() => {
        setIsSheetOpen(false);
        onSignIn();
      }}
    />
  );

  return { heartFor, sheet };
}
