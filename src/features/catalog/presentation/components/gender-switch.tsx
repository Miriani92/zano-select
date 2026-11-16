import { Pressable, View } from 'react-native';

import {
  GENDERS,
  type Gender,
} from '@/features/catalog/domain/entities/gender';
import { useTranslation } from '@/shared/i18n';
import { borderWidth, fonts, radius, spacing, useColors } from '@/shared/theme';
import { ThemedText } from '@/shared/ui';

const SEGMENT_HEIGHT = 40;

export interface GenderSwitchProps {
  value: Gender;
  onChange: (gender: Gender) => void;
}

// Women / Men segmented control at the top of Home.
export function GenderSwitch({ value, onChange }: GenderSwitchProps) {
  const colors = useColors();
  const { t } = useTranslation();

  return (
    <View
      accessibilityRole="tablist"
      style={{
        flexDirection: 'row',
        gap: spacing.xs,
        padding: spacing.xs,
        borderRadius: radius.lg,
        borderWidth: borderWidth.thin,
        borderColor: colors.border,
        backgroundColor: colors.surface,
      }}
    >
      {GENDERS.map((gender) => {
        const selected = gender === value;
        return (
          <Pressable
            key={gender}
            accessibilityRole="tab"
            accessibilityState={{ selected }}
            onPress={() => {
              if (!selected) onChange(gender);
            }}
            style={{
              flex: 1,
              height: SEGMENT_HEIGHT,
              borderRadius: radius.md,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: selected ? colors.primary : 'transparent',
            }}
          >
            <ThemedText
              variant="label"
              color={selected ? 'onPrimary' : 'textSecondary'}
              style={selected && { fontFamily: fonts.semiBold }}
            >
              {t(`home.gender.${gender}`)}
            </ThemedText>
          </Pressable>
        );
      })}
    </View>
  );
}
