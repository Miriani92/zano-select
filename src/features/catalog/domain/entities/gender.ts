// Which collection the shopper is browsing. Matches the `public.gender` enum in Supabase.
export const GENDERS = ['women', 'men'] as const;

export type Gender = (typeof GENDERS)[number];
