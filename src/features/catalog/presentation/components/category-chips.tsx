import { Ionicons } from '@expo/vector-icons';
import type { ComponentProps } from 'react';
import { Image } from 'expo-image';
import { Pressable, ScrollView, View } from 'react-native';

import type { Category } from '@/features/catalog/domain/entities/category';
import { useLocalized } from '@/shared/i18n/use-localized';
import { borderWidth, fonts, spacing, useColors } from '@/shared/theme';
import { ThemedText } from '@/shared/ui';

export interface CategoryChipsProps {
  categories: Category[];
  onPress: (category: Category) => void;
}

export const CHIP_WIDTH = 72;
export const CHIP_CIRCLE = 64;
const PLACEHOLDER_ICON_SIZE = 22;

type IconName = ComponentProps<typeof Ionicons>['name'];

/** Shown when a category has no photo; unknown slugs fall back to a tag. */
const CATEGORY_ICONS: Record<string, IconName> = {
  clothing: 'shirt-outline',
  shoes: 'footsteps-outline',
  bags: 'bag-handle-outline',
  accessories: 'watch-outline',
};
const FALLBACK_ICON: IconName = 'pricetag-outline';

// Horizontal row of round category photos with labels.
export function CategoryChips({ categories, onPress }: CategoryChipsProps) {
  const colors = useColors();
  const localized = useLocalized();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: spacing.lg, gap: spacing.md }}
    >
      {categories.map((category) => (
        <Pressable
          key={category.id}
          accessibilityRole="button"
          onPress={() => onPress(category)}
          style={({ pressed }) => ({
            width: CHIP_WIDTH,
            alignItems: 'center',
            gap: spacing.sm,
            opacity: pressed ? 0.6 : 1,
          })}
        >
          <View
            style={{
              width: CHIP_CIRCLE,
              height: CHIP_CIRCLE,
              borderRadius: CHIP_CIRCLE / 2,
              overflow: 'hidden',
              borderWidth: borderWidth.thin,
              borderColor: colors.border,
              backgroundColor: colors.surface,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {category.imageUrl ? (
              <Image
                source={{ uri: category.imageUrl }}
                contentFit="cover"
                transition={200}
                style={{ width: CHIP_CIRCLE, height: CHIP_CIRCLE }}
              />
            ) : (
              <Ionicons
                name={CATEGORY_ICONS[category.slug] ?? FALLBACK_ICON}
                size={PLACEHOLDER_ICON_SIZE}
                color={colors.textSecondary}
              />
            )}
          </View>
          <ThemedText
            numberOfLines={2}
            variant="caption"
            color="text"
            style={{ fontFamily: fonts.medium, textAlign: 'center' }}
          >
            {localized(category.name)}
          </ThemedText>
        </Pressable>
      ))}
    </ScrollView>
  );
}
