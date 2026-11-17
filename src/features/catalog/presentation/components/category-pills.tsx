import { ScrollView } from 'react-native';

import type { Category } from '@/features/catalog/domain/entities/category';
import { FilterPill } from '@/features/catalog/presentation/components/filter-pill';
import { useTranslation } from '@/shared/i18n';
import { useLocalized } from '@/shared/i18n/use-localized';
import { spacing } from '@/shared/theme';

export interface CategoryPillsProps {
  categories: Category[];
  /** Empty means "All". */
  selectedIds: string[];
  /** `null` picks "All". */
  onSelect: (categoryId: string | null) => void;
}

// "All" + one pill per category, scrolling sideways. A tap shows only that category.
export function CategoryPills({
  categories,
  selectedIds,
  onSelect,
}: CategoryPillsProps) {
  const { t } = useTranslation();
  const localized = useLocalized();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: spacing.lg, gap: spacing.sm }}
    >
      <FilterPill
        label={t('catalog.all')}
        selected={selectedIds.length === 0}
        onPress={() => onSelect(null)}
      />
      {categories.map((category) => (
        <FilterPill
          key={category.id}
          label={localized(category.name)}
          selected={selectedIds.includes(category.id)}
          onPress={() => onSelect(category.id)}
        />
      ))}
    </ScrollView>
  );
}
