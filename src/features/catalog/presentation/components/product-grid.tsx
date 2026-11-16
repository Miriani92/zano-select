import type { ReactNode } from 'react';
import { FlatList, RefreshControl, View } from 'react-native';

import type { Product } from '@/features/catalog/domain/entities/product';
import { ProductCard } from '@/features/catalog/presentation/components/product-card';
import { spacing, useColors } from '@/shared/theme';

export const GRID_IMAGE_HEIGHT = 210;

export interface ProductGridProps {
  products: Product[];
  /** Drawn on each card's photo, e.g. the wishlist heart. */
  accessoryFor?: (product: Product) => ReactNode;
  isRefreshing?: boolean;
  onRefresh?: () => void;
}

// Two-column, vertically scrolling list of product cards.
export function ProductGrid({
  products,
  accessoryFor,
  isRefreshing = false,
  onRefresh,
}: ProductGridProps) {
  const colors = useColors();
  // An odd last card gets an empty partner so it keeps the same width.
  const cells: (Product | null)[] =
    products.length % 2 === 1 ? [...products, null] : products;

  return (
    <FlatList
      data={cells}
      numColumns={2}
      keyExtractor={(product) => product?.id ?? 'filler'}
      contentContainerStyle={{
        paddingTop: spacing.md,
        paddingHorizontal: spacing.lg,
        paddingBottom: spacing.lg,
        gap: spacing.ml,
      }}
      columnWrapperStyle={{ gap: spacing.ms }}
      refreshControl={
        onRefresh && (
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            tintColor={colors.textSecondary}
          />
        )
      }
      renderItem={({ item }) => (
        <View style={{ flex: 1 }}>
          {item && (
            <ProductCard
              product={item}
              imageHeight={GRID_IMAGE_HEIGHT}
              accessory={accessoryFor?.(item)}
            />
          )}
        </View>
      )}
    />
  );
}
