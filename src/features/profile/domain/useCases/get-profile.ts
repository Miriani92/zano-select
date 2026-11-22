import type { ProfileRepository } from '@/features/profile/domain/repositories/profile-repository';

export function makeGetProfile(repository: ProfileRepository) {
  return function getProfile() {
    return repository.getProfile();
  };
}
