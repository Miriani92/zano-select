import { useState } from 'react';

import { WishlistHeart } from '@/features/wishlist/presentation/components/wishlist-heart';
import { WishlistSignInSheet } from '@/features/wishlist/presentation/components/wishlist-sign-in-sheet';
import { useWishlist } from '@/features/wishlist/presentation/hooks/use-wishlist';

/**
 * For a product list screen: `heartFor(id)` renders a card's heart, and
 * `sheet` (render it once) asks guests to sign in instead of saving.
 */
export function useWishlistHearts(onSignIn: () => void) {
  const wishlist = useWishlist();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  function heartFor(productId: string) {
    return (
      <WishlistHeart
        saved={wishlist.isSaved(productId)}
        onPress={() => {
          if (wishlist.canSave) wishlist.toggle(productId);
          else setIsSheetOpen(true);
        }}
      />
    );
  }

  const sheet = (
    <WishlistSignInSheet
      visible={isSheetOpen}
      onDismiss={() => setIsSheetOpen(false)}
      onSignIn={() => {
        setIsSheetOpen(false);
        onSignIn();
      }}
    />
  );

  return { heartFor, sheet };
}
