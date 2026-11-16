import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';

import { useTranslation } from '@/shared/i18n';
import { borderWidth, radius, spacing, useColors } from '@/shared/theme';
import { AccentRule, BottomSheet, Button, ThemedText } from '@/shared/ui';

const ICON_CIRCLE = 64;
const ICON_SIZE = 28;

export interface WishlistSignInSheetProps {
  visible: boolean;
  onSignIn: () => void;
  onDismiss: () => void;
}

// Shown when a guest taps a heart: sign in, or "not now".
export function WishlistSignInSheet({
  visible,
  onSignIn,
  onDismiss,
}: WishlistSignInSheetProps) {
  const colors = useColors();
  const { t } = useTranslation();

  return (
    <BottomSheet
      visible={visible}
      onDismiss={onDismiss}
      contentStyle={{ alignItems: 'center' }}
    >
      <View
        style={{
          width: ICON_CIRCLE,
          height: ICON_CIRCLE,
          borderRadius: radius.full,
          marginTop: spacing.xs,
          borderWidth: borderWidth.thin,
          borderColor: colors.border,
          backgroundColor: colors.background,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Ionicons
          name="heart-outline"
          size={ICON_SIZE}
          color={colors.primary}
        />
      </View>
      <View style={{ alignItems: 'center', gap: spacing.ms }}>
        <ThemedText
          variant="headlineLarge"
          accessibilityRole="header"
          style={{ textAlign: 'center' }}
        >
          {t('home.signInSheet.title')}
        </ThemedText>
        <AccentRule />
        <ThemedText
          variant="bodyLong"
          color="textSecondary"
          style={{ textAlign: 'center' }}
        >
          {t('home.signInSheet.message')}
        </ThemedText>
      </View>
      <View
        style={{ alignSelf: 'stretch', gap: spacing.ms, marginTop: spacing.xs }}
      >
        <Button
          size="lg"
          title={t('home.signInSheet.signIn')}
          onPress={onSignIn}
        />
        <Button
          size="lg"
          variant="outline"
          title={t('home.signInSheet.notNow')}
          onPress={onDismiss}
        />
      </View>
    </BottomSheet>
  );
}
