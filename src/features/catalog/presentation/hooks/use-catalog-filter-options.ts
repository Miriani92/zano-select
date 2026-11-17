import { useMemo } from 'react';

import { catalogUseCases } from '@/di/container';
import type { Gender } from '@/features/catalog/domain/entities/gender';
import { useAsyncData } from '@/shared/hooks/use-async-data';

/** Categories and brands to choose from. Waits while `gender` is null. */
export function useCatalogFilterOptions(gender: Gender | null) {
  const load = useMemo(
    () =>
      gender ? () => catalogUseCases.getCatalogFilterOptions(gender) : null,
    [gender],
  );
  return useAsyncData(load);
}
