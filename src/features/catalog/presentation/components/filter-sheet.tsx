import { useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';

import {
  NO_FILTERS,
  type BrandCount,
  type CatalogFilters,
} from '@/features/catalog/domain/entities/catalog-query';
import type { Category } from '@/features/catalog/domain/entities/category';
import type { Gender } from '@/features/catalog/domain/entities/gender';
import { FilterPill } from '@/features/catalog/presentation/components/filter-pill';
import { useCatalogCount } from '@/features/catalog/presentation/hooks/use-catalog-count';
import { useTranslation } from '@/shared/i18n';
import { useLocalized } from '@/shared/i18n/use-localized';
import { borderWidth, spacing, touchTarget, useColors } from '@/shared/theme';
import { BottomSheet, Button, Checkbox, ThemedText } from '@/shared/ui';

export interface FilterSheetProps {
  visible: boolean;
  gender: Gender;
  categories: Category[];
  brands: BrandCount[];
  /** The filters on screen now; the sheet edits a copy until "Show". */
  applied: CatalogFilters;
  onApply: (filters: CatalogFilters) => void;
  onDismiss: () => void;
}

function toggled(list: string[], value: string): string[] {
  return list.includes(value)
    ? list.filter((item) => item !== value)
    : [...list, value];
}

/**
 * Category and brand choices. Remount it (a new `key`) each time it opens,
 * so the draft starts from what is applied.
 */
export function FilterSheet({
  visible,
  gender,
  categories,
  brands,
  applied,
  onApply,
  onDismiss,
}: FilterSheetProps) {
  const colors = useColors();
  const { t } = useTranslation();
  const localized = useLocalized();
  const [draft, setDraft] = useState<CatalogFilters>(applied);
  const count = useCatalogCount(visible ? gender : null, draft);

  return (
    <BottomSheet
      visible={visible}
      onDismiss={onDismiss}
      accessibilityLabel={t('catalog.filter')}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <ThemedText variant="headlineLarge" accessibilityRole="header">
          {t('catalog.filter')}
        </ThemedText>
        <Pressable
          accessibilityRole="button"
          onPress={() => setDraft(NO_FILTERS)}
          hitSlop={spacing.sm}
          style={({ pressed }) => ({
            minHeight: touchTarget,
            justifyContent: 'center',
            opacity: pressed ? 0.6 : 1,
          })}
        >
          <ThemedText variant="link" color="textSecondary">
            {t('catalog.filterSheet.clear')}
          </ThemedText>
        </Pressable>
      </View>

      <ScrollView
        style={{ flexShrink: 1 }}
        contentContainerStyle={{ gap: spacing.lg }}
      >
        <View style={{ gap: spacing.ms }}>
          <ThemedText variant="overline" accessibilityRole="header">
            {t('catalog.filterSheet.category')}
          </ThemedText>
          <View
            style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm }}
          >
            {categories.map((category) => (
              <FilterPill
                key={category.id}
                label={localized(category.name)}
                selected={draft.categoryIds.includes(category.id)}
                onPress={() =>
                  setDraft((current) => ({
                    ...current,
                    categoryIds: toggled(current.categoryIds, category.id),
                  }))
                }
              />
            ))}
          </View>
        </View>

        <View style={{ gap: spacing.xs }}>
          <ThemedText variant="overline" accessibilityRole="header">
            {t('catalog.filterSheet.brand')}
          </ThemedText>
          {brands.map(({ brand, count: brandCount }) => (
            <Checkbox
              key={brand}
              checked={draft.brands.includes(brand)}
              onChange={() =>
                setDraft((current) => ({
                  ...current,
                  brands: toggled(current.brands, brand),
                }))
              }
              accessibilityLabel={brand}
              style={{
                minHeight: touchTarget,
                borderBottomWidth: borderWidth.thin,
                borderBottomColor: colors.border,
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  gap: spacing.sm,
                }}
              >
                <ThemedText variant="body" style={{ flexShrink: 1 }}>
                  {brand}
                </ThemedText>
                <ThemedText variant="footnote">{brandCount}</ThemedText>
              </View>
            </Checkbox>
          ))}
        </View>
      </ScrollView>

      <Button
        size="lg"
        title={
          count === null
            ? t('catalog.filterSheet.showLoading')
            : t('catalog.filterSheet.show', { count })
        }
        onPress={() => onApply(draft)}
      />
    </BottomSheet>
  );
}
