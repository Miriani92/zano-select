import {
  isValidPhone,
  ProfileError,
  type Profile,
} from '@/features/profile/domain/entities/profile';
import type { ProfileRepository } from '@/features/profile/domain/repositories/profile-repository';

// Blank fields are stored as null.
function clean(value: string | null): string | null {
  const trimmed = value?.trim() ?? '';
  return trimmed || null;
}

// Trims every field and rejects a malformed phone with ProfileError('invalidPhone').
export function makeUpdateProfile(repository: ProfileRepository) {
  return function updateProfile(profile: Profile): Promise<Profile> {
    const next: Profile = {
      firstName: clean(profile.firstName),
      lastName: clean(profile.lastName),
      phone: clean(profile.phone),
    };
    if (next.phone && !isValidPhone(next.phone)) {
      return Promise.reject(new ProfileError('invalidPhone'));
    }
    return repository.updateProfile(next);
  };
}
