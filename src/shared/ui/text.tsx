import { Text, type TextProps } from 'react-native';

import {
  type ColorTokens,
  type TypographyVariant,
  typography,
  useColors,
} from '@/shared/theme';

export interface ThemedTextProps extends TextProps {
  variant?: TypographyVariant;
  color?: keyof ColorTokens;
}

function defaultColorFor(
  variant: TypographyVariant,
  colors: ColorTokens,
): string {
  if (variant === 'error') return colors.error;
  if (variant === 'subhead' || variant === 'caption')
    return colors.textSecondary;
  return colors.text;
}

export function ThemedText({
  variant = 'body',
  color,
  style,
  ...props
}: ThemedTextProps) {
  const colors = useColors();
  const resolvedColor = color
    ? colors[color]
    : defaultColorFor(variant, colors);

  return (
    <Text
      style={[typography[variant], { color: resolvedColor }, style]}
      {...props}
    />
  );
}
