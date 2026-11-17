import { useEffect, useSyncExternalStore } from 'react';

import { catalogUseCases } from '@/di/container';
import type { Gender } from '@/features/catalog/domain/entities/gender';

// One choice for the whole app, so Home and Catalog always show the same gender.
let current: Gender | null = null;
let loading: Promise<void> | null = null;
const listeners = new Set<() => void>();

function publish(next: Gender) {
  current = next;
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function loadSaved() {
  loading ??= catalogUseCases.getGenderPreference().then((saved) => {
    // A tap that happened while reading wins over the saved value.
    if (current === null) publish(saved);
  });
}

/** `gender` is null until the saved choice is read, so screens don't load the wrong one first. */
export function useGenderPreference() {
  const gender = useSyncExternalStore(subscribe, () => current);

  useEffect(loadSaved, []);

  function setGender(next: Gender) {
    publish(next);
    catalogUseCases.setGenderPreference(next).catch(() => {
      // Not remembered for next launch; the switch still works now.
    });
  }

  return { gender, setGender };
}
