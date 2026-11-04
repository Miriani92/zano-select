import type { AuthRepository } from '@/features/auth/domain/repositories/auth-repository';

export function makeSignOut(repository: AuthRepository) {
  return function signOut(): Promise<void> {
    return repository.signOut();
  };
}
