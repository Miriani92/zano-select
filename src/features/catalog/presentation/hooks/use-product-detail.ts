import { useMemo } from 'react';

import { catalogUseCases } from '@/di/container';
import { useAsyncData } from '@/shared/hooks/use-async-data';

/** One product for its detail screen; `data` is null when it's gone. */
export function useProductDetail(id: string) {
  const load = useMemo(() => () => catalogUseCases.getProductDetail(id), [id]);
  return useAsyncData(load);
}
