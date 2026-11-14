import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  GENDERS,
  type Gender,
} from '@/features/catalog/domain/entities/gender';
import type { GenderPreferenceRepository } from '@/features/catalog/domain/repositories/gender-preference-repository';

const STORAGE_KEY = 'zano.gender';

function isGender(value: string | null): value is Gender {
  return GENDERS.some((gender) => gender === value);
}

export function createAsyncStorageGenderPreferenceRepository(): GenderPreferenceRepository {
  return {
    async get() {
      const saved = await AsyncStorage.getItem(STORAGE_KEY);
      return isGender(saved) ? saved : null;
    },
    async set(gender) {
      await AsyncStorage.setItem(STORAGE_KEY, gender);
    },
  };
}
