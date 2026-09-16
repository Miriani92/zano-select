import type { ReactNode } from 'react';
import {
  Pressable,
  type GestureResponderEvent,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import { radius, spacing, useColors } from '@/shared/theme';

export type IconButtonVariant = 'plain' | 'filled';
export type IconButtonSize = 'sm' | 'md' | 'lg';

const sizes: Record<IconButtonSize, number> = {
  sm: 32,
  md: 40,
  lg: 48,
};

export interface IconButtonProps {
  children: ReactNode;
  onPress?: (event: GestureResponderEvent) => void;
  accessibilityLabel: string;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

export function IconButton({
  children,
  onPress,
  accessibilityLabel,
  variant = 'plain',
  size = 'md',
  disabled = false,
  style,
}: IconButtonProps) {
  const colors = useColors();
  const dimension = sizes[size];

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      disabled={disabled}
      onPress={onPress}
      hitSlop={spacing.xs}
      style={({ pressed }) => [
        {
          width: dimension,
          height: dimension,
          borderRadius: radius.full,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor:
            variant === 'filled' ? colors.surface : 'transparent',
          opacity: disabled ? 0.4 : pressed ? 0.6 : 1,
        },
        style,
      ]}
    >
      {children}
    </Pressable>
  );
}
