import {
  AuthError,
  type AuthErrorCode,
} from '@/features/auth/domain/entities/auth-error';

export function toAuthErrorCode(error: unknown): AuthErrorCode {
  return error instanceof AuthError ? error.code : 'unknown';
}
