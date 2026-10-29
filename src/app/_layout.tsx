import { Stack } from 'expo-router';
import { useEffect } from 'react';

import { restoreLanguage } from '@/shared/i18n';

export default function RootLayout() {
  useEffect(() => {
    void restoreLanguage();
  }, []);

  return <Stack screenOptions={{ headerShown: false }} />;
}
