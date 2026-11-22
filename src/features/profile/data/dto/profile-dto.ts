import type { Profile } from '@/features/profile/domain/entities/profile';

// A row of public.profiles.
export interface ProfileDto {
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
}

export function toProfile(dto: ProfileDto): Profile {
  return {
    firstName: dto.first_name,
    lastName: dto.last_name,
    phone: dto.phone,
  };
}

export function toProfileDto(profile: Profile): ProfileDto {
  return {
    first_name: profile.firstName,
    last_name: profile.lastName,
    phone: profile.phone,
  };
}
