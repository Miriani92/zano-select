import { Ionicons } from '@expo/vector-icons';
import type { ReactNode } from 'react';
import { useSession } from '@/features/auth/presentation/components/session-provider';
import { useTranslation } from '@/shared/i18n';
import { useColors } from '@/shared/theme';
import { Button, ScreenPlaceholder } from '@/shared/ui';

export interface SignInGateProps {
  message: string;
  onSignIn: () => void;
  children: ReactNode;
}

// Guests see a sign-in prompt instead of the screen; signed-in users see the screen.
export function SignInGate({ message, onSignIn, children }: SignInGateProps) {
  const { user } = useSession();
  const colors = useColors();
  const { t } = useTranslation();

  if (user) {
    return children;
  }

  return (
    <ScreenPlaceholder
      title={t('auth.signInGate.title')}
      message={message}
      icon={
        <Ionicons
          name="person-circle-outline"
          size={56}
          color={colors.textSecondary}
        />
      }
    >
      <Button
        size="lg"
        title={t('auth.signInGate.signIn')}
        onPress={onSignIn}
      />
    </ScreenPlaceholder>
  );
}
