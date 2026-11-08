import { useState } from 'react';

import { authUseCases } from '@/di/container';
import type { AuthErrorCode } from '@/features/auth/domain/entities/auth-error';
import { toAuthErrorCode } from '@/features/auth/presentation/hooks/auth-error-code';

export function useSendEmailCode() {
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<AuthErrorCode | null>(null);

  /** Resolves to true when the code was sent. */
  async function sendCode(email: string): Promise<boolean> {
    setIsSending(true);
    setError(null);
    try {
      await authUseCases.auth.sendEmailCode(email);
      return true;
    } catch (e) {
      setError(toAuthErrorCode(e));
      return false;
    } finally {
      setIsSending(false);
    }
  }

  return { sendCode, isSending, error, clearError: () => setError(null) };
}
