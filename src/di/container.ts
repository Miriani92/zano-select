import {
  getGoogleIdToken,
  signOutOfGoogle,
} from '@/features/auth/data/api/google-sign-in';
import { createSupabaseAuthRepository } from '@/features/auth/data/repositories/supabase-auth-repository';
import { makeObserveAuthState } from '@/features/auth/domain/useCases/observe-auth-state';
import { makeSendEmailCode } from '@/features/auth/domain/useCases/send-email-code';
import { makeSignInWithGoogle } from '@/features/auth/domain/useCases/sign-in-with-google';
import { makeSignOut } from '@/features/auth/domain/useCases/sign-out';
import { makeVerifyEmailCode } from '@/features/auth/domain/useCases/verify-email-code';
import { supabase } from '@/infrastructure/supabase/client';

// Composition root: the only place that knows which implementation backs each repository.
const authRepository = createSupabaseAuthRepository(supabase, {
  getIdToken: getGoogleIdToken,
  signOut: signOutOfGoogle,
});

export const authUseCases = {
  auth: {
    sendEmailCode: makeSendEmailCode(authRepository),
    verifyEmailCode: makeVerifyEmailCode(authRepository),
    signInWithGoogle: makeSignInWithGoogle(authRepository),
    signOut: makeSignOut(authRepository),
    observeAuthState: makeObserveAuthState(authRepository),
  },
};
