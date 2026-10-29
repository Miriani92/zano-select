import 'i18next';

import type { ka } from './locales/ka';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation';
    resources: { translation: typeof ka };
  }
}
