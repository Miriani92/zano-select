import type {
  ProfileListener,
  ProfileRepository,
} from '@/features/profile/domain/repositories/profile-repository';

// Emits the profile after every save, so screens already open stay current.
export function makeObserveProfile(repository: ProfileRepository) {
  return function observeProfile(listener: ProfileListener): () => void {
    return repository.onChange(listener);
  };
}
