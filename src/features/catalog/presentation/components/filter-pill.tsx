import { Pressable } from 'react-native';

import { borderWidth, fonts, radius, spacing, useColors } from '@/shared/theme';
import { ThemedText } from '@/shared/ui';

const PILL_HEIGHT = 36;

export interface FilterPillProps {
  label: string;
  selected: boolean;
  onPress: () => void;
}

// A rounded on/off choice: category chips on Catalog and in the filter sheet.
export function FilterPill({ label, selected, onPress }: FilterPillProps) {
  const colors = useColors();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      onPress={onPress}
      style={({ pressed }) => ({
        height: PILL_HEIGHT,
        paddingHorizontal: spacing.md,
        borderRadius: radius.full,
        borderWidth: borderWidth.thin,
        borderColor: selected ? colors.primary : colors.border,
        backgroundColor: selected ? colors.primary : colors.surface,
        justifyContent: 'center',
        opacity: pressed ? 0.7 : 1,
      })}
    >
      <ThemedText
        variant="subhead"
        color={selected ? 'onPrimary' : 'text'}
        style={{ fontFamily: fonts.medium }}
      >
        {label}
      </ThemedText>
    </Pressable>
  );
}
