import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Pressable, StyleSheet, View } from 'react-native';

import type { Banner } from '@/features/catalog/domain/entities/banner';
import { useLocalized } from '@/features/catalog/presentation/hooks/use-localized';
import { useTranslation } from '@/shared/i18n';
import { fonts, spacing, useColors } from '@/shared/theme';
import { ThemedText } from '@/shared/ui';

export interface HeroBannerProps {
  banner: Banner;
  onPress: (banner: Banner) => void;
}

// The sale banner at the top of Home.
export function HeroBanner({ banner, onPress }: HeroBannerProps) {
  const colors = useColors();
  const { t } = useTranslation();
  const localized = useLocalized();
  const title = localized(banner.title);

  return (
    <Pressable
      accessibilityRole="link"
      accessibilityLabel={`${localized(banner.eyebrow)}. ${title}`}
      onPress={() => onPress(banner)}
      style={({ pressed }) => ({
        height: 188,
        borderRadius: 20,
        overflow: 'hidden',
        backgroundColor: colors.primary,
        opacity: pressed ? 0.9 : 1,
      })}
    >
      {banner.imageUrl && (
        <>
          <Image
            source={{ uri: banner.imageUrl }}
            contentFit="cover"
            transition={200}
            style={StyleSheet.absoluteFill}
          />
          {/* Keeps the text readable on any photo. */}
          <View
            style={[
              StyleSheet.absoluteFill,
              { backgroundColor: 'rgba(0,0,0,0.3)' },
            ]}
          />
        </>
      )}
      <View
        style={{
          flex: 1,
          padding: spacing.lg,
          justifyContent: 'space-between',
        }}
      >
        <View style={{ gap: 10, maxWidth: 240 }}>
          <ThemedText
            style={{
              fontSize: 12,
              lineHeight: 16,
              letterSpacing: 1,
              fontFamily: fonts.semiBold,
              color: colors.accent,
            }}
          >
            {localized(banner.eyebrow)}
          </ThemedText>
          <ThemedText
            numberOfLines={2}
            style={{
              fontSize: 26,
              lineHeight: 32,
              fontFamily: fonts.bold,
              color: colors.onPrimary,
            }}
          >
            {title}
          </ThemedText>
          <View
            style={{ width: 40, height: 1, backgroundColor: colors.accent }}
          />
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <ThemedText
            style={{
              fontSize: 14,
              lineHeight: 20,
              fontFamily: fonts.semiBold,
              color: colors.onPrimary,
            }}
          >
            {t('home.bannerCta')}
          </ThemedText>
          <Ionicons name="arrow-forward" size={16} color={colors.onPrimary} />
        </View>
      </View>
    </Pressable>
  );
}
