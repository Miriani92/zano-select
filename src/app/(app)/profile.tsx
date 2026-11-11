import { router } from 'expo-router';

import { SignInGate } from '@/features/auth/presentation/components/sign-in-gate';
import { AccountScreen } from '@/features/auth/presentation/screens/account-screen';
import { useTranslation } from '@/shared/i18n';

export default function ProfileRoute() {
  const { t } = useTranslation();
  return (
    <SignInGate
      message={t('auth.signInGate.profile')}
      onSignIn={() => router.push('/welcome')}
    >
      <AccountScreen />
    </SignInGate>
  );
}
