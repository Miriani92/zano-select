import { Pressable, View } from 'react-native';

import { MAX_QUANTITY } from '@/features/cart/domain/entities/cart-line';
import { useTranslation } from '@/shared/i18n';
import { borderWidth, fonts, radius, spacing, useColors } from '@/shared/theme';
import { ThemedText } from '@/shared/ui';

const HEIGHT = 36;
const BUTTON_WIDTH = 40;

export interface QuantityStepperProps {
  quantity: number;
  onChange: (quantity: number) => void;
}

// − count +; − stops at 1 (remove has its own button), + at MAX_QUANTITY.
export function QuantityStepper({ quantity, onChange }: QuantityStepperProps) {
  const colors = useColors();
  const { t } = useTranslation();

  function stepButton(
    sign: '−' | '+',
    label: string,
    next: number,
    enabled: boolean,
  ) {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={label}
        accessibilityState={{ disabled: !enabled }}
        disabled={!enabled}
        onPress={() => onChange(next)}
        hitSlop={{ top: spacing.xs, bottom: spacing.xs }}
        style={({ pressed }) => ({
          width: BUTTON_WIDTH,
          height: HEIGHT,
          alignItems: 'center',
          justifyContent: 'center',
          opacity: pressed ? 0.6 : 1,
        })}
      >
        <ThemedText
          variant="headline"
          style={{ color: enabled ? colors.text : colors.disabled }}
        >
          {sign}
        </ThemedText>
      </Pressable>
    );
  }

  return (
    <View
      accessibilityLabel={t('cart.quantity')}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        height: HEIGHT,
        borderRadius: radius.md,
        borderWidth: borderWidth.thin,
        borderColor: colors.border,
      }}
    >
      {stepButton('−', t('cart.decrease'), quantity - 1, quantity > 1)}
      <ThemedText
        accessibilityLiveRegion="polite"
        accessibilityLabel={`${t('cart.quantity')}: ${quantity}`}
        style={{
          minWidth: 24,
          textAlign: 'center',
          fontFamily: fonts.semiBold,
        }}
      >
        {quantity}
      </ThemedText>
      {stepButton(
        '+',
        t('cart.increase'),
        quantity + 1,
        quantity < MAX_QUANTITY,
      )}
    </View>
  );
}
