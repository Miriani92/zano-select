import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Pressable, StyleSheet, View } from 'react-native';

import type { Banner } from '@/features/catalog/domain/entities/banner';
import { useLocalized } from '@/shared/i18n/use-localized';
import { useTranslation } from '@/shared/i18n';
import { radius, spacing, useColors } from '@/shared/theme';
import { AccentRule, ThemedText } from '@/shared/ui';

export const HERO_HEIGHT = 188;
export const HERO_RADIUS = radius.xl;
const TEXT_MAX_WIDTH = 240;
const CTA_ICON_SIZE = 16;

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
        height: HERO_HEIGHT,
        borderRadius: HERO_RADIUS,
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
        <View style={{ gap: spacing.ms, maxWidth: TEXT_MAX_WIDTH }}>
          <ThemedText variant="overline" color="accent">
            {localized(banner.eyebrow)}
          </ThemedText>
          <ThemedText variant="display" color="onPrimary" numberOfLines={2}>
            {title}
          </ThemedText>
          <AccentRule />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: spacing.sm,
          }}
        >
          <ThemedText variant="link" color="onPrimary">
            {t('home.bannerCta')}
          </ThemedText>
          <Ionicons
            name="arrow-forward"
            size={CTA_ICON_SIZE}
            color={colors.onPrimary}
          />
        </View>
      </View>
    </Pressable>
  );
}
