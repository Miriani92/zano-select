import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { View } from 'react-native';

import {
  isOnSale,
  type Product,
} from '@/features/catalog/domain/entities/product';
import { useTranslation } from '@/shared/i18n';
import { useLocalized } from '@/shared/i18n/use-localized';
import { borderWidth, radius, spacing, useColors } from '@/shared/theme';
import { BottomSheet, Button, ThemedText } from '@/shared/ui';
import { formatPrice } from '@/shared/utils/money';

const CHECK_CIRCLE = 28;
const PHOTO_WIDTH = 64;
const PHOTO_HEIGHT = 80;

export interface AddedToCartSheetProps {
  visible: boolean;
  product: Product;
  size: string | null;
  /** Units in the cart after this add, for "View cart (N)". */
  cartCount: number;
  onViewCart: () => void;
  onDismiss: () => void;
}

// Confirms "Add to cart": the item that went in, then View cart or Continue shopping.
export function AddedToCartSheet({
  visible,
  product,
  size,
  cartCount,
  onViewCart,
  onDismiss,
}: AddedToCartSheetProps) {
  const colors = useColors();
  const { t } = useTranslation();
  const localized = useLocalized();
  const photo = product.imageUrls[0];

  return (
    <BottomSheet
      visible={visible}
      onDismiss={onDismiss}
      accessibilityLabel={t('product.addedSheet.title')}
    >
      <View
        style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.ms }}
      >
        <View
          style={{
            width: CHECK_CIRCLE,
            height: CHECK_CIRCLE,
            borderRadius: radius.full,
            backgroundColor: colors.primary,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Ionicons name="checkmark" size={16} color={colors.onPrimary} />
        </View>
        <ThemedText variant="headline" accessibilityRole="header">
          {t('product.addedSheet.title')}
        </ThemedText>
      </View>

      <View
        style={{
          flexDirection: 'row',
          gap: spacing.ms,
          padding: spacing.ms,
          borderRadius: radius.lg,
          borderWidth: borderWidth.thin,
          borderColor: colors.border,
        }}
      >
        <View
          style={{
            width: PHOTO_WIDTH,
            height: PHOTO_HEIGHT,
            borderRadius: radius.md,
            overflow: 'hidden',
            backgroundColor: colors.background,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {photo ? (
            <Image
              source={{ uri: photo }}
              contentFit="cover"
              style={{ width: '100%', height: '100%' }}
            />
          ) : (
            <Ionicons name="shirt-outline" size={22} color={colors.border} />
          )}
        </View>
        <View style={{ flex: 1, minWidth: 0, gap: spacing.xxs }}>
          <ThemedText variant="overline" numberOfLines={1}>
            {product.brand.toUpperCase()}
          </ThemedText>
          <ThemedText variant="subhead" color="text" numberOfLines={1}>
            {localized(product.name)}
          </ThemedText>
          {size !== null && (
            <ThemedText variant="footnote">
              {t('cart.size', { size })}
            </ThemedText>
          )}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'baseline',
              gap: spacing.xs + spacing.xxs,
            }}
          >
            <ThemedText variant="price">
              {formatPrice(product.price)}
            </ThemedText>
            {isOnSale(product) && product.originalPrice !== null && (
              <ThemedText
                variant="caption"
                style={{ textDecorationLine: 'line-through' }}
              >
                {formatPrice(product.originalPrice)}
              </ThemedText>
            )}
          </View>
        </View>
      </View>

      <View style={{ gap: spacing.ms }}>
        <Button
          size="lg"
          title={t('product.addedSheet.viewCart', { count: cartCount })}
          onPress={onViewCart}
        />
        <Button
          size="lg"
          variant="outline"
          title={t('product.addedSheet.continue')}
          onPress={onDismiss}
        />
      </View>
    </BottomSheet>
  );
}
