import { router } from 'expo-router';

import { SignInGate } from '@/features/auth/presentation/components/sign-in-gate';
import { WishlistScreen } from '@/features/wishlist/presentation/screens/wishlist-screen';
import { useTranslation } from '@/shared/i18n';

export default function WishlistRoute() {
  const { t } = useTranslation();
  return (
    <SignInGate
      message={t('auth.signInGate.wishlist')}
      onSignIn={() => router.push('/welcome')}
    >
      <WishlistScreen
        onSignIn={() => router.push('/welcome')}
        onProduct={(id) =>
          router.push({ pathname: '/product/[id]', params: { id } })
        }
        onStartShopping={() => router.navigate('/catalog')}
      />
    </SignInGate>
  );
}
