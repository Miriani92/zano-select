import { AuthError } from '@/features/auth/domain/entities/auth-error';
import type { User } from '@/features/auth/domain/entities/user';
import type { AuthRepository } from '@/features/auth/domain/repositories/auth-repository';
import {
  isValidEmailCode,
  normalizeEmail,
} from '@/features/auth/domain/entities/email';

export function makeVerifyEmailCode(repository: AuthRepository) {
  return async function verifyEmailCode(
    email: string,
    code: string,
  ): Promise<User> {
    if (!isValidEmailCode(code)) {
      throw new AuthError('invalidCode');
    }
    return repository.verifyEmailCode(normalizeEmail(email), code.trim());
  };
}
