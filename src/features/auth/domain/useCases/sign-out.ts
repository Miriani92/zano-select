import type { AuthRepository } from '@/features/auth/domain/repositories/auth-repository';
import type { GuestModeRepository } from '@/features/auth/domain/repositories/guest-mode-repository';

export function makeSignOut(
  repository: AuthRepository,
  guestMode: GuestModeRepository,
) {
  return async function signOut(): Promise<void> {
    await guestMode.setGuest(false);
    await repository.signOut();
  };
}
