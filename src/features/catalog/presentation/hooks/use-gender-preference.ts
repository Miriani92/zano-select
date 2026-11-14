import { useEffect, useState } from 'react';

import { catalogUseCases } from '@/di/container';
import type { Gender } from '@/features/catalog/domain/entities/gender';

/** `gender` is null until the saved choice is read, so Home doesn't load the wrong one first. */
export function useGenderPreference() {
  const [gender, setGenderState] = useState<Gender | null>(null);

  useEffect(() => {
    let active = true;
    void catalogUseCases.getGenderPreference().then((saved) => {
      if (active) setGenderState((current) => current ?? saved);
    });
    return () => {
      active = false;
    };
  }, []);

  function setGender(next: Gender) {
    setGenderState(next);
    catalogUseCases.setGenderPreference(next).catch(() => {
      // Not remembered for next launch; the switch still works now.
    });
  }

  return { gender, setGender };
}
