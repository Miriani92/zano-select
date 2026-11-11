import type {
  GuestModeListener,
  GuestModeRepository,
} from '@/features/auth/domain/repositories/guest-mode-repository';

// Emits the stored value once, then every change. Returns an unsubscribe function.
export function makeObserveGuestMode(repository: GuestModeRepository) {
  return function observeGuestMode(listener: GuestModeListener): () => void {
    let active = true;
    const unsubscribe = repository.onGuestModeChange((isGuest) => {
      if (active) listener(isGuest);
    });

    repository
      .isGuest()
      .then((isGuest) => {
        if (active) listener(isGuest);
      })
      .catch(() => {
        if (active) listener(false);
      });

    return () => {
      active = false;
      unsubscribe();
    };
  };
}
