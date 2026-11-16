import { useMemo } from 'react';

import { catalogUseCases } from '@/di/container';
import type { Gender } from '@/features/catalog/domain/entities/gender';
import { useAsyncData } from '@/shared/hooks/use-async-data';

/** Waits while `gender` is null (the saved choice isn't read yet). */
export function useHomeFeed(gender: Gender | null) {
  const load = useMemo(
    () => (gender ? () => catalogUseCases.getHomeFeed(gender) : null),
    [gender],
  );
  return useAsyncData(load);
}
