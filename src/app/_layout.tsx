import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { useAuthState } from '@/features/auth/presentation/hooks/use-auth-state';
import { restoreLanguage } from '@/shared/i18n';
import { fontAssets } from '@/shared/theme';

// Keep the splash screen up until fonts and the stored session are ready,
// so text never flashes in the system font and signed-in users never see the welcome screen.
void SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts(fontAssets);
  const { user, isLoading } = useAuthState();
  const ready = (fontsLoaded || fontError !== null) && !isLoading;

  useEffect(() => {
    void restoreLanguage();
  }, []);

  useEffect(() => {
    if (ready) {
      void SplashScreen.hideAsync();
    }
  }, [ready]);

  if (!ready) {
    return null;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={user !== null}>
        <Stack.Screen name="(app)" />
      </Stack.Protected>
      <Stack.Protected guard={!user}>
        <Stack.Screen name="(auth)" />
      </Stack.Protected>
    </Stack>
  );
}
