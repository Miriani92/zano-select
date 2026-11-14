import type { Gender } from '@/features/catalog/domain/entities/gender';

// Remembers whether the shopper last browsed Women or Men.
export interface GenderPreferenceRepository {
  /** Null when nothing was chosen yet. */
  get(): Promise<Gender | null>;
  set(gender: Gender): Promise<void>;
}
