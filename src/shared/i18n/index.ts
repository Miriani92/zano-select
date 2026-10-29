import AsyncStorage from '@react-native-async-storage/async-storage';
import { createInstance } from 'i18next';
import { initReactI18next } from 'react-i18next';

import { en } from './locales/en';
import { ka } from './locales/ka';

export const languages = ['ka', 'en'] as const;
export type Language = (typeof languages)[number];

// Georgian is the main market language, so it is the default and fallback.
export const defaultLanguage: Language = 'ka';

const STORAGE_KEY = 'app.language';

export const resources = {
  ka: { translation: ka },
  en: { translation: en },
} as const;

function isLanguage(value: string | null): value is Language {
  return languages.some((language) => language === value);
}

const i18n = createInstance();

i18n.use(initReactI18next).init({
  resources,
  lng: defaultLanguage,
  fallbackLng: defaultLanguage,
  supportedLngs: languages,
  interpolation: { escapeValue: false },
});

export async function restoreLanguage(): Promise<void> {
  try {
    const saved = await AsyncStorage.getItem(STORAGE_KEY);
    if (isLanguage(saved) && saved !== i18n.language) {
      await i18n.changeLanguage(saved);
    }
  } catch {
    console.error('restore language operation failed');
  }
}

export async function setLanguage(language: Language): Promise<void> {
  await i18n.changeLanguage(language);
  try {
    await AsyncStorage.setItem(STORAGE_KEY, language);
  } catch {
    console.error('change language operation failed');
  }
}

export { useTranslation, Trans } from 'react-i18next';
export default i18n;
