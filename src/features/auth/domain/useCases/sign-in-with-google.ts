import type { User } from '@/features/auth/domain/entities/user';
import type { AuthRepository } from '@/features/auth/domain/repositories/auth-repository';

export function makeSignInWithGoogle(repository: AuthRepository) {
  return function signInWithGoogle(): Promise<User | null> {
    return repository.signInWithGoogle();
  };
}
