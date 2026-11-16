import { defaultLanguage, languages, useTranslation } from '@/shared/i18n';
import type { LocalizedText } from '@/shared/i18n/localized-text';

/** Picks the text for the current app language (Georgian by default). */
export function useLocalized() {
  const { i18n } = useTranslation();
  const language =
    languages.find((value) => value === i18n.language) ?? defaultLanguage;
  return (text: LocalizedText) => text[language];
}
