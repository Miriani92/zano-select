import type { SupabaseClient } from '@supabase/supabase-js';

import {
  toProfile,
  toProfileDto,
  type ProfileDto,
} from '@/features/profile/data/dto/profile-dto';
import {
  EMPTY_PROFILE,
  type Profile,
} from '@/features/profile/domain/entities/profile';
import type {
  ProfileListener,
  ProfileRepository,
} from '@/features/profile/domain/repositories/profile-repository';

const COLUMNS = 'first_name, last_name, phone';

// Row-level security limits reads and writes to the signed-in user's own row.
// The row is created on the first save, so "no row" means an empty profile.
export function createSupabaseProfileRepository(
  client: SupabaseClient,
): ProfileRepository {
  const listeners = new Set<ProfileListener>();

  async function currentUserId(): Promise<string> {
    const { data } = await client.auth.getSession();
    const id = data.session?.user.id;
    if (!id) throw new Error('Not signed in');
    return id;
  }

  return {
    async getProfile() {
      const { data, error } = await client
        .from('profiles')
        .select(COLUMNS)
        .maybeSingle<ProfileDto>();
      if (error) throw new Error(error.message);
      return data ? toProfile(data) : EMPTY_PROFILE;
    },
    async updateProfile(profile: Profile) {
      const id = await currentUserId();
      const { data, error } = await client
        .from('profiles')
        .upsert({ id, ...toProfileDto(profile) }, { onConflict: 'id' })
        .select(COLUMNS)
        .single<ProfileDto>();
      if (error) throw new Error(error.message);
      const saved = toProfile(data);
      listeners.forEach((listener) => listener(saved));
      return saved;
    },
    onChange(listener) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
  };
}
