import { router } from 'expo-router';

import { SignInGate } from '@/features/auth/presentation/components/sign-in-gate';
import { useTranslation } from '@/shared/i18n';
import { ScreenPlaceholder } from '@/shared/ui';

// Placeholder until the cart feature exists.
export default function CartRoute() {
  const { t } = useTranslation();
  return (
    <SignInGate
      message={t('auth.signInGate.cart')}
      onSignIn={() => router.push('/welcome')}
    >
      <ScreenPlaceholder title={t('tabs.cart')} message={t('cart.empty')} />
    </SignInGate>
  );
}
