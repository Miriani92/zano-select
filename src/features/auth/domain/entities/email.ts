// Email and one-time-code rules shared by the email sign-in use cases.

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const EMAIL_CODE_LENGTH = 6;

const CODE_PATTERN = new RegExp(`^\\d{${EMAIL_CODE_LENGTH}}$`);

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function isValidEmail(email: string): boolean {
  return EMAIL_PATTERN.test(normalizeEmail(email));
}

export function isValidEmailCode(code: string): boolean {
  return CODE_PATTERN.test(code.trim());
}
