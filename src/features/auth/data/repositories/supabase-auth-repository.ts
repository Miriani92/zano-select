import {
  isAuthApiError,
  isAuthRetryableFetchError,
  type SupabaseClient,
} from '@supabase/supabase-js';

import { toUser } from '@/features/auth/data/dto/user-dto';
import {
  AuthError,
  type AuthErrorCode,
} from '@/features/auth/domain/entities/auth-error';
import type { AuthRepository } from '@/features/auth/domain/repositories/auth-repository';

function codeFor(error: unknown): AuthErrorCode {
  if (isAuthRetryableFetchError(error)) return 'network';
  if (!isAuthApiError(error)) return 'unknown';

  switch (error.code) {
    case 'otp_expired':
      return 'invalidCode';
    case 'email_address_invalid':
    case 'validation_failed':
      return 'invalidEmail';
    case 'over_email_send_rate_limit':
    case 'over_request_rate_limit':
      return 'rateLimited';
    default:
      return 'unknown';
  }
}

function toAuthError(error: unknown): AuthError {
  const message = error instanceof Error ? error.message : undefined;
  return new AuthError(codeFor(error), message);
}

export interface GoogleAuthProvider {
  /** Returns a Google ID token, or null if the user cancels. */
  getIdToken(): Promise<string | null>;
  signOut(): Promise<void>;
}

export function createSupabaseAuthRepository(
  client: SupabaseClient,
  google: GoogleAuthProvider,
): AuthRepository {
  return {
    async signInWithGoogle() {
      const idToken = await google.getIdToken();
      if (!idToken) return null;
      const { data, error } = await client.auth.signInWithIdToken({
        provider: 'google',
        token: idToken,
      });
      if (error) throw toAuthError(error);
      if (!data.user) throw new AuthError('unknown', 'No user after Google');
      return toUser(data.user);
    },

    async sendEmailCode(email) {
      const { error } = await client.auth.signInWithOtp({
        email,
        options: { shouldCreateUser: true },
      });
      if (error) throw toAuthError(error);
    },

    async verifyEmailCode(email, code) {
      const { data, error } = await client.auth.verifyOtp({
        email,
        token: code,
        type: 'email',
      });
      if (error) throw toAuthError(error);
      if (!data.user) throw new AuthError('unknown', 'No user after verify');
      return toUser(data.user);
    },

    async signOut() {
      const { error } = await client.auth.signOut();
      if (error) throw toAuthError(error);
      await google.signOut();
    },

    async getCurrentUser() {
      // Reads the stored session; no network call.
      const { data, error } = await client.auth.getSession();
      if (error) throw toAuthError(error);
      return data.session ? toUser(data.session.user) : null;
    },

    onAuthStateChange(listener) {
      const { data } = client.auth.onAuthStateChange((_event, session) => {
        listener(session ? toUser(session.user) : null);
      });
      return () => data.subscription.unsubscribe();
    },
  };
}
