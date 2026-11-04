import { createSupabaseAuthRepository } from '@/features/auth/data/repositories/supabase-auth-repository';
import { makeObserveAuthState } from '@/features/auth/domain/useCases/observe-auth-state';
import { makeSendEmailCode } from '@/features/auth/domain/useCases/send-email-code';
import { makeSignOut } from '@/features/auth/domain/useCases/sign-out';
import { makeVerifyEmailCode } from '@/features/auth/domain/useCases/verify-email-code';
import { supabase } from '@/infrastructure/supabase/client';

// Composition root: the only place that knows which implementation backs each repository.
const authRepository = createSupabaseAuthRepository(supabase);

export const container = {
  auth: {
    sendEmailCode: makeSendEmailCode(authRepository),
    verifyEmailCode: makeVerifyEmailCode(authRepository),
    signOut: makeSignOut(authRepository),
    observeAuthState: makeObserveAuthState(authRepository),
  },
};
