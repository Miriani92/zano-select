import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';

import { useTranslation } from '@/shared/i18n';
import { borderWidth, radius, spacing, useColors } from '@/shared/theme';
import { Button, ThemedText } from '@/shared/ui';

const ICON_CIRCLE = 72;
const ICON_SIZE = 30;

export interface NoResultsProps {
  onClearFilters: () => void;
}

// The Catalog's filters match no product.
export function NoResults({ onClearFilters }: NoResultsProps) {
  const colors = useColors();
  const { t } = useTranslation();

  return (
    <View
      style={{
        paddingHorizontal: spacing.xl,
        paddingVertical: spacing.xxl,
        alignItems: 'center',
        gap: spacing.md,
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
          name="search-outline"
          size={ICON_SIZE}
          color={colors.textSecondary}
        />
      </View>
      <ThemedText
        variant="headline"
        accessibilityRole="header"
        style={{ textAlign: 'center' }}
      >
        {t('catalog.noResults.title')}
      </ThemedText>
      <ThemedText
        variant="bodyLong"
        color="textSecondary"
        style={{ textAlign: 'center' }}
      >
        {t('catalog.noResults.message')}
      </ThemedText>
      <Button
        size="lg"
        variant="outline"
        title={t('catalog.noResults.clear')}
        onPress={onClearFilters}
        style={{ marginTop: spacing.sm }}
      />
    </View>
  );
}
