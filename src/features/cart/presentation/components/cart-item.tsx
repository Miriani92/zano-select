import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Pressable, View } from 'react-native';

import type { CartLine } from '@/features/cart/domain/entities/cart-line';
import { QuantityStepper } from '@/features/cart/presentation/components/quantity-stepper';
import { isOnSale } from '@/features/catalog/domain/entities/product';
import { useTranslation } from '@/shared/i18n';
import { useLocalized } from '@/shared/i18n/use-localized';
import {
  borderWidth,
  fonts,
  radius,
  spacing,
  touchTarget,
  useColors,
} from '@/shared/theme';
import { IconButton, ThemedText } from '@/shared/ui';
import { formatPrice } from '@/shared/utils/money';

const PHOTO_WIDTH = 84;
const PHOTO_HEIGHT = 108;
const SOLD_OUT_OPACITY = 0.45;

export interface CartItemProps {
  line: CartLine;
  onOpen: () => void;
  onQuantityChange: (quantity: number) => void;
  onRemove: () => void;
}

// One cart line: photo, brand, name, size, price and quantity. A sold-out line
// is faded and can only be removed.
export function CartItem({
  line,
  onOpen,
  onQuantityChange,
  onRemove,
}: CartItemProps) {
  const colors = useColors();
  const { t } = useTranslation();
  const localized = useLocalized();
  const { product, quantity, available } = line;
  const name = localized(product.name);
  const photo = product.imageUrls[0];
  const fade = available ? 1 : SOLD_OUT_OPACITY;

  return (
    <View
      style={{
        flexDirection: 'row',
        gap: spacing.ms,
        padding: spacing.ms,
        borderRadius: radius.lg,
        borderWidth: borderWidth.thin,
        borderColor: colors.border,
        backgroundColor: colors.surface,
      }}
    >
      <Pressable
        accessibilityRole="link"
        accessibilityLabel={`${product.brand}, ${name}`}
        onPress={onOpen}
        style={{
          width: PHOTO_WIDTH,
          height: PHOTO_HEIGHT,
          borderRadius: radius.md,
          overflow: 'hidden',
          borderWidth: borderWidth.thin,
          borderColor: colors.border,
          backgroundColor: colors.background,
          alignItems: 'center',
          justifyContent: 'center',
          opacity: fade,
        }}
      >
        {photo ? (
          <Image
            source={{ uri: photo }}
            contentFit="cover"
            recyclingKey={product.id}
            style={{ width: '100%', height: '100%' }}
          />
        ) : (
          <Ionicons name="shirt-outline" size={24} color={colors.border} />
        )}
      </Pressable>

      <View style={{ flex: 1, minWidth: 0, gap: spacing.xs }}>
        <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
          <View
            style={{ flex: 1, minWidth: 0, gap: spacing.xxs, opacity: fade }}
          >
            <ThemedText variant="overline" numberOfLines={1}>
              {product.brand.toUpperCase()}
            </ThemedText>
            <ThemedText variant="subhead" color="text" numberOfLines={1}>
              {name}
            </ThemedText>
            {line.size !== null && (
              <ThemedText variant="footnote">
                {t('cart.size', { size: line.size })}
              </ThemedText>
            )}
          </View>
          <IconButton
            accessibilityLabel={`${t('cart.remove')}: ${name}`}
            onPress={onRemove}
            style={{
              width: touchTarget,
              height: touchTarget,
              marginTop: -spacing.ms,
              marginRight: -spacing.ms,
            }}
          >
            <Ionicons
              name="trash-outline"
              size={18}
              color={colors.textSecondary}
            />
          </IconButton>
        </View>

        <View style={{ flex: 1 }} />

        {available ? (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: spacing.sm,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'baseline',
                gap: spacing.xs + spacing.xxs,
                flexShrink: 1,
              }}
            >
              <ThemedText variant="price">
                {formatPrice(product.price * quantity)}
              </ThemedText>
              {isOnSale(product) && product.originalPrice !== null && (
                <ThemedText
                  variant="caption"
                  style={{ textDecorationLine: 'line-through' }}
                >
                  {formatPrice(product.originalPrice * quantity)}
                </ThemedText>
              )}
            </View>
            <QuantityStepper quantity={quantity} onChange={onQuantityChange} />
          </View>
        ) : (
          <ThemedText
            variant="footnote"
            style={{ color: colors.error, fontFamily: fonts.semiBold }}
          >
            {t('cart.soldOut')}
          </ThemedText>
        )}
      </View>
    </View>
  );
}
