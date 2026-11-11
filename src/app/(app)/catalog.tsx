import { useTranslation } from '@/shared/i18n';
import { ScreenPlaceholder } from '@/shared/ui';

// Placeholder until the catalog feature exists.
export default function CatalogRoute() {
  const { t } = useTranslation();
  return (
    <ScreenPlaceholder
      title={t('tabs.catalog')}
      message={t('common.comingSoon')}
    />
  );
}
