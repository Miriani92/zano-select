import { View } from 'react-native';

import { useTranslation } from '@/shared/i18n';
import { borderWidth, spacing, useColors } from '@/shared/theme';
import { Button, ThemedText } from '@/shared/ui';
import { formatPrice } from '@/shared/utils/money';

export interface CheckoutBarProps {
  total: number;
  /** False when nothing in the cart can be bought. */
  enabled: boolean;
  onCheckout: () => void;
}

// Pinned under the cart list, above the tab bar.
export function CheckoutBar({ total, enabled, onCheckout }: CheckoutBarProps) {
  const colors = useColors();
  const { t } = useTranslation();

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md,
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.ms,
        backgroundColor: colors.surface,
        borderTopWidth: borderWidth.thin,
        borderTopColor: colors.border,
      }}
    >
      <View style={{ flex: 1 }}>
        <ThemedText variant="caption">{t('cart.summary.total')}</ThemedText>
        <ThemedText variant="sectionTitle">{formatPrice(total)}</ThemedText>
      </View>
      <Button
        size="md"
        title={t('cart.checkout')}
        onPress={onCheckout}
        disabled={!enabled}
      />
    </View>
  );
}
