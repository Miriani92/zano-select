import type { LocalizedText } from '@/features/catalog/domain/entities/category';
import { useTranslation } from '@/shared/i18n';

/** Picks the text for the current app language (Georgian by default). */
export function useLocalized() {
  const { i18n } = useTranslation();
  const language = i18n.language === 'en' ? 'en' : 'ka';
  return (text: LocalizedText) => text[language];
}
