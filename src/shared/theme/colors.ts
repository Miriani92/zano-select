import { useColorScheme } from 'react-native';

export type ColorTokens = {
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
  primary: string;
  onPrimary: string;
  disabled: string;
  placeholder: string;
  error: string;
};

const light: ColorTokens = {
  background: '#FFFFFF',
  surface: '#F4F5F2',
  text: '#16181A',
  textSecondary: '#5B6168',
  border: '#C9CDD1',
  primary: '#0F6B4F',
  onPrimary: '#FFFFFF',
  disabled: '#D5D8DB',
  placeholder: '#7A8087',
  error: '#A3321C',
};

const dark: ColorTokens = {
  background: '#0B0D10',
  surface: '#1A1D1B',
  text: '#F2F3F5',
  textSecondary: '#A3A9AF',
  border: '#3A3F44',
  primary: '#4CC79A',
  onPrimary: '#04261A',
  disabled: '#3A3D42',
  placeholder: '#7A808A',
  error: '#F2876F',
};

export function useColors(): ColorTokens {
  const scheme = useColorScheme();
  return scheme === 'dark' ? dark : light;
}
