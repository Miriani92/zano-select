import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { LoadError } from '@/features/catalog/presentation/components/load-error';
import {
  GRID_IMAGE_HEIGHT,
  ProductGrid,
} from '@/features/catalog/presentation/components/product-grid';
import { GridSkeleton } from '@/features/catalog/presentation/components/skeleton';
import { WishlistEmpty } from '@/features/wishlist/presentation/components/wishlist-empty';
import { useWishlistHearts } from '@/features/wishlist/presentation/hooks/use-wishlist-hearts';
import { useWishlistProducts } from '@/features/wishlist/presentation/hooks/use-wishlist-products';
import { useTranslation } from '@/shared/i18n';
import { borderWidth, spacing, useColors } from '@/shared/theme';
import { ThemedText } from '@/shared/ui';

export interface WishlistScreenProps {
  onSignIn: () => void;
  onProduct: (id: string) => void;
  onStartShopping: () => void;
}

// The signed-in user's saved products in a 2-column grid; a heart tap removes one.
export function WishlistScreen({
  onSignIn,
  onProduct,
  onStartShopping,
}: WishlistScreenProps) {
  const colors = useColors();
  const { t } = useTranslation();
  const products = useWishlistProducts();
  const hearts = useWishlistHearts(onSignIn);

  return (
    <SafeAreaView
      edges={['top']}
      style={{ flex: 1, backgroundColor: colors.background }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          paddingHorizontal: spacing.lg,
          paddingTop: spacing.sm,
          paddingBottom: spacing.ms,
          borderBottomWidth: borderWidth.thin,
          borderBottomColor: colors.border,
        }}
      >
        <ThemedText variant="title" accessibilityRole="header">
          {t('wishlist.title')}
        </ThemedText>
        {products.data && products.data.length > 0 && (
          <ThemedText variant="subhead">
            {t('wishlist.itemCount', { count: products.data.length })}
          </ThemedText>
        )}
      </View>

      {products.status === 'loading' && (
        <GridSkeleton imageHeight={GRID_IMAGE_HEIGHT} />
      )}
      {products.status === 'error' && <LoadError onRetry={products.retry} />}
      {products.data?.length === 0 && (
        <WishlistEmpty onStartShopping={onStartShopping} />
      )}
      {products.data && products.data.length > 0 && (
        <ProductGrid
          products={products.data}
          accessoryFor={(product) => hearts.heartFor(product.id)}
          onProductPress={(product) => onProduct(product.id)}
          isRefreshing={products.isRefreshing}
          onRefresh={products.refresh}
        />
      )}
      {hearts.sheet}
    </SafeAreaView>
  );
}
