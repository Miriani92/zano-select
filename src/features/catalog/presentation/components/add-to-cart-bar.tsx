import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useTranslation } from '@/shared/i18n';
import { borderWidth, spacing, useColors } from '@/shared/theme';
import { Button, ThemedText } from '@/shared/ui';

export interface AddToCartBarProps {
  loading: boolean;
  /** Shown above the button when the last add failed. */
  error?: string;
  onAdd: () => void;
}

// Pinned to the bottom of the product screen, above the home indicator.
export function AddToCartBar({ loading, error, onAdd }: AddToCartBarProps) {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();

  return (
    <View
      style={{
        gap: spacing.sm,
        paddingTop: spacing.ms,
        paddingHorizontal: spacing.lg,
        paddingBottom: Math.max(insets.bottom, spacing.ms),
        backgroundColor: colors.surface,
        borderTopWidth: borderWidth.thin,
        borderTopColor: colors.border,
      }}
    >
      {error && (
        <ThemedText
          variant="error"
          accessibilityRole="alert"
          style={{ textAlign: 'center' }}
        >
          {error}
        </ThemedText>
      )}
      <Button
        size="lg"
        title={t('product.addToCart')}
        loading={loading}
        onPress={onAdd}
      />
    </View>
  );
}
