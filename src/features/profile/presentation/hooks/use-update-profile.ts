import { useState } from 'react';

import { profileUseCases } from '@/di/container';
import {
  ProfileError,
  type Profile,
  type ProfileErrorCode,
} from '@/features/profile/domain/entities/profile';

export type UpdateProfileError = ProfileErrorCode | 'unknown';

export function useUpdateProfile() {
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<UpdateProfileError | null>(null);

  /** Resolves true when saved. */
  async function save(profile: Profile): Promise<boolean> {
    setIsSaving(true);
    setError(null);
    try {
      await profileUseCases.updateProfile(profile);
      return true;
    } catch (e) {
      setError(e instanceof ProfileError ? e.code : 'unknown');
      return false;
    } finally {
      setIsSaving(false);
    }
  }

  return { save, isSaving, error, clearError: () => setError(null) };
}
