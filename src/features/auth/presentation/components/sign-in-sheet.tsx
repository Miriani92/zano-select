import { Ionicons } from '@expo/vector-icons';
import type { ComponentProps } from 'react';
import { View } from 'react-native';

import { useTranslation } from '@/shared/i18n';
import { borderWidth, radius, spacing, useColors } from '@/shared/theme';
import { AccentRule, BottomSheet, Button, ThemedText } from '@/shared/ui';

const ICON_CIRCLE = 64;
const ICON_SIZE = 28;

type IconName = ComponentProps<typeof Ionicons>['name'];

export interface SignInSheetProps {
  visible: boolean;
  title: string;
  message: string;
  icon: IconName;
  onSignIn: () => void;
  onDismiss: () => void;
}

// Shown when a guest tries something that needs an account: sign in, or "not now".
export function SignInSheet({
  visible,
  title,
  message,
  icon,
  onSignIn,
  onDismiss,
}: SignInSheetProps) {
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
        <Ionicons name={icon} size={ICON_SIZE} color={colors.primary} />
      </View>
      <View style={{ alignItems: 'center', gap: spacing.ms }}>
        <ThemedText
          variant="headlineLarge"
          accessibilityRole="header"
          style={{ textAlign: 'center' }}
        >
          {title}
        </ThemedText>
        <AccentRule />
        <ThemedText
          variant="bodyLong"
          color="textSecondary"
          style={{ textAlign: 'center' }}
        >
          {message}
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
