import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useState } from 'react';
import { FlatList, useWindowDimensions, View } from 'react-native';

import { useTranslation } from '@/shared/i18n';
import { borderWidth, radius, spacing, useColors } from '@/shared/theme';

export const GALLERY_HEIGHT = 480;
const PLACEHOLDER_ICON_SIZE = 48;
const DOT = 6;
const ACTIVE_DOT_WIDTH = 18;

export interface ProductGalleryProps {
  imageUrls: string[];
}

// Full-width photos, swiped one at a time, with dots for the current one.
export function ProductGallery({ imageUrls }: ProductGalleryProps) {
  const colors = useColors();
  const { t } = useTranslation();
  const { width } = useWindowDimensions();
  const [index, setIndex] = useState(0);

  if (imageUrls.length === 0) {
    return (
      <View
        style={{
          height: GALLERY_HEIGHT,
          backgroundColor: colors.surface,
          borderBottomWidth: borderWidth.thin,
          borderBottomColor: colors.border,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Ionicons
          name="shirt-outline"
          size={PLACEHOLDER_ICON_SIZE}
          color={colors.border}
        />
      </View>
    );
  }

  return (
    <View
      style={{
        height: GALLERY_HEIGHT,
        backgroundColor: colors.surface,
        borderBottomWidth: borderWidth.thin,
        borderBottomColor: colors.border,
      }}
    >
      <FlatList
        horizontal
        pagingEnabled
        data={imageUrls}
        keyExtractor={(url) => url}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) =>
          setIndex(Math.round(event.nativeEvent.contentOffset.x / width))
        }
        renderItem={({ item, index: position }) => (
          <Image
            source={{ uri: item }}
            contentFit="cover"
            transition={200}
            accessibilityRole="image"
            accessibilityLabel={t('product.photo', {
              index: position + 1,
              count: imageUrls.length,
            })}
            style={{ width, height: GALLERY_HEIGHT }}
          />
        )}
      />
      {imageUrls.length > 1 && (
        <View
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: spacing.md,
            flexDirection: 'row',
            justifyContent: 'center',
            gap: spacing.xs + spacing.xxs,
          }}
        >
          {imageUrls.map((url, position) => (
            <View
              key={url}
              style={{
                width: position === index ? ACTIVE_DOT_WIDTH : DOT,
                height: DOT,
                borderRadius: radius.full,
                backgroundColor:
                  position === index ? colors.primary : colors.border,
              }}
            />
          ))}
        </View>
      )}
    </View>
  );
}
