import { ActivityIndicator, Pressable, View } from 'react-native';

import { useSignOut } from '@/features/auth/presentation/hooks/use-sign-out';
import { useTranslation } from '@/shared/i18n';
import { radius, spacing, useColors } from '@/shared/theme';
import { BottomSheet, Button, ThemedText } from '@/shared/ui';

const BUTTON_HEIGHT = 52;

export interface SignOutSheetProps {
  visible: boolean;
  onDismiss: () => void;
}

// "Log out?" confirmation. On success the root layout moves to the welcome screen.
export function SignOutSheet({ visible, onDismiss }: SignOutSheetProps) {
  const colors = useColors();
  const { t } = useTranslation();
  const { signOut, isSigningOut, error } = useSignOut();

  return (
    <BottomSheet
      visible={visible}
      onDismiss={onDismiss}
      accessibilityLabel={t('profile.signOutSheet.title')}
    >
      <View style={{ gap: spacing.sm }}>
        <ThemedText variant="headline" accessibilityRole="header">
          {t('profile.signOutSheet.title')}
        </ThemedText>
        <ThemedText variant="bodyLong" color="textSecondary">
          {t('profile.signOutSheet.message')}
        </ThemedText>
      </View>
      {error && (
        <ThemedText variant="error" accessibilityRole="alert">
          {t(`auth.errors.${error}`)}
        </ThemedText>
      )}
      <View style={{ gap: spacing.ms }}>
        {/* Destructive action: error color, which the shared Button has no variant for. */}
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={t('profile.signOutSheet.confirm')}
          accessibilityState={{ busy: isSigningOut }}
          disabled={isSigningOut}
          onPress={() => void signOut()}
          style={({ pressed }) => ({
            minHeight: BUTTON_HEIGHT,
            borderRadius: radius.md,
            backgroundColor: colors.error,
            alignItems: 'center',
            justifyContent: 'center',
            opacity: pressed ? 0.8 : 1,
          })}
        >
          {isSigningOut ? (
            <ActivityIndicator color={colors.surface} />
          ) : (
            <ThemedText variant="headline" style={{ color: colors.surface }}>
              {t('profile.signOutSheet.confirm')}
            </ThemedText>
          )}
        </Pressable>
        <Button
          size="lg"
          variant="outline"
          title={t('profile.signOutSheet.cancel')}
          onPress={onDismiss}
        />
      </View>
    </BottomSheet>
  );
}
