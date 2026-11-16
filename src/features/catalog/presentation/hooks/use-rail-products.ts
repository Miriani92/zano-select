import { useMemo } from 'react';

import { catalogUseCases } from '@/di/container';
import type { Gender } from '@/features/catalog/domain/entities/gender';
import type { Rail } from '@/features/catalog/domain/entities/rail';
import { useAsyncData } from '@/shared/hooks/use-async-data';

/** All products of one rail, for the "See all" screen. */
export function useRailProducts(rail: Rail, gender: Gender) {
  const load = useMemo(
    () => () => catalogUseCases.getRailProducts(rail, gender),
    [rail, gender],
  );
  return useAsyncData(load);
}
