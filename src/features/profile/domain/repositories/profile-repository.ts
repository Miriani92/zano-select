import type { Profile } from '@/features/profile/domain/entities/profile';

export type ProfileListener = (profile: Profile) => void;

// The signed-in user's own profile. Guests have none.
export interface ProfileRepository {
  /** EMPTY_PROFILE when the user hasn't saved one yet. */
  getProfile(): Promise<Profile>;
  updateProfile(profile: Profile): Promise<Profile>;
  onChange(listener: ProfileListener): () => void;
}
