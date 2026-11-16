import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import type { ReactNode } from 'react';
import { View } from 'react-native';

import {
  isOnSale,
  type Product,
} from '@/features/catalog/domain/entities/product';
import { useLocalized } from '@/shared/i18n/use-localized';
import { borderWidth, fonts, radius, spacing, useColors } from '@/shared/theme';
import { ThemedText } from '@/shared/ui';
import { formatPrice } from '@/shared/utils/money';

export const CARD_RADIUS = radius.lg;
const PLACEHOLDER_ICON_SIZE = 32;

export interface ProductCardProps {
  product: Product;
  /** Fixed width for rails; leave out to fill a grid cell. */
  width?: number;
  imageHeight: number;
  /** Drawn over the photo's top-right corner (the heart button). */
  accessory?: ReactNode;
}

export function ProductCard({
  product,
  width,
  imageHeight,
  accessory,
}: ProductCardProps) {
  const colors = useColors();
  const localized = useLocalized();
  const onSale = isOnSale(product);
  const photo = product.imageUrls[0];

  return (
    <View style={{ width, gap: spacing.sm }}>
      <View
        style={{
          height: imageHeight,
          borderRadius: CARD_RADIUS,
          overflow: 'hidden',
          borderWidth: borderWidth.thin,
          borderColor: colors.border,
          backgroundColor: colors.surface,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {photo ? (
          <Image
            source={{ uri: photo }}
            contentFit="cover"
            transition={200}
            recyclingKey={product.id}
            style={{ width: '100%', height: '100%' }}
          />
        ) : (
          <Ionicons
            name="shirt-outline"
            size={PLACEHOLDER_ICON_SIZE}
            color={colors.border}
          />
        )}
        {onSale && (
          <View
            style={{
              position: 'absolute',
              top: spacing.sm,
              left: spacing.sm,
              paddingVertical: spacing.xxs,
              paddingHorizontal: spacing.sm,
              borderRadius: radius.sm,
              backgroundColor: colors.sale,
            }}
          >
            <ThemedText
              variant="caption"
              style={{ fontFamily: fonts.bold, color: colors.onSale }}
            >
              −{product.discountPct}%
            </ThemedText>
          </View>
        )}
        {accessory && (
          <View
            style={{
              position: 'absolute',
              top: spacing.xxs,
              right: spacing.xxs,
            }}
          >
            {accessory}
          </View>
        )}
      </View>
      <View style={{ gap: spacing.xxs }}>
        <ThemedText variant="overline" numberOfLines={1}>
          {product.brand.toUpperCase()}
        </ThemedText>
        <ThemedText variant="subhead" color="text" numberOfLines={1}>
          {localized(product.name)}
        </ThemedText>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'baseline',
            gap: spacing.sm,
            marginTop: spacing.xxs,
          }}
        >
          <ThemedText variant="price">{formatPrice(product.price)}</ThemedText>
          {onSale && product.originalPrice !== null && (
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
  );
}
