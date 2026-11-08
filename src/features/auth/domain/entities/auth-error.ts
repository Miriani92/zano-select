export type AuthErrorCode =
  | 'invalidEmail'
  | 'invalidCode'
  | 'rateLimited'
  | 'network'
  | 'googleUnavailable'
  | 'unknown';

export class AuthError extends Error {
  readonly code: AuthErrorCode;

  constructor(code: AuthErrorCode, message?: string) {
    super(message ?? code);
    this.name = 'AuthError';
    this.code = code;
  }
}
