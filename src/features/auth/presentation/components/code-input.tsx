import { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

import { radius, spacing, useColors } from '@/shared/theme';
import { ThemedText } from '@/shared/ui';

export interface CodeInputProps {
  value: string;
  onChange: (value: string) => void;
  length: number;
  accessibilityLabel: string;
  error?: boolean;
  editable?: boolean;
}

// One hidden TextInput drawn as separate boxes, so paste and iOS/Android
// one-time-code autofill work with no extra logic.
export function CodeInput({
  value,
  onChange,
  length,
  accessibilityLabel,
  error = false,
  editable = true,
}: CodeInputProps) {
  const colors = useColors();
  const [isFocused, setIsFocused] = useState(false);
  const digits = Array.from({ length }, (_, index) => value[index] ?? '');

  return (
    <View>
      <View
        style={{ flexDirection: 'row', gap: spacing.sm }}
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
      >
        {digits.map((digit, index) => {
          const isActive =
            isFocused && index === Math.min(value.length, length - 1);
          return (
            <View
              key={index}
              style={{
                flex: 1,
                height: 56,
                borderRadius: radius.md,
                borderWidth: isActive ? 2 : 1,
                borderColor: error
                  ? colors.error
                  : isActive
                    ? colors.primary
                    : colors.border,
                backgroundColor: colors.background,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ThemedText variant="headline">{digit}</ThemedText>
            </View>
          );
        })}
      </View>
      <TextInput
        value={value}
        onChangeText={(text) =>
          onChange(text.replace(/\D/g, '').slice(0, length))
        }
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        maxLength={length}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        autoComplete="one-time-code"
        autoFocus
        caretHidden
        editable={editable}
        accessibilityLabel={accessibilityLabel}
        style={[StyleSheet.absoluteFill, { opacity: 0 }]}
      />
    </View>
  );
}
