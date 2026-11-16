import type { Language } from '@/shared/i18n';

// Text stored in every app language; the screen picks the one to show.
export type LocalizedText = Record<Language, string>;
