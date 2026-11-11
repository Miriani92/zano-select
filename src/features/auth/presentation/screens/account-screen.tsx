import { Ionicons } from '@expo/vector-icons';

import { SignOutButton } from '@/features/auth/presentation/components/sign-out-button';
import { useSession } from '@/features/auth/presentation/components/session-provider';
import { useTranslation } from '@/shared/i18n';
import { useColors } from '@/shared/theme';
import { ScreenPlaceholder } from '@/shared/ui';

export function AccountScreen() {
  const { user } = useSession();
  const colors = useColors();
  const { t } = useTranslation();

  return (
    <ScreenPlaceholder
      title={t('tabs.profile')}
      message={user?.email ?? undefined}
      icon={
        <Ionicons
          name="person-circle-outline"
          size={56}
          color={colors.textSecondary}
        />
      }
    >
      <SignOutButton />
    </ScreenPlaceholder>
  );
}
