import type { User } from '@/features/auth/domain/entities/user';

export type AuthStateListener = (user: User | null) => void;

export interface AuthRepository {
  sendEmailCode(email: string): Promise<void>;
  verifyEmailCode(email: string, code: string): Promise<User>;
  signInWithGoogle(): Promise<User | null>;
  signOut(): Promise<void>;
  getCurrentUser(): Promise<User | null>;
  onAuthStateChange(listener: AuthStateListener): () => void;
}
