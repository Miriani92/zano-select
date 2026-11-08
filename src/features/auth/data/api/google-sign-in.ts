import { AuthError } from '@/features/auth/domain/entities/auth-error';

const webClientId = process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID;
const iosClientId = process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID;

type GoogleSdk = typeof import('@react-native-google-signin/google-signin');

let sdkPromise: Promise<GoogleSdk> | null = null;

/**
 * Loads and configures the SDK on first use. Loaded lazily so the app still
 * starts in Expo Go, which lacks the native module.
 */
function loadSdk(): Promise<GoogleSdk> {
  sdkPromise ??= import('@react-native-google-signin/google-signin').then(
    (sdk) => {
      sdk.GoogleSignin.configure({ webClientId, iosClientId });
      return sdk;
    },
  );
  sdkPromise.catch(() => {
    sdkPromise = null;
  });
  return sdkPromise;
}

/** Opens the native Google sheet and returns its ID token, or null if the user cancels. */
export async function getGoogleIdToken(): Promise<string | null> {
  if (!webClientId) {
    throw new AuthError(
      'googleUnavailable',
      'Missing EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID',
    );
  }

  let sdk: GoogleSdk;
  try {
    sdk = await loadSdk();
  } catch {
    throw new AuthError(
      'googleUnavailable',
      'Google Sign-In native module missing — use a development build, not Expo Go',
    );
  }
  const { GoogleSignin, isErrorWithCode, isSuccessResponse, statusCodes } = sdk;

  try {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    const response = await GoogleSignin.signIn();
    if (!isSuccessResponse(response)) return null;
    if (!response.data.idToken) {
      throw new AuthError('unknown', 'Google returned no ID token');
    }
    return response.data.idToken;
  } catch (e) {
    if (e instanceof AuthError) throw e;
    if (isErrorWithCode(e)) {
      if (e.code === statusCodes.SIGN_IN_CANCELLED) return null;
      if (e.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        throw new AuthError('googleUnavailable', e.message);
      }
    }
    throw new AuthError('unknown', e instanceof Error ? e.message : undefined);
  }
}

/** Clears Google's cached account so the next sign-in shows the account picker. */
export async function signOutOfGoogle(): Promise<void> {
  if (!sdkPromise) return;
  try {
    const { GoogleSignin } = await sdkPromise;
    await GoogleSignin.signOut();
  } catch {
    // Best effort: the Supabase session is what matters.
  }
}
