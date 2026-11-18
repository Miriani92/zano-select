import { Pressable, View } from 'react-native';

import type { ProductSize } from '@/features/catalog/domain/entities/product-detail';
import { useTranslation } from '@/shared/i18n';
import {
  borderWidth,
  fonts,
  radius,
  spacing,
  touchTarget,
  useColors,
} from '@/shared/theme';
import { ThemedText } from '@/shared/ui';

const PILL_MIN_WIDTH = 56;

export interface SizePickerProps {
  sizes: ProductSize[];
  selected: string | null;
  /** Shows "Choose a size" after the shopper tried to add without one. */
  showMissing: boolean;
  onSelect: (label: string) => void;
}

// One pill per size; sold-out sizes are crossed out and can't be picked.
export function SizePicker({
  sizes,
  selected,
  showMissing,
  onSelect,
}: SizePickerProps) {
  const colors = useColors();
  const { t } = useTranslation();

  return (
    <View accessibilityRole="radiogroup" style={{ gap: spacing.ms }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'baseline',
          justifyContent: 'space-between',
        }}
      >
        <ThemedText variant="label" style={{ fontFamily: fonts.semiBold }}>
          {t('product.size')}
        </ThemedText>
        {showMissing && (
          <ThemedText variant="error" accessibilityRole="alert">
            {t('product.chooseSize')}
          </ThemedText>
        )}
      </View>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm }}>
        {sizes.map((size) => {
          const isSelected = size.label === selected;
          return (
            <Pressable
              key={size.label}
              accessibilityRole="radio"
              accessibilityLabel={
                size.inStock
                  ? size.label
                  : t('product.soldOut', { size: size.label })
              }
              accessibilityState={{
                checked: isSelected,
                disabled: !size.inStock,
              }}
              disabled={!size.inStock}
              onPress={() => onSelect(size.label)}
              style={({ pressed }) => ({
                minWidth: PILL_MIN_WIDTH,
                height: touchTarget,
                paddingHorizontal: spacing.ms + spacing.xxs,
                borderRadius: radius.md,
                borderWidth: borderWidth.thin,
                borderColor: isSelected ? colors.primary : colors.border,
                backgroundColor: isSelected
                  ? colors.primary
                  : size.inStock
                    ? colors.surface
                    : colors.background,
                alignItems: 'center',
                justifyContent: 'center',
                opacity: pressed ? 0.8 : 1,
              })}
            >
              <ThemedText
                variant="label"
                color={
                  isSelected
                    ? 'onPrimary'
                    : size.inStock
                      ? 'text'
                      : 'textSecondary'
                }
                style={{
                  textDecorationLine: size.inStock ? 'none' : 'line-through',
                }}
              >
                {size.label}
              </ThemedText>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
