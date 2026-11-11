import {
  getGoogleIdToken,
  signOutOfGoogle,
} from '@/features/auth/data/api/google-sign-in';
import { createAsyncStorageGuestModeRepository } from '@/features/auth/data/repositories/async-storage-guest-mode-repository';
import { createSupabaseAuthRepository } from '@/features/auth/data/repositories/supabase-auth-repository';
import { makeBrowseAsGuest } from '@/features/auth/domain/useCases/browse-as-guest';
import { makeObserveAuthState } from '@/features/auth/domain/useCases/observe-auth-state';
import { makeObserveGuestMode } from '@/features/auth/domain/useCases/observe-guest-mode';
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

const guestModeRepository = createAsyncStorageGuestModeRepository();

export const authUseCases = {
  auth: {
    sendEmailCode: makeSendEmailCode(authRepository),
    verifyEmailCode: makeVerifyEmailCode(authRepository),
    signInWithGoogle: makeSignInWithGoogle(authRepository),
    signOut: makeSignOut(authRepository, guestModeRepository),
    observeAuthState: makeObserveAuthState(authRepository),
    browseAsGuest: makeBrowseAsGuest(guestModeRepository),
    observeGuestMode: makeObserveGuestMode(guestModeRepository),
  },
};
