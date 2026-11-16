import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import type { Gender } from '@/features/catalog/domain/entities/gender';
import type { Rail } from '@/features/catalog/domain/entities/rail';
import { LoadError } from '@/features/catalog/presentation/components/load-error';
import {
  GRID_IMAGE_HEIGHT,
  ProductGrid,
} from '@/features/catalog/presentation/components/product-grid';
import { GridSkeleton } from '@/features/catalog/presentation/components/skeleton';
import { useRailProducts } from '@/features/catalog/presentation/hooks/use-rail-products';
import { useWishlistHearts } from '@/features/wishlist/presentation/hooks/use-wishlist-hearts';
import { useTranslation } from '@/shared/i18n';
import { borderWidth, spacing, touchTarget, useColors } from '@/shared/theme';
import { IconButton, ThemedText } from '@/shared/ui';

export interface SeeAllScreenProps {
  rail: Rail;
  gender: Gender;
  onBack: () => void;
  onSignIn: () => void;
}

// Every product of one Home rail in a 2-column grid.
export function SeeAllScreen({
  rail,
  gender,
  onBack,
  onSignIn,
}: SeeAllScreenProps) {
  const colors = useColors();
  const { t } = useTranslation();
  const products = useRailProducts(rail, gender);
  const hearts = useWishlistHearts(onSignIn);

  return (
    <SafeAreaView
      edges={['top']}
      style={{ flex: 1, backgroundColor: colors.background }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: spacing.sm,
          paddingHorizontal: spacing.md,
          paddingTop: spacing.sm,
          paddingBottom: spacing.ms,
          borderBottomWidth: borderWidth.thin,
          borderBottomColor: colors.border,
        }}
      >
        <IconButton
          accessibilityLabel={t('common.back')}
          onPress={onBack}
          style={{ width: touchTarget, height: touchTarget }}
        >
          <Ionicons name="chevron-back" size={22} color={colors.text} />
        </IconButton>
        <View style={{ flex: 1, minWidth: 0 }}>
          <ThemedText
            accessibilityRole="header"
            variant="sectionTitle"
            numberOfLines={1}
          >
            {t(`home.rails.${rail}`)}
          </ThemedText>
          <ThemedText variant="footnote">
            {`${t(`home.gender.${gender}`)} · ${t(`home.sortedBy.${rail}`)}`}
          </ThemedText>
        </View>
      </View>

      {products.status === 'loading' && (
        <GridSkeleton imageHeight={GRID_IMAGE_HEIGHT} />
      )}
      {products.status === 'error' && <LoadError onRetry={products.retry} />}
      {products.data && (
        <ProductGrid
          products={products.data}
          accessoryFor={(product) => hearts.heartFor(product.id)}
          isRefreshing={products.isRefreshing}
          onRefresh={products.refresh}
        />
      )}
      {hearts.sheet}
    </SafeAreaView>
  );
}
