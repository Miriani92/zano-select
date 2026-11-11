import { useTranslation } from '@/shared/i18n';
import { ScreenPlaceholder } from '@/shared/ui';

// Placeholder until the home screen is designed.
export default function HomeRoute() {
  const { t } = useTranslation();
  return (
    <ScreenPlaceholder
      title={t('tabs.home')}
      message={t('common.comingSoon')}
    />
  );
}
