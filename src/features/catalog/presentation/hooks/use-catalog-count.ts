import { useMemo } from 'react';

import { catalogUseCases } from '@/di/container';
import type { CatalogFilters } from '@/features/catalog/domain/entities/catalog-query';
import type { Gender } from '@/features/catalog/domain/entities/gender';
import { useAsyncData } from '@/shared/hooks/use-async-data';

/** How many products the filter sheet's draft would show. Waits while `gender` is null. */
export function useCatalogCount(
  gender: Gender | null,
  filters: CatalogFilters,
) {
  const { categoryIds, brands } = filters;
  const load = useMemo(
    () =>
      gender
        ? () =>
            catalogUseCases.countCatalogProducts(gender, {
              categoryIds,
              brands,
            })
        : null,
    [gender, categoryIds, brands],
  );
  return useAsyncData(load).data;
}
