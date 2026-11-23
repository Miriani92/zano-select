import { View } from 'react-native';

import type { CartSummary as Summary } from '@/features/cart/domain/entities/cart-summary';
import { useTranslation } from '@/shared/i18n';
import { borderWidth, fonts, radius, spacing, useColors } from '@/shared/theme';
import { ThemedText } from '@/shared/ui';
import { formatPrice } from '@/shared/utils/money';

export interface CartSummaryProps {
  summary: Summary;
}

// Items, discount, delivery (worked out at checkout) and the total.
export function CartSummary({ summary }: CartSummaryProps) {
  const colors = useColors();
  const { t } = useTranslation();

  return (
    <View
      accessibilityLabel={t('cart.summary.title')}
      style={{
        padding: spacing.md,
        gap: spacing.ms - spacing.xxs,
        borderRadius: radius.lg,
        borderWidth: borderWidth.thin,
        borderColor: colors.border,
        backgroundColor: colors.surface,
      }}
    >
      <Row
        label={t('cart.summary.items', { count: summary.availableCount })}
        value={formatPrice(summary.subtotal)}
      />
      {summary.discount > 0 && (
        <Row
          label={t('cart.summary.discount')}
          value={`−${formatPrice(summary.discount)}`}
          valueColor={colors.sale}
        />
      )}
      <Row
        label={t('cart.summary.delivery')}
        value={t('cart.summary.deliveryLater')}
        valueColor={colors.textSecondary}
      />
      <View
        style={{ height: borderWidth.thin, backgroundColor: colors.border }}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'baseline',
        }}
      >
        <ThemedText variant="label" style={{ fontFamily: fonts.semiBold }}>
          {t('cart.summary.total')}
        </ThemedText>
        <ThemedText variant="sectionTitle">
          {formatPrice(summary.total)}
        </ThemedText>
      </View>
    </View>
  );
}

function Row({
  label,
  value,
  valueColor,
}: {
  label: string;
  value: string;
  valueColor?: string;
}) {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <ThemedText variant="subhead">{label}</ThemedText>
      <ThemedText
        variant="subhead"
        color="text"
        style={valueColor ? { color: valueColor } : undefined}
      >
        {value}
      </ThemedText>
    </View>
  );
}
