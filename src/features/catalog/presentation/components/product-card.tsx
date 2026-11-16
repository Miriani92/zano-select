import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import type { ReactNode } from 'react';
import { View } from 'react-native';

import {
  isOnSale,
  type Product,
} from '@/features/catalog/domain/entities/product';
import { useLocalized } from '@/shared/i18n/use-localized';
import { fonts, radius, useColors } from '@/shared/theme';
import { ThemedText } from '@/shared/ui';
import { formatPrice } from '@/shared/utils/money';

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
    <View style={{ width, gap: 8 }}>
      <View
        style={{
          height: imageHeight,
          borderRadius: 14,
          overflow: 'hidden',
          borderWidth: 1,
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
          <Ionicons name="shirt-outline" size={32} color={colors.border} />
        )}
        {onSale && (
          <View
            style={{
              position: 'absolute',
              top: 8,
              left: 8,
              paddingVertical: 3,
              paddingHorizontal: 8,
              borderRadius: radius.sm,
              backgroundColor: colors.sale,
            }}
          >
            <ThemedText
              style={{
                fontSize: 12,
                lineHeight: 16,
                fontFamily: fonts.bold,
                color: colors.onSale,
              }}
            >
              −{product.discountPct}%
            </ThemedText>
          </View>
        )}
        {accessory && (
          <View style={{ position: 'absolute', top: 2, right: 2 }}>
            {accessory}
          </View>
        )}
      </View>
      <View style={{ gap: 2 }}>
        <ThemedText
          numberOfLines={1}
          style={{
            fontSize: 11,
            lineHeight: 14,
            letterSpacing: 0.6,
            fontFamily: fonts.semiBold,
            color: colors.textSecondary,
          }}
        >
          {product.brand.toUpperCase()}
        </ThemedText>
        <ThemedText
          numberOfLines={1}
          style={{ fontSize: 14, lineHeight: 19, fontFamily: fonts.regular }}
        >
          {localized(product.name)}
        </ThemedText>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'baseline',
            gap: 6,
            marginTop: 2,
          }}
        >
          <ThemedText
            style={{ fontSize: 15, lineHeight: 20, fontFamily: fonts.bold }}
          >
            {formatPrice(product.price)}
          </ThemedText>
          {onSale && product.originalPrice !== null && (
            <ThemedText
              style={{
                fontSize: 12,
                lineHeight: 16,
                color: colors.textSecondary,
                textDecorationLine: 'line-through',
              }}
            >
              {formatPrice(product.originalPrice)}
            </ThemedText>
          )}
        </View>
      </View>
    </View>
  );
}
