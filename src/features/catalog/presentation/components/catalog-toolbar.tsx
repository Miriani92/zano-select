import { Ionicons } from '@expo/vector-icons';
import type { ComponentProps, ReactNode } from 'react';
import { Pressable, View } from 'react-native';

import type { CatalogSort } from '@/features/catalog/domain/entities/catalog-query';
import { useTranslation } from '@/shared/i18n';
import { borderWidth, fonts, radius, spacing, useColors } from '@/shared/theme';
import { ThemedText } from '@/shared/ui';

const BUTTON_HEIGHT = 36;
const ICON_SIZE = 18;
const BADGE_SIZE = 20;

export interface CatalogToolbarProps {
  filterCount: number;
  sort: CatalogSort;
  /** Null while loading. */
  productCount: number | null;
  onOpenFilter: () => void;
  onOpenSort: () => void;
}

// "Filter (2)", "Sort: Newest" and the product count, above the grid.
export function CatalogToolbar({
  filterCount,
  sort,
  productCount,
  onOpenFilter,
  onOpenSort,
}: CatalogToolbarProps) {
  const colors = useColors();
  const { t } = useTranslation();

  return (
    <View
      style={{
        paddingHorizontal: spacing.lg,
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
      }}
    >
      <ToolbarButton
        icon="options-outline"
        label={t('catalog.filter')}
        accessibilityLabel={
          filterCount > 0
            ? `${t('catalog.filter')} (${filterCount})`
            : t('catalog.filter')
        }
        onPress={onOpenFilter}
      >
        {filterCount > 0 && (
          <View
            style={{
              minWidth: BADGE_SIZE,
              height: BADGE_SIZE,
              paddingHorizontal: spacing.xs,
              borderRadius: radius.full,
              backgroundColor: colors.primary,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ThemedText
              variant="caption"
              color="onPrimary"
              style={{ fontFamily: fonts.bold }}
            >
              {filterCount}
            </ThemedText>
          </View>
        )}
      </ToolbarButton>
      <ToolbarButton
        icon="swap-vertical"
        label={t(`catalog.sortsShort.${sort}`)}
        accessibilityLabel={`${t('catalog.sort')}: ${t(`catalog.sorts.${sort}`)}`}
        onPress={onOpenSort}
      />
      {productCount !== null && (
        <ThemedText variant="footnote" style={{ marginLeft: 'auto' }}>
          {t('catalog.productCount', { count: productCount })}
        </ThemedText>
      )}
    </View>
  );
}

interface ToolbarButtonProps {
  icon: ComponentProps<typeof Ionicons>['name'];
  label: string;
  accessibilityLabel: string;
  onPress: () => void;
  children?: ReactNode;
}

function ToolbarButton({
  icon,
  label,
  accessibilityLabel,
  onPress,
  children,
}: ToolbarButtonProps) {
  const colors = useColors();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      onPress={onPress}
      hitSlop={spacing.xs}
      style={({ pressed }) => ({
        height: BUTTON_HEIGHT,
        paddingHorizontal: spacing.ms,
        borderRadius: radius.md,
        borderWidth: borderWidth.thin,
        borderColor: colors.border,
        backgroundColor: colors.surface,
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
        opacity: pressed ? 0.7 : 1,
      })}
    >
      <Ionicons name={icon} size={ICON_SIZE} color={colors.text} />
      <ThemedText variant="link">{label}</ThemedText>
      {children}
    </Pressable>
  );
}
