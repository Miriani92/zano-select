import { useState } from 'react';

import { authUseCases } from '@/di/container';
import type { AuthErrorCode } from '@/features/auth/domain/entities/auth-error';
import { toAuthErrorCode } from '@/features/auth/presentation/hooks/auth-error-code';

export function useSignOut() {
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [error, setError] = useState<AuthErrorCode | null>(null);

  // On success the root layout's session guard switches to the signed-out routes.
  async function signOut(): Promise<void> {
    setIsSigningOut(true);
    setError(null);
    try {
      await authUseCases.auth.signOut();
    } catch (e) {
      setError(toAuthErrorCode(e));
    } finally {
      setIsSigningOut(false);
    }
  }

  return { signOut, isSigningOut, error };
}
