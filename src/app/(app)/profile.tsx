import { router } from 'expo-router';

import { SignInGate } from '@/features/auth/presentation/components/sign-in-gate';
import { ProfileScreen } from '@/features/profile/presentation/screens/profile-screen';
import { useTranslation } from '@/shared/i18n';

export default function ProfileRoute() {
  const { t } = useTranslation();
  return (
    <SignInGate
      message={t('auth.signInGate.profile')}
      onSignIn={() => router.push('/welcome')}
    >
      <ProfileScreen
        onEdit={() => router.push('/edit-profile')}
        onWishlist={() => router.navigate('/wishlist')}
      />
    </SignInGate>
  );
}
