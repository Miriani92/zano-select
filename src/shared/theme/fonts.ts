import {
  NotoSansGeorgian_400Regular,
  NotoSansGeorgian_500Medium,
  NotoSansGeorgian_600SemiBold,
  NotoSansGeorgian_700Bold,
  NotoSansGeorgian_800ExtraBold,
} from '@expo-google-fonts/noto-sans-georgian';

// Noto Sans Georgian covers both Georgian and Latin, so one family serves every language.
// Custom fonts need one family per weight; fontWeight alone does not switch files on Android.
export const fonts = {
  regular: 'NotoSansGeorgian_400Regular',
  medium: 'NotoSansGeorgian_500Medium',
  semiBold: 'NotoSansGeorgian_600SemiBold',
  bold: 'NotoSansGeorgian_700Bold',
  extraBold: 'NotoSansGeorgian_800ExtraBold',
} as const;

export type FontToken = keyof typeof fonts;

// Passed to useFonts in the root layout.
export const fontAssets = {
  [fonts.regular]: NotoSansGeorgian_400Regular,
  [fonts.medium]: NotoSansGeorgian_500Medium,
  [fonts.semiBold]: NotoSansGeorgian_600SemiBold,
  [fonts.bold]: NotoSansGeorgian_700Bold,
  [fonts.extraBold]: NotoSansGeorgian_800ExtraBold,
};
