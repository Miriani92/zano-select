import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useTranslation } from '@/shared/i18n';
import { borderWidth, spacing, useColors } from '@/shared/theme';
import { Button } from '@/shared/ui';

const CHECK_ICON_SIZE = 20;

export interface AddToCartBarProps {
  added: boolean;
  onAdd: () => void;
}

// Pinned to the bottom of the product screen, above the home indicator.
export function AddToCartBar({ added, onAdd }: AddToCartBarProps) {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();

  return (
    <View
      style={{
        paddingTop: spacing.ms,
        paddingHorizontal: spacing.lg,
        paddingBottom: Math.max(insets.bottom, spacing.ms),
        backgroundColor: colors.surface,
        borderTopWidth: borderWidth.thin,
        borderTopColor: colors.border,
      }}
    >
      <Button
        size="lg"
        title={added ? t('product.addedToCart') : t('product.addToCart')}
        icon={
          added && (
            <Ionicons
              name="checkmark"
              size={CHECK_ICON_SIZE}
              color={colors.onPrimary}
            />
          )
        }
        onPress={onAdd}
      />
    </View>
  );
}
