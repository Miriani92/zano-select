import { useEffect, useState } from 'react';

import { authUseCases } from '@/di/container';
import type { User } from '@/features/auth/domain/entities/user';

interface AuthState {
  user: User | null;
  isLoading: boolean;
}

export function useAuthState(): AuthState {
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: true,
  });

  useEffect(
    () =>
      authUseCases.auth.observeAuthState((user) =>
        setState({ user, isLoading: false }),
      ),
    [],
  );

  return state;
}
