import type { TextStyle } from 'react-native';

export type TypographyVariant =
  'title' | 'headline' | 'body' | 'subhead' | 'caption' | 'error';

export const typography: Record<TypographyVariant, TextStyle> = {
  title: { fontSize: 28, fontWeight: '700', lineHeight: 34 },
  headline: { fontSize: 20, fontWeight: '600', lineHeight: 26 },
  body: { fontSize: 16, fontWeight: '400', lineHeight: 22 },
  subhead: { fontSize: 14, fontWeight: '400', lineHeight: 20 },
  caption: { fontSize: 12, fontWeight: '400', lineHeight: 16 },
  error: { fontSize: 12, fontWeight: '500', lineHeight: 16 },
};
