import { useMemo } from 'react';

import { catalogUseCases } from '@/di/container';
import type {
  CatalogFilters,
  CatalogSort,
} from '@/features/catalog/domain/entities/catalog-query';
import type { Gender } from '@/features/catalog/domain/entities/gender';
import { useAsyncData } from '@/shared/hooks/use-async-data';

/** The Catalog grid. Waits while `gender` is null (the saved choice isn't read yet). */
export function useCatalogProducts(
  gender: Gender | null,
  sort: CatalogSort,
  filters: CatalogFilters,
) {
  const { categoryIds, brands } = filters;
  const load = useMemo(
    () =>
      gender
        ? () =>
            catalogUseCases.getCatalogProducts({
              gender,
              sort,
              categoryIds,
              brands,
            })
        : null,
    [gender, sort, categoryIds, brands],
  );
  return useAsyncData(load);
}
