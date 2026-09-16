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
  surface: '#F5F6F8',
  text: '#14171A',
  textSecondary: '#6B7280',
  border: '#E2E4E8',
  primary: '#208AEF',
  onPrimary: '#FFFFFF',
  disabled: '#C7CBD1',
  placeholder: '#9AA0A6',
  error: '#DC2626',
};

const dark: ColorTokens = {
  background: '#0B0D10',
  surface: '#1B1E23',
  text: '#F2F3F5',
  textSecondary: '#9AA0A6',
  border: '#2C2F36',
  primary: '#4FA8FF',
  onPrimary: '#0B1F33',
  disabled: '#3A3D42',
  placeholder: '#7A808A',
  error: '#F87171',
};

export function useColors(): ColorTokens {
  const scheme = useColorScheme();
  return scheme === 'dark' ? dark : light;
}
