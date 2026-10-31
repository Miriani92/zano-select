import type { TextStyle } from 'react-native';

import { fonts } from './fonts';

export type TypographyVariant =
  'title' | 'headline' | 'body' | 'subhead' | 'caption' | 'error';

export const typography: Record<TypographyVariant, TextStyle> = {
  title: { fontSize: 28, fontFamily: fonts.bold, lineHeight: 34 },
  headline: { fontSize: 20, fontFamily: fonts.semiBold, lineHeight: 26 },
  body: { fontSize: 16, fontFamily: fonts.regular, lineHeight: 22 },
  subhead: { fontSize: 14, fontFamily: fonts.regular, lineHeight: 20 },
  caption: { fontSize: 12, fontFamily: fonts.regular, lineHeight: 16 },
  error: { fontSize: 12, fontFamily: fonts.medium, lineHeight: 16 },
};
