import { AuthError } from '@/features/auth/domain/entities/auth-error';
import type { AuthRepository } from '@/features/auth/domain/repositories/auth-repository';
import {
  isValidEmail,
  normalizeEmail,
} from '@/features/auth/domain/entities/email';

export function makeSendEmailCode(repository: AuthRepository) {
  return async function sendEmailCode(email: string): Promise<void> {
    if (!isValidEmail(email)) {
      throw new AuthError('invalidEmail');
    }
    await repository.sendEmailCode(normalizeEmail(email));
  };
}
