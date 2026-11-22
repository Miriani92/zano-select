export interface Profile {
  firstName: string | null;
  lastName: string | null;
  phone: string | null;
}

export const EMPTY_PROFILE: Profile = {
  firstName: null,
  lastName: null,
  phone: null,
};

export function profileDisplayName(profile: Profile): string | null {
  const name = [profile.firstName, profile.lastName]
    .map((part) => part?.trim())
    .filter(Boolean)
    .join(' ');
  return name || null;
}

export function profileInitials(
  profile: Profile,
  email: string | null,
): string {
  const fromName = [profile.firstName, profile.lastName]
    .map((part) => part?.trim().charAt(0) ?? '')
    .join('');
  const initials = fromName || email?.trim().charAt(0) || '?';
  return initials.toUpperCase();
}

// Digits with optional "+", spaces, dashes or brackets; 9 to 15 digits in all.
const PHONE_CHARS = /^\+?[\d\s()-]+$/;
const PHONE_MIN_DIGITS = 9;
const PHONE_MAX_DIGITS = 15;

export function isValidPhone(phone: string): boolean {
  const trimmed = phone.trim();
  if (!PHONE_CHARS.test(trimmed)) return false;
  const digits = trimmed.replace(/\D/g, '').length;
  return digits >= PHONE_MIN_DIGITS && digits <= PHONE_MAX_DIGITS;
}

export type ProfileErrorCode = 'invalidPhone';

export class ProfileError extends Error {
  readonly code: ProfileErrorCode;

  constructor(code: ProfileErrorCode) {
    super(code);
    this.name = 'ProfileError';
    this.code = code;
  }
}
