import { useState } from 'react';

import { authUseCases } from '@/di/container';
import type { AuthErrorCode } from '@/features/auth/domain/entities/auth-error';
import { toAuthErrorCode } from '@/features/auth/presentation/hooks/auth-error-code';

export function useSignInWithGoogle() {
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [error, setError] = useState<AuthErrorCode | null>(null);

  async function signIn(): Promise<boolean> {
    setIsSigningIn(true);
    setError(null);
    try {
      const user = await authUseCases.auth.signInWithGoogle();
      return user !== null;
    } catch (e) {
      setError(toAuthErrorCode(e));
      return false;
    } finally {
      setIsSigningIn(false);
    }
  }

  return { signIn, isSigningIn, error, clearError: () => setError(null) };
}
