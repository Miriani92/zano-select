import type { User as SupabaseUser } from '@supabase/supabase-js';

import type { User } from '@/features/auth/domain/entities/user';

// Only the Supabase user fields the app relies on.
export type UserDto = Pick<SupabaseUser, 'id' | 'email'>;

export function toUser(dto: UserDto): User {
  return {
    id: dto.id,
    email: dto.email ?? null,
  };
}
