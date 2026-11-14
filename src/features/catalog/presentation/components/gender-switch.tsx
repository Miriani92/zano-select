import { Pressable, View } from 'react-native';

import {
  GENDERS,
  type Gender,
} from '@/features/catalog/domain/entities/gender';
import { useTranslation } from '@/shared/i18n';
import { fonts, useColors } from '@/shared/theme';
import { ThemedText } from '@/shared/ui';

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
        gap: 4,
        padding: 4,
        borderRadius: 14,
        borderWidth: 1,
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
              height: 40,
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: selected ? colors.primary : 'transparent',
            }}
          >
            <ThemedText
              style={{
                fontSize: 15,
                lineHeight: 20,
                fontFamily: selected ? fonts.semiBold : fonts.medium,
                color: selected ? colors.onPrimary : colors.textSecondary,
              }}
            >
              {t(`home.gender.${gender}`)}
            </ThemedText>
          </Pressable>
        );
      })}
    </View>
  );
}
