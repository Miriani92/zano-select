import { useState, type ReactNode } from 'react';
import {
  TextInput,
  View,
  type StyleProp,
  type TextInputProps,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from '@/shared/i18n';
import { radius, spacing, useColors } from '@/shared/theme';
import { IconButton } from './icon-button';
import { ThemedText } from './text';

export type InputType = 'text' | 'email' | 'password' | 'phone' | 'number';

type DerivedInputBehavior = Pick<
  TextInputProps,
  'keyboardType' | 'autoCapitalize' | 'autoComplete' | 'secureTextEntry'
>;

function getBehavior(
  type: InputType,
  isPasswordVisible: boolean,
): DerivedInputBehavior {
  switch (type) {
    case 'email':
      return {
        keyboardType: 'email-address',
        autoCapitalize: 'none',
        autoComplete: 'email',
      };
    case 'password':
      return {
        autoCapitalize: 'none',
        autoComplete: 'password',
        secureTextEntry: !isPasswordVisible,
      };
    case 'phone':
      return { keyboardType: 'phone-pad', autoComplete: 'tel' };
    case 'number':
      return { keyboardType: 'number-pad' };
    default:
      return { autoCapitalize: 'sentences' };
  }
}

export interface InputProps extends Omit<
  TextInputProps,
  | 'secureTextEntry'
  | 'keyboardType'
  | 'autoCapitalize'
  | 'autoComplete'
  | 'style'
> {
  type?: InputType;
  label?: string;
  error?: string;
  helperText?: string;
  disabled?: boolean;
  rightAccessory?: ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<TextStyle>;
}

export function Input({
  type = 'text',
  label,
  error,
  helperText,
  disabled = false,
  rightAccessory,
  containerStyle,
  style,
  ...textInputProps
}: InputProps) {
  const colors = useColors();
  const { t } = useTranslation();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const behavior = getBehavior(type, isPasswordVisible);

  const accessory =
    rightAccessory ??
    (type === 'password' ? (
      <IconButton
        size="sm"
        accessibilityLabel={
          isPasswordVisible ? t('input.hidePassword') : t('input.showPassword')
        }
        onPress={() => setIsPasswordVisible((visible) => !visible)}
      >
        <Ionicons
          name={isPasswordVisible ? 'eye-off' : 'eye'}
          size={20}
          color={colors.textSecondary}
        />
      </IconButton>
    ) : null);

  return (
    <View style={containerStyle}>
      {label ? (
        <ThemedText variant="subhead" style={{ marginBottom: spacing.xs }}>
          {label}
        </ThemedText>
      ) : null}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: colors.surface,
          borderWidth: 1,
          borderColor: error ? colors.error : colors.border,
          borderRadius: radius.md,
          paddingHorizontal: spacing.md,
          opacity: disabled ? 0.6 : 1,
        }}
      >
        <TextInput
          editable={!disabled}
          placeholderTextColor={colors.placeholder}
          {...behavior}
          {...textInputProps}
          style={[
            {
              flex: 1,
              paddingVertical: spacing.sm,
              fontSize: 16,
              color: colors.text,
            },
            style,
          ]}
        />
        {accessory}
      </View>
      {error ? (
        <ThemedText variant="error" style={{ marginTop: spacing.xs }}>
          {error}
        </ThemedText>
      ) : helperText ? (
        <ThemedText variant="caption" style={{ marginTop: spacing.xs }}>
          {helperText}
        </ThemedText>
      ) : null}
    </View>
  );
}
