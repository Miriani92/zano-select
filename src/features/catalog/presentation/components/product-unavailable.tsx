import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';

import { useTranslation } from '@/shared/i18n';
import { borderWidth, radius, spacing, useColors } from '@/shared/theme';
import { AccentRule, Button, ThemedText } from '@/shared/ui';

const ICON_CIRCLE = 64;
const ICON_SIZE = 28;

export interface ProductUnavailableProps {
  onBack: () => void;
}

// The product was sold out, deactivated or never existed (e.g. an old link).
export function ProductUnavailable({ onBack }: ProductUnavailableProps) {
  const colors = useColors();
  const { t } = useTranslation();

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: spacing.xl,
        alignItems: 'center',
        justifyContent: 'center',
        gap: spacing.ml,
      }}
    >
      <View
        style={{
          width: ICON_CIRCLE,
          height: ICON_CIRCLE,
          borderRadius: radius.full,
          borderWidth: borderWidth.thin,
          borderColor: colors.border,
          backgroundColor: colors.surface,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Ionicons
          name="pricetag-outline"
          size={ICON_SIZE}
          color={colors.primary}
        />
      </View>
      <View style={{ alignItems: 'center', gap: spacing.ms }}>
        <ThemedText
          variant="headlineLarge"
          accessibilityRole="header"
          style={{ textAlign: 'center' }}
        >
          {t('product.unavailable.title')}
        </ThemedText>
        <AccentRule />
        <ThemedText
          variant="bodyLong"
          color="textSecondary"
          style={{ textAlign: 'center' }}
        >
          {t('product.unavailable.message')}
        </ThemedText>
      </View>
      <Button
        size="lg"
        title={t('product.unavailable.back')}
        onPress={onBack}
        style={{ alignSelf: 'stretch', marginTop: spacing.sm }}
      />
    </View>
  );
}
