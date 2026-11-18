import type { ReactNode } from 'react';
import { FlatList, Pressable, View } from 'react-native';

import type { Product } from '@/features/catalog/domain/entities/product';
import { ProductCard } from '@/features/catalog/presentation/components/product-card';
import { useTranslation } from '@/shared/i18n';
import { spacing } from '@/shared/theme';
import { ThemedText } from '@/shared/ui';

export const RAIL_CARD_WIDTH = 148;
export const RAIL_IMAGE_HEIGHT = 188;

export interface ProductRailProps {
  title: string;
  products: Product[];
  onSeeAll: () => void;
  /** Drawn on each card's photo, e.g. the wishlist heart. */
  accessoryFor?: (product: Product) => ReactNode;
  onProductPress: (product: Product) => void;
}

// A titled, horizontally scrolling row of products. Hidden when empty.
export function ProductRail({
  title,
  products,
  onSeeAll,
  accessoryFor,
  onProductPress,
}: ProductRailProps) {
  const { t } = useTranslation();

  if (products.length === 0) return null;

  return (
    <View style={{ gap: spacing.ms }}>
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
          variant="sectionTitle"
          style={{ flexShrink: 1 }}
        >
          {title}
        </ThemedText>
        <Pressable
          accessibilityRole="link"
          accessibilityLabel={`${t('home.seeAll')}: ${title}`}
          onPress={onSeeAll}
          hitSlop={spacing.sm}
        >
          <ThemedText variant="link" color="textSecondary">
            {t('home.seeAll')}
          </ThemedText>
        </Pressable>
      </View>
      <FlatList
        horizontal
        data={products}
        keyExtractor={(product) => product.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: spacing.lg,
          gap: spacing.ms,
        }}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            width={RAIL_CARD_WIDTH}
            imageHeight={RAIL_IMAGE_HEIGHT}
            accessory={accessoryFor?.(item)}
            onPress={() => onProductPress(item)}
          />
        )}
      />
    </View>
  );
}
