import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Pressable, ScrollView, View } from 'react-native';

import type { Category } from '@/features/catalog/domain/entities/category';
import { useLocalized } from '@/shared/i18n/use-localized';
import { fonts, spacing, useColors } from '@/shared/theme';
import { ThemedText } from '@/shared/ui';

export interface CategoryChipsProps {
  categories: Category[];
  onPress: (category: Category) => void;
}

const CIRCLE = 64;

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
            width: 72,
            alignItems: 'center',
            gap: spacing.sm,
            opacity: pressed ? 0.6 : 1,
          })}
        >
          <View
            style={{
              width: CIRCLE,
              height: CIRCLE,
              borderRadius: CIRCLE / 2,
              overflow: 'hidden',
              borderWidth: 1,
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
                style={{ width: CIRCLE, height: CIRCLE }}
              />
            ) : (
              <Ionicons
                name="pricetag-outline"
                size={22}
                color={colors.textSecondary}
              />
            )}
          </View>
          <ThemedText
            numberOfLines={2}
            style={{
              fontSize: 12,
              lineHeight: 16,
              fontFamily: fonts.medium,
              textAlign: 'center',
            }}
          >
            {localized(category.name)}
          </ThemedText>
        </Pressable>
      ))}
    </ScrollView>
  );
}
