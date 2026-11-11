import AsyncStorage from '@react-native-async-storage/async-storage';

import type {
  GuestModeListener,
  GuestModeRepository,
} from '@/features/auth/domain/repositories/guest-mode-repository';

const STORAGE_KEY = 'zano.guestMode';

export function createAsyncStorageGuestModeRepository(): GuestModeRepository {
  const listeners = new Set<GuestModeListener>();

  return {
    async isGuest() {
      return (await AsyncStorage.getItem(STORAGE_KEY)) === 'true';
    },
    async setGuest(isGuest) {
      listeners.forEach((listener) => listener(isGuest));
      if (isGuest) {
        await AsyncStorage.setItem(STORAGE_KEY, 'true');
      } else {
        await AsyncStorage.removeItem(STORAGE_KEY);
      }
    },
    onGuestModeChange(listener) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
  };
}
