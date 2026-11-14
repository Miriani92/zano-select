import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';

import { useTranslation } from '@/shared/i18n';
import { spacing, useColors } from '@/shared/theme';
import { Button, ThemedText } from '@/shared/ui';

export interface LoadErrorProps {
  onRetry: () => void;
}

// "Couldn't load" with a retry button, for screens whose data failed to load.
export function LoadError({ onRetry }: LoadErrorProps) {
  const colors = useColors();
  const { t } = useTranslation();

  return (
    <View
      accessibilityRole="alert"
      style={{
        paddingHorizontal: 40,
        paddingVertical: spacing.xl,
        alignItems: 'center',
        gap: spacing.md,
      }}
    >
      <View
        style={{
          width: 72,
          height: 72,
          borderRadius: 36,
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: colors.surface,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Ionicons
          name="cloud-offline-outline"
          size={30}
          color={colors.textSecondary}
        />
      </View>
      <ThemedText
        variant="headline"
        accessibilityRole="header"
        style={{ textAlign: 'center' }}
      >
        {t('home.error.title')}
      </ThemedText>
      <ThemedText
        color="textSecondary"
        style={{ fontSize: 15, lineHeight: 23, textAlign: 'center' }}
      >
        {t('home.error.message')}
      </ThemedText>
      <Button
        size="lg"
        title={t('home.error.retry')}
        icon={<Ionicons name="refresh" size={18} color={colors.onPrimary} />}
        onPress={onRetry}
        style={{ marginTop: spacing.sm }}
      />
    </View>
  );
}
