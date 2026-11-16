export const borderWidth = {
  /** Default outline and divider line. */
  thin: 1,
  /** Checkbox outline. */
  medium: 1.5,
  /** Focused field outline. */
  thick: 2,
} as const;

export type BorderWidthToken = keyof typeof borderWidth;
