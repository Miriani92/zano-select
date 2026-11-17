import { Pressable, View } from 'react-native';

import {
  CATALOG_SORTS,
  type CatalogSort,
} from '@/features/catalog/domain/entities/catalog-query';
import { useTranslation } from '@/shared/i18n';
import {
  borderWidth,
  fonts,
  radius,
  spacing,
  touchTarget,
  useColors,
} from '@/shared/theme';
import { BottomSheet, ThemedText } from '@/shared/ui';

const RADIO_SIZE = 22;
/** A thick ring reads as a filled radio dot. */
const RADIO_SELECTED_RING = 7;

export interface SortSheetProps {
  visible: boolean;
  value: CatalogSort;
  onChange: (sort: CatalogSort) => void;
  onDismiss: () => void;
}

// Picking a sort order applies it and closes the sheet.
export function SortSheet({
  visible,
  value,
  onChange,
  onDismiss,
}: SortSheetProps) {
  const colors = useColors();
  const { t } = useTranslation();

  return (
    <BottomSheet
      visible={visible}
      onDismiss={onDismiss}
      accessibilityLabel={t('catalog.sort')}
    >
      <ThemedText variant="headlineLarge" accessibilityRole="header">
        {t('catalog.sort')}
      </ThemedText>
      <View accessibilityRole="radiogroup">
        {CATALOG_SORTS.map((sort) => {
          const selected = sort === value;
          return (
            <Pressable
              key={sort}
              accessibilityRole="radio"
              accessibilityState={{ checked: selected }}
              onPress={() => onChange(sort)}
              style={({ pressed }) => ({
                minHeight: touchTarget,
                paddingVertical: spacing.ms,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottomWidth: borderWidth.thin,
                borderBottomColor: colors.border,
                opacity: pressed ? 0.7 : 1,
              })}
            >
              <ThemedText
                variant="body"
                style={selected && { fontFamily: fonts.semiBold }}
              >
                {t(`catalog.sorts.${sort}`)}
              </ThemedText>
              <View
                style={{
                  width: RADIO_SIZE,
                  height: RADIO_SIZE,
                  borderRadius: radius.full,
                  borderWidth: selected
                    ? RADIO_SELECTED_RING
                    : borderWidth.medium,
                  borderColor: selected ? colors.primary : colors.border,
                  backgroundColor: colors.surface,
                }}
              />
            </Pressable>
          );
        })}
      </View>
    </BottomSheet>
  );
}
