// The product rows on Home; each one also has a "See all" screen.
export const RAILS = ['discounts', 'newest'] as const;

export type Rail = (typeof RAILS)[number];

export function isRail(value: string): value is Rail {
  return RAILS.some((rail) => rail === value);
}
