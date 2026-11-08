import type { ConfigContext, ExpoConfig } from 'expo/config';

// Extends app.json. The Google plugin needs the iOS client ID reversed as a URL scheme:
// "123-abc.apps.googleusercontent.com" -> "com.googleusercontent.apps.123-abc".
const iosClientId = process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID;
const iosUrlScheme = iosClientId
  ? `com.googleusercontent.apps.${iosClientId.replace('.apps.googleusercontent.com', '')}`
  : undefined;

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...(config as ExpoConfig),
  plugins: [
    ...(config.plugins ?? []),
    // Skipped until the iOS client ID is set, so Expo Go and web keep working.
    ...(iosUrlScheme
      ? [
          ['@react-native-google-signin/google-signin', { iosUrlScheme }] as [
            string,
            object,
          ],
        ]
      : []),
  ],
});
