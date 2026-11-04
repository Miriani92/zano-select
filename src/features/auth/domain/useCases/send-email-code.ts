import { AuthError } from '@/features/auth/domain/entities/auth-error';
import type { AuthRepository } from '@/features/auth/domain/repositories/auth-repository';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function isValidEmail(email: string): boolean {
  return EMAIL_PATTERN.test(normalizeEmail(email));
}

export function makeSendEmailCode(repository: AuthRepository) {
  return async function sendEmailCode(email: string): Promise<void> {
    if (!isValidEmail(email)) {
      throw new AuthError('invalidEmail');
    }
    await repository.sendEmailCode(normalizeEmail(email));
  };
}
