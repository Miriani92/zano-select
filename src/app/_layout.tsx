import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import {
  SessionProvider,
  useSession,
} from '@/features/auth/presentation/components/session-provider';
import { restoreLanguage } from '@/shared/i18n';
import { fontAssets } from '@/shared/theme';
// import AsyncStorage from '@react-native-async-storage/async-storage';

void SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <SessionProvider>
      <RootNavigator />
    </SessionProvider>
  );
}

function RootNavigator() {
  const [fontsLoaded, fontError] = useFonts(fontAssets);
  const { user, isGuest, isLoading } = useSession();
  const ready = (fontsLoaded || fontError !== null) && !isLoading;
  // AsyncStorage.removeItem('zano.guestMode');

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

  // The tabs are open to signed-in users and guests. The auth screens stay open to
  // anyone not signed in, so a guest can still sign in from Cart or Profile.
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={user !== null || isGuest} redirectTo="/welcome">
        <Stack.Screen name="(app)" />
      </Stack.Protected>
      <Stack.Protected guard={!user}>
        <Stack.Screen name="(auth)" />
      </Stack.Protected>
    </Stack>
  );
}
