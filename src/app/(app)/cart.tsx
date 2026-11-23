import { router } from 'expo-router';

import { SignInGate } from '@/features/auth/presentation/components/sign-in-gate';
import { CartScreen } from '@/features/cart/presentation/screens/cart-screen';
import { useTranslation } from '@/shared/i18n';

export default function CartRoute() {
  const { t } = useTranslation();
  return (
    <SignInGate
      message={t('auth.signInGate.cart')}
      onSignIn={() => router.push('/welcome')}
    >
      <CartScreen
        onProduct={(id) =>
          router.push({ pathname: '/product/[id]', params: { id } })
        }
        onStartShopping={() => router.navigate('/catalog')}
        onViewWishlist={() => router.navigate('/wishlist')}
      />
    </SignInGate>
  );
}
