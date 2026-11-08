import { useState } from 'react';

import { authUseCases } from '@/di/container';
import type { AuthErrorCode } from '@/features/auth/domain/entities/auth-error';
import { toAuthErrorCode } from '@/features/auth/presentation/hooks/auth-error-code';

export function useVerifyEmailCode() {
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState<AuthErrorCode | null>(null);

  /** Resolves to true when the user is signed in. */
  async function verifyCode(email: string, code: string): Promise<boolean> {
    setIsVerifying(true);
    setError(null);
    try {
      await authUseCases.auth.verifyEmailCode(email, code);
      return true;
    } catch (e) {
      setError(toAuthErrorCode(e));
      return false;
    } finally {
      setIsVerifying(false);
    }
  }

  return { verifyCode, isVerifying, error, clearError: () => setError(null) };
}
