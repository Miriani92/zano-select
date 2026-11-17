import { useState } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  activeFilterCount,
  NO_FILTERS,
  type CatalogFilters,
  type CatalogSort,
} from '@/features/catalog/domain/entities/catalog-query';
import type { Gender } from '@/features/catalog/domain/entities/gender';
import { CatalogToolbar } from '@/features/catalog/presentation/components/catalog-toolbar';
import { CategoryPills } from '@/features/catalog/presentation/components/category-pills';
import { FilterSheet } from '@/features/catalog/presentation/components/filter-sheet';
import { GenderSwitch } from '@/features/catalog/presentation/components/gender-switch';
import { LoadError } from '@/features/catalog/presentation/components/load-error';
import { NoResults } from '@/features/catalog/presentation/components/no-results';
import {
  GRID_IMAGE_HEIGHT,
  ProductGrid,
} from '@/features/catalog/presentation/components/product-grid';
import { GridSkeleton } from '@/features/catalog/presentation/components/skeleton';
import { SortSheet } from '@/features/catalog/presentation/components/sort-sheet';
import { useCatalogFilterOptions } from '@/features/catalog/presentation/hooks/use-catalog-filter-options';
import { useCatalogProducts } from '@/features/catalog/presentation/hooks/use-catalog-products';
import { useGenderPreference } from '@/features/catalog/presentation/hooks/use-gender-preference';
import { useWishlistHearts } from '@/features/wishlist/presentation/hooks/use-wishlist-hearts';
import { useTranslation } from '@/shared/i18n';
import { borderWidth, spacing, useColors } from '@/shared/theme';
import { ThemedText } from '@/shared/ui';

export interface CatalogScreenProps {
  /**
   * Show only this category (a slug, e.g. from a Home chip). `requestKey`
   * changes on every request, so the same category can be asked for again.
   */
  categoryRequest?: { slug: string; requestKey: string };
  onSignIn: () => void;
}

type Sheet = 'none' | 'filter' | 'sort';

// Every product of one gender in a 2-column grid, with category, brand and sort.
export function CatalogScreen({
  categoryRequest,
  onSignIn,
}: CatalogScreenProps) {
  const colors = useColors();
  const { t } = useTranslation();
  const { gender, setGender } = useGenderPreference();
  const options = useCatalogFilterOptions(gender);
  const hearts = useWishlistHearts(onSignIn);

  const [sort, setSort] = useState<CatalogSort>('newest');
  const [categoryIds, setCategoryIds] = useState<string[]>([]);
  // Brands differ per gender, so a choice only counts for the gender it was made in.
  const [brandChoice, setBrandChoice] = useState<{
    gender: Gender | null;
    brands: string[];
  }>({ gender: null, brands: [] });
  const [sheet, setSheet] = useState<Sheet>('none');
  const [filterSheetKey, setFilterSheetKey] = useState(0);
  const [handledRequest, setHandledRequest] = useState<string | null>(null);

  const brands =
    brandChoice.gender === gender ? brandChoice.brands : NO_FILTERS.brands;
  const filters: CatalogFilters = { categoryIds, brands };
  const products = useCatalogProducts(gender, sort, filters);

  // A category asked for from outside (Home) replaces the current filters once
  // categories are known. Adjusting state while rendering, not in an effect.
  const categories = options.data?.categories;
  if (
    categoryRequest &&
    categoryRequest.requestKey !== handledRequest &&
    categories
  ) {
    const category = categories.find(
      (item) => item.slug === categoryRequest.slug,
    );
    setHandledRequest(categoryRequest.requestKey);
    setCategoryIds(category ? [category.id] : []);
    setBrandChoice({ gender, brands: [] });
  }

  function applyFilters(next: CatalogFilters) {
    setCategoryIds(next.categoryIds);
    setBrandChoice({ gender, brands: next.brands });
    setSheet('none');
  }

  function openFilter() {
    setFilterSheetKey((key) => key + 1);
    setSheet('filter');
  }

  return (
    <SafeAreaView
      edges={['top']}
      style={{ flex: 1, backgroundColor: colors.background }}
    >
      <View
        style={{
          paddingTop: spacing.sm,
          paddingBottom: spacing.ms,
          gap: spacing.md,
          borderBottomWidth: borderWidth.thin,
          borderBottomColor: colors.border,
        }}
      >
        <ThemedText
          variant="title"
          accessibilityRole="header"
          style={{ paddingHorizontal: spacing.lg }}
        >
          {t('catalog.title')}
        </ThemedText>
        {gender && (
          <View style={{ paddingHorizontal: spacing.lg }}>
            <GenderSwitch value={gender} onChange={setGender} />
          </View>
        )}
        {categories && (
          <CategoryPills
            categories={categories}
            selectedIds={categoryIds}
            onSelect={(id) => setCategoryIds(id ? [id] : [])}
          />
        )}
        <CatalogToolbar
          filterCount={activeFilterCount(filters)}
          sort={sort}
          productCount={products.data?.length ?? null}
          onOpenFilter={openFilter}
          onOpenSort={() => setSheet('sort')}
        />
      </View>

      {products.status === 'loading' && (
        <GridSkeleton imageHeight={GRID_IMAGE_HEIGHT} />
      )}
      {products.status === 'error' && <LoadError onRetry={products.retry} />}
      {products.data?.length === 0 && (
        <NoResults onClearFilters={() => applyFilters(NO_FILTERS)} />
      )}
      {products.data && products.data.length > 0 && (
        <ProductGrid
          products={products.data}
          accessoryFor={(product) => hearts.heartFor(product.id)}
          isRefreshing={products.isRefreshing}
          onRefresh={products.refresh}
        />
      )}

      {gender && options.data && (
        <FilterSheet
          key={filterSheetKey}
          visible={sheet === 'filter'}
          gender={gender}
          categories={options.data.categories}
          brands={options.data.brands}
          applied={filters}
          onApply={applyFilters}
          onDismiss={() => setSheet('none')}
        />
      )}
      <SortSheet
        visible={sheet === 'sort'}
        value={sort}
        onChange={(next) => {
          setSort(next);
          setSheet('none');
        }}
        onDismiss={() => setSheet('none')}
      />
      {hearts.sheet}
    </SafeAreaView>
  );
}
