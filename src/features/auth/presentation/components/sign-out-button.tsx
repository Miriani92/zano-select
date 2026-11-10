import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';

import { useSignOut } from '@/features/auth/presentation/hooks/use-sign-out';
import { useTranslation } from '@/shared/i18n';
import { spacing, useColors } from '@/shared/theme';
import { Button, ThemedText } from '@/shared/ui';

export function SignOutButton() {
  const colors = useColors();
  const { t } = useTranslation();
  const { signOut, isSigningOut, error } = useSignOut();

  return (
    <View style={{ gap: spacing.sm }}>
      <Button
        variant="outline"
        title={t('auth.signOut')}
        icon={<Ionicons name="log-out-outline" size={20} color={colors.text} />}
        onPress={signOut}
        loading={isSigningOut}
      />
      {error && (
        <ThemedText
          variant="caption"
          color="error"
          accessibilityRole="alert"
          style={{ textAlign: 'center' }}
        >
          {t(`auth.errors.${error}`)}
        </ThemedText>
      )}
    </View>
  );
}
