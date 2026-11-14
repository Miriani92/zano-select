import type { Gender } from '@/features/catalog/domain/entities/gender';
import type { GenderPreferenceRepository } from '@/features/catalog/domain/repositories/gender-preference-repository';

/** Shown until the shopper picks one. */
export const DEFAULT_GENDER: Gender = 'women';

export function makeGetGenderPreference(
  repository: GenderPreferenceRepository,
) {
  return async function getGenderPreference(): Promise<Gender> {
    try {
      return (await repository.get()) ?? DEFAULT_GENDER;
    } catch {
      return DEFAULT_GENDER;
    }
  };
}

export function makeSetGenderPreference(
  repository: GenderPreferenceRepository,
) {
  return function setGenderPreference(gender: Gender): Promise<void> {
    return repository.set(gender);
  };
}
