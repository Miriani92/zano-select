import { Ionicons } from '@expo/vector-icons';
import { Pressable, View } from 'react-native';

import { useTranslation } from '@/shared/i18n';
import { radius, touchTarget, useColors } from '@/shared/theme';

const CIRCLE = 32;
const ICON_SIZE = 18;
const LARGE_ICON_SIZE = 20;

export interface WishlistHeartProps {
  saved: boolean;
  onPress: () => void;
  /** A full 44pt circle, for floating over the product screen's photo. */
  large?: boolean;
}

// 44pt touch target around a 32pt white circle, for the product photo corner.
export function WishlistHeart({
  saved,
  onPress,
  large = false,
}: WishlistHeartProps) {
  const colors = useColors();
  const { t } = useTranslation();
  const circle = large ? touchTarget : CIRCLE;

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
          width: circle,
          height: circle,
          borderRadius: radius.full,
          backgroundColor: colors.surface,
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 1px 3px rgba(31,29,27,0.12)',
        }}
      >
        <Ionicons
          name={saved ? 'heart' : 'heart-outline'}
          size={large ? LARGE_ICON_SIZE : ICON_SIZE}
          color={colors.text}
        />
      </View>
    </Pressable>
  );
}
