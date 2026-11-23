import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';

import { useTranslation } from '@/shared/i18n';
import { borderWidth, radius, spacing, useColors } from '@/shared/theme';
import { Button, ThemedText } from '@/shared/ui';

const ICON_CIRCLE = 88;
const ICON_SIZE = 40;

export interface CartEmptyProps {
  onStartShopping: () => void;
  onViewWishlist: () => void;
}

// Nothing in the cart: a bag, a hint, and ways into Catalog or Wishlist.
export function CartEmpty({ onStartShopping, onViewWishlist }: CartEmptyProps) {
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
          name="bag-handle-outline"
          size={ICON_SIZE}
          color={colors.textSecondary}
        />
      </View>
      <ThemedText
        variant="headline"
        accessibilityRole="header"
        style={{ textAlign: 'center' }}
      >
        {t('cart.empty.title')}
      </ThemedText>
      <ThemedText
        variant="bodyLong"
        color="textSecondary"
        style={{ textAlign: 'center' }}
      >
        {t('cart.empty.message')}
      </ThemedText>
      <View
        style={{ alignSelf: 'stretch', gap: spacing.ms, marginTop: spacing.sm }}
      >
        <Button
          size="lg"
          title={t('cart.empty.startShopping')}
          onPress={onStartShopping}
        />
        <Button
          size="lg"
          variant="outline"
          title={t('cart.empty.viewWishlist')}
          onPress={onViewWishlist}
        />
      </View>
    </View>
  );
}
