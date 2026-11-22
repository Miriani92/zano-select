import type { ReactNode } from 'react';
import {
  ActivityIndicator,
  Pressable,
  View,
  type GestureResponderEvent,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import {
  borderWidth,
  fonts,
  radius,
  spacing,
  touchTarget,
  useColors,
  type TypographyVariant,
} from '@/shared/theme';

import { ThemedText } from './text';

export type ButtonVariant = 'primary' | 'secondary' | 'outline';
export type ButtonSize = 'sm' | 'md' | 'lg';

const sizeStyles: Record<
  ButtonSize,
  {
    paddingVertical: number;
    paddingHorizontal: number;
    minHeight: number;
  }
> = {
  sm: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    minHeight: 36,
  },
  md: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    minHeight: touchTarget,
  },
  lg: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    minHeight: 52,
  },
};

// Title text grows with the button; md/sm stay close to body size.
const titleStyles: Record<
  ButtonSize,
  { variant: TypographyVariant; fontFamily?: string }
> = {
  sm: { variant: 'link' },
  md: { variant: 'body', fontFamily: fonts.semiBold },
  lg: { variant: 'headline' },
};

export interface ButtonProps {
  title: string;
  /** Shown before the title, e.g. an Ionicons element. */
  icon?: ReactNode;
  onPress: (event: GestureResponderEvent) => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
}

export function Button({
  title,
  icon,
  onPress,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  style,
  accessibilityLabel,
}: ButtonProps) {
  const colors = useColors();
  const isInactive = disabled || loading;

  const backgroundColor = isInactive
    ? colors.disabled
    : variant === 'primary'
      ? colors.primary
      : colors.surface;

  const textColor = isInactive
    ? colors.textSecondary
    : variant === 'primary'
      ? colors.onPrimary
      : colors.text;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? title}
      accessibilityState={{ disabled: isInactive, busy: loading }}
      disabled={isInactive}
      onPress={onPress}
      style={({ pressed }) => [
        {
          backgroundColor,
          borderRadius: radius.md,
          borderWidth: variant === 'outline' ? borderWidth.thin : 0,
          borderColor: colors.border,
          alignItems: 'center',
          justifyContent: 'center',
          opacity: pressed && !isInactive ? 0.8 : 1,
          ...sizeStyles[size],
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: spacing.sm,
          }}
        >
          {icon}
          <ThemedText
            variant={titleStyles[size].variant}
            style={[
              { color: textColor },
              titleStyles[size].fontFamily
                ? { fontFamily: titleStyles[size].fontFamily }
                : null,
            ]}
          >
            {title}
          </ThemedText>
        </View>
      )}
    </Pressable>
  );
}
