import type { TextStyle } from 'react-native';

import { fonts } from './fonts';

export type TypographyVariant =
  | 'title'
  | 'display'
  | 'headlineLarge'
  | 'headline'
  | 'sectionTitle'
  | 'body'
  | 'bodyLong'
  | 'label'
  | 'price'
  | 'subhead'
  | 'link'
  | 'footnote'
  | 'caption'
  | 'overline'
  | 'error';

export const typography: Record<TypographyVariant, TextStyle> = {
  title: { fontSize: 28, fontFamily: fonts.bold, lineHeight: 34 },
  /** Banner headline over a photo. */
  display: { fontSize: 26, fontFamily: fonts.bold, lineHeight: 32 },
  headlineLarge: { fontSize: 22, fontFamily: fonts.semiBold, lineHeight: 28 },
  headline: { fontSize: 20, fontFamily: fonts.semiBold, lineHeight: 26 },
  /** Rail and screen-header titles. */
  sectionTitle: { fontSize: 18, fontFamily: fonts.bold, lineHeight: 24 },
  body: { fontSize: 16, fontFamily: fonts.regular, lineHeight: 22 },
  /** Multi-line explanatory paragraphs. */
  bodyLong: { fontSize: 15, fontFamily: fonts.regular, lineHeight: 23 },
  /** Segmented-control and tab labels. */
  label: { fontSize: 15, fontFamily: fonts.medium, lineHeight: 20 },
  price: { fontSize: 15, fontFamily: fonts.bold, lineHeight: 20 },
  subhead: { fontSize: 14, fontFamily: fonts.regular, lineHeight: 20 },
  /** Inline text actions ("See all", banner CTA). */
  link: { fontSize: 14, fontFamily: fonts.semiBold, lineHeight: 20 },
  footnote: { fontSize: 13, fontFamily: fonts.regular, lineHeight: 18 },
  caption: { fontSize: 12, fontFamily: fonts.regular, lineHeight: 16 },
  /** Small uppercase kicker (brand name, banner eyebrow). */
  overline: {
    fontSize: 11,
    fontFamily: fonts.semiBold,
    lineHeight: 14,
    letterSpacing: 0.8,
  },
  error: { fontSize: 12, fontFamily: fonts.medium, lineHeight: 16 },
};
