import type { ReactNode } from 'react';
import { Pressable, View, type StyleProp, type ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { borderWidth, radius, spacing, useColors } from '@/shared/theme';

export interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  children?: ReactNode;
  disabled?: boolean;
  error?: boolean;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
}

const BOX_SIZE = 22;

export function Checkbox({
  checked,
  onChange,
  children,
  disabled = false,
  error = false,
  style,
  accessibilityLabel,
}: CheckboxProps) {
  const colors = useColors();

  const borderColor = error
    ? colors.error
    : checked
      ? colors.primary
      : colors.border;
  const backgroundColor = checked ? colors.primary : 'transparent';

  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityState={{ checked, disabled }}
      accessibilityLabel={accessibilityLabel}
      disabled={disabled}
      onPress={() => onChange(!checked)}
      style={({ pressed }) => [
        {
          flexDirection: 'row',
          alignItems: 'center',
          opacity: disabled ? 0.5 : pressed ? 0.7 : 1,
        },
        style,
      ]}
    >
      <View
        style={{
          width: BOX_SIZE,
          height: BOX_SIZE,
          borderRadius: radius.sm,
          borderWidth: borderWidth.medium,
          borderColor,
          backgroundColor,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {checked ? (
          <Ionicons name="checkmark" size={16} color={colors.onPrimary} />
        ) : null}
      </View>
      {children ? (
        <View style={{ marginLeft: spacing.sm, flex: 1 }}>{children}</View>
      ) : null}
    </Pressable>
  );
}
