import { useColorScheme } from 'react-native';

export type ColorTokens = {
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
  primary: string;
  onPrimary: string;
  /** Gold brand accent: thin lines and small highlights only, never text or fills. */
  accent: string;
  disabled: string;
  placeholder: string;
  error: string;
  /** Sale badge background (e.g. "−55%"). */
  sale: string;
  onSale: string;
};

// From the "A · Ivory & Charcoal" artboard on the design canvas (see docs/design.md).
const light: ColorTokens = {
  background: '#F8FAFC',
  surface: '#FFFFFF',
  text: '#1F1D1B',
  textSecondary: '#6B655D',
  border: '#D9D1C3',
  primary: '#202923',
  onPrimary: '#F5F0E8',
  accent: '#B8975A',
  disabled: '#E2DBCF',
  placeholder: '#8A847B',
  error: '#A3321C',
  sale: '#9A3412',
  onSale: '#FFFFFF',
};

const dark: ColorTokens = {
  background: '#1A1C1B',
  surface: '#242826',
  text: '#F5F0E8',
  textSecondary: '#B5AEA3',
  border: '#3F4541',
  primary: '#F5F0E8',
  onPrimary: '#202923',
  accent: '#C9AC74',
  disabled: '#343936',
  placeholder: '#8A847B',
  error: '#F2876F',
  sale: '#C2410C',
  onSale: '#FFFFFF',
};

export function useColors(): ColorTokens {
  const scheme = useColorScheme();
  return scheme === 'dark' ? dark : light;
}
