import { Pressable, View } from 'react-native';

import {
  languages,
  setLanguage,
  useTranslation,
  type Language,
} from '@/shared/i18n';
import { borderWidth, radius, spacing, useColors } from '@/shared/theme';
import { BottomSheet, Button, ThemedText } from '@/shared/ui';

const OPTION_HEIGHT = 56;
const RADIO_SIZE = 22;
const RADIO_DOT = 10;

export interface LanguageSheetProps {
  visible: boolean;
  onDismiss: () => void;
}

// Pick ქართული or English; the app switches at once and remembers the choice.
export function LanguageSheet({ visible, onDismiss }: LanguageSheetProps) {
  const colors = useColors();
  const { t, i18n } = useTranslation();
  const current = i18n.language as Language;

  return (
    <BottomSheet
      visible={visible}
      onDismiss={onDismiss}
      accessibilityLabel={t('profile.languageSheet.title')}
    >
      <ThemedText variant="headline" accessibilityRole="header">
        {t('profile.languageSheet.title')}
      </ThemedText>
      <View accessibilityRole="radiogroup" style={{ gap: spacing.sm }}>
        {languages.map((language) => {
          const selected = language === current;
          const tint = selected ? colors.primary : colors.border;
          return (
            <Pressable
              key={language}
              accessibilityRole="radio"
              accessibilityState={{ checked: selected }}
              onPress={() => void setLanguage(language)}
              style={{
                minHeight: OPTION_HEIGHT,
                paddingHorizontal: spacing.md,
                borderRadius: radius.md,
                borderWidth: borderWidth.thin,
                borderColor: tint,
                backgroundColor: colors.surface,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <ThemedText variant="body">
                {t(`profile.languages.${language}`)}
              </ThemedText>
              <View
                style={{
                  width: RADIO_SIZE,
                  height: RADIO_SIZE,
                  borderRadius: radius.full,
                  borderWidth: 2,
                  borderColor: tint,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {selected && (
                  <View
                    style={{
                      width: RADIO_DOT,
                      height: RADIO_DOT,
                      borderRadius: radius.full,
                      backgroundColor: colors.primary,
                    }}
                  />
                )}
              </View>
            </Pressable>
          );
        })}
      </View>
      <Button
        size="lg"
        title={t('profile.languageSheet.done')}
        onPress={onDismiss}
      />
    </BottomSheet>
  );
}
