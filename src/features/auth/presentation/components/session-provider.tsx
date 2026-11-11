import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import { authUseCases } from '@/di/container';
import type { User } from '@/features/auth/domain/entities/user';

interface Session {
  user: User | null;
  isGuest: boolean;
  isLoading: boolean;
}

const SessionContext = createContext<Session | null>(null);

export function SessionProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isGuest, setIsGuest] = useState(false);
  const [authLoaded, setAuthLoaded] = useState(false);
  const [guestLoaded, setGuestLoaded] = useState(false);

  useEffect(
    () =>
      authUseCases.auth.observeAuthState((next) => {
        setUser(next);
        setAuthLoaded(true);
      }),
    [],
  );

  useEffect(
    () =>
      authUseCases.auth.observeGuestMode((next) => {
        setIsGuest(next);
        setGuestLoaded(true);
      }),
    [],
  );

  const value = useMemo(
    () => ({ user, isGuest, isLoading: !authLoaded || !guestLoaded }),
    [user, isGuest, authLoaded, guestLoaded],
  );

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
}

export function useSession(): Session {
  const session = useContext(SessionContext);
  if (!session) {
    throw new Error('useSession must be used inside SessionProvider');
  }
  return session;
}
