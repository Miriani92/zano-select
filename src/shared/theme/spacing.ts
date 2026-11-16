export const spacing = {
  xxs: 2,
  xs: 4,
  sm: 8,
  /** Between sm and md: gaps between cards and rail sections. */
  ms: 12,
  md: 16,
  /** Between md and lg: grid row gap, sheet content gap. */
  ml: 20,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export type SpacingToken = keyof typeof spacing;
