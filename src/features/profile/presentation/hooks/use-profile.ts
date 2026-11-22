import { useEffect, useMemo, useState } from 'react';

import { profileUseCases } from '@/di/container';
import type { Profile } from '@/features/profile/domain/entities/profile';
import { useAsyncData } from '@/shared/hooks/use-async-data';

/**
 * The signed-in user's profile. Loads again when the user changes, and picks up
 * saves from the Edit profile screen without a refetch.
 */
export function useProfile(userId: string) {
  const load = useMemo(
    () => () => profileUseCases.getProfile(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [userId],
  );
  const result = useAsyncData(load);
  const [saved, setSaved] = useState<{ load: typeof load; profile: Profile }>();

  useEffect(
    () =>
      profileUseCases.observeProfile((profile) => setSaved({ load, profile })),
    [load],
  );

  const latest = saved?.load === load ? saved.profile : null;
  return {
    ...result,
    data: result.status === 'ready' ? (latest ?? result.data) : null,
  };
}
