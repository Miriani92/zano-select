import { AuthError } from '@/features/auth/domain/entities/auth-error';
import type { User } from '@/features/auth/domain/entities/user';
import type { AuthRepository } from '@/features/auth/domain/repositories/auth-repository';
import { normalizeEmail } from '@/features/auth/domain/useCases/send-email-code';

export const EMAIL_CODE_LENGTH = 6;

const CODE_PATTERN = new RegExp(`^\\d{${EMAIL_CODE_LENGTH}}$`);

export function isValidEmailCode(code: string): boolean {
  return CODE_PATTERN.test(code.trim());
}

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
