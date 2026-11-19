import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';

import { useTranslation } from '@/shared/i18n';
import { borderWidth, radius, spacing, useColors } from '@/shared/theme';
import { Button, ThemedText } from '@/shared/ui';

const ICON_CIRCLE = 88;
const ICON_SIZE = 40;

export interface WishlistEmptyProps {
  onStartShopping: () => void;
}

// Nothing saved yet: a heart, a hint, and a way into the Catalog.
export function WishlistEmpty({ onStartShopping }: WishlistEmptyProps) {
  const colors = useColors();
  const { t } = useTranslation();

  return (
    <View
      style={{
        flex: 1,
        padding: spacing.lg,
        alignItems: 'center',
        justifyContent: 'center',
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
          name="heart-outline"
          size={ICON_SIZE}
          color={colors.textSecondary}
        />
      </View>
      <ThemedText
        variant="headline"
        accessibilityRole="header"
        style={{ textAlign: 'center' }}
      >
        {t('wishlist.empty.title')}
      </ThemedText>
      <ThemedText
        variant="bodyLong"
        color="textSecondary"
        style={{ textAlign: 'center' }}
      >
        {t('wishlist.empty.message')}
      </ThemedText>
      <Button
        size="lg"
        title={t('wishlist.empty.startShopping')}
        onPress={onStartShopping}
        style={{ alignSelf: 'stretch', marginTop: spacing.sm }}
      />
    </View>
  );
}
