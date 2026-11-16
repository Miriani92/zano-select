import { Ionicons } from '@expo/vector-icons';
import { Pressable, View } from 'react-native';

import { useTranslation } from '@/shared/i18n';
import { radius, touchTarget, useColors } from '@/shared/theme';

const CIRCLE = 32;
const ICON_SIZE = 18;

export interface WishlistHeartProps {
  saved: boolean;
  onPress: () => void;
}

// 44pt touch target around a 32pt white circle, for the product photo corner.
export function WishlistHeart({ saved, onPress }: WishlistHeartProps) {
  const colors = useColors();
  const { t } = useTranslation();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={t('home.wishlist')}
      accessibilityState={{ selected: saved }}
      onPress={onPress}
      style={({ pressed }) => ({
        width: touchTarget,
        height: touchTarget,
        alignItems: 'center',
        justifyContent: 'center',
        opacity: pressed ? 0.7 : 1,
      })}
    >
      <View
        style={{
          width: CIRCLE,
          height: CIRCLE,
          borderRadius: radius.full,
          backgroundColor: colors.surface,
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 1px 3px rgba(31,29,27,0.12)',
        }}
      >
        <Ionicons
          name={saved ? 'heart' : 'heart-outline'}
          size={ICON_SIZE}
          color={colors.text}
        />
      </View>
    </Pressable>
  );
}
