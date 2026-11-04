import type {
  AuthRepository,
  AuthStateListener,
} from '@/features/auth/domain/repositories/auth-repository';

// Emits the current user once, then every change. Returns an unsubscribe function.
export function makeObserveAuthState(repository: AuthRepository) {
  return function observeAuthState(listener: AuthStateListener): () => void {
    let active = true;
    const unsubscribe = repository.onAuthStateChange((user) => {
      if (active) listener(user);
    });

    repository
      .getCurrentUser()
      .then((user) => {
        if (active) listener(user);
      })
      .catch(() => {
        if (active) listener(null);
      });

    return () => {
      active = false;
      unsubscribe();
    };
  };
}
