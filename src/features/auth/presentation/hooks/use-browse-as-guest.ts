import { authUseCases } from '@/di/container';

export function useBrowseAsGuest() {
  return { browseAsGuest: authUseCases.auth.browseAsGuest };
}
