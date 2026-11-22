import { View } from 'react-native';

import { fonts, radius, useColors } from '@/shared/theme';
import { ThemedText } from '@/shared/ui';

export interface ProfileAvatarProps {
  initials: string;
  size: number;
}

// A filled circle with the user's initials.
export function ProfileAvatar({ initials, size }: ProfileAvatarProps) {
  const colors = useColors();

  return (
    <View
      accessible={false}
      importantForAccessibility="no-hide-descendants"
      style={{
        width: size,
        height: size,
        borderRadius: radius.full,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <ThemedText
        style={{
          color: colors.onPrimary,
          fontFamily: fonts.semiBold,
          fontSize: Math.round(size * 0.36),
          lineHeight: Math.round(size * 0.48),
        }}
      >
        {initials}
      </ThemedText>
    </View>
  );
}
