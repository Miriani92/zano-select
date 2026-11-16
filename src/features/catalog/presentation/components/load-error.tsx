import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';

import { useTranslation } from '@/shared/i18n';
import { borderWidth, radius, spacing, useColors } from '@/shared/theme';
import { Button, ThemedText } from '@/shared/ui';

const ICON_CIRCLE = 72;
const ICON_SIZE = 30;
const RETRY_ICON_SIZE = 18;

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
        paddingHorizontal: spacing.xl,
        paddingVertical: spacing.xl,
        alignItems: 'center',
        gap: spacing.md,
      }}
    >
      <View
        style={{
          width: ICON_CIRCLE,
          height: ICON_CIRCLE,
          borderRadius: radius.full,
          borderWidth: borderWidth.thin,
          borderColor: colors.border,
          backgroundColor: colors.surface,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Ionicons
          name="cloud-offline-outline"
          size={ICON_SIZE}
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
        variant="bodyLong"
        color="textSecondary"
        style={{ textAlign: 'center' }}
      >
        {t('home.error.message')}
      </ThemedText>
      <Button
        size="lg"
        title={t('home.error.retry')}
        icon={
          <Ionicons
            name="refresh"
            size={RETRY_ICON_SIZE}
            color={colors.onPrimary}
          />
        }
        onPress={onRetry}
        style={{ marginTop: spacing.sm }}
      />
    </View>
  );
}
