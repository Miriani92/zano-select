import type { GuestModeRepository } from '@/features/auth/domain/repositories/guest-mode-repository';

export function makeBrowseAsGuest(repository: GuestModeRepository) {
  return function browseAsGuest(): Promise<void> {
    return repository.setGuest(true);
  };
}
