import type { ReactNode } from 'react';
import { FlatList, Pressable, View } from 'react-native';

import type { Product } from '@/features/catalog/domain/entities/product';
import { ProductCard } from '@/features/catalog/presentation/components/product-card';
import { useTranslation } from '@/shared/i18n';
import { fonts, spacing, useColors } from '@/shared/theme';
import { ThemedText } from '@/shared/ui';

export const RAIL_CARD_WIDTH = 148;
export const RAIL_IMAGE_HEIGHT = 188;

export interface ProductRailProps {
  title: string;
  products: Product[];
  onSeeAll: () => void;
  /** Drawn on each card's photo, e.g. the wishlist heart. */
  accessoryFor?: (product: Product) => ReactNode;
}

// A titled, horizontally scrolling row of products. Hidden when empty.
export function ProductRail({
  title,
  products,
  onSeeAll,
  accessoryFor,
}: ProductRailProps) {
  const colors = useColors();
  const { t } = useTranslation();

  if (products.length === 0) return null;

  return (
    <View style={{ gap: 12 }}>
      <View
        style={{
          paddingHorizontal: spacing.lg,
          flexDirection: 'row',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          gap: spacing.md,
        }}
      >
        <ThemedText
          accessibilityRole="header"
          numberOfLines={1}
          style={{
            flexShrink: 1,
            fontSize: 18,
            lineHeight: 24,
            fontFamily: fonts.bold,
          }}
        >
          {title}
        </ThemedText>
        <Pressable
          accessibilityRole="link"
          accessibilityLabel={`${t('home.seeAll')}: ${title}`}
          onPress={onSeeAll}
          hitSlop={spacing.sm}
        >
          <ThemedText
            style={{
              fontSize: 14,
              lineHeight: 20,
              fontFamily: fonts.semiBold,
              color: colors.textSecondary,
            }}
          >
            {t('home.seeAll')}
          </ThemedText>
        </Pressable>
      </View>
      <FlatList
        horizontal
        data={products}
        keyExtractor={(product) => product.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: spacing.lg, gap: 12 }}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            width={RAIL_CARD_WIDTH}
            imageHeight={RAIL_IMAGE_HEIGHT}
            accessory={accessoryFor?.(item)}
          />
        )}
      />
    </View>
  );
}
