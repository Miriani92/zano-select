export type GuestModeListener = (isGuest: boolean) => void;

// Remembers that someone chose to browse without signing in.
export interface GuestModeRepository {
  isGuest(): Promise<boolean>;
  setGuest(isGuest: boolean): Promise<void>;
  onGuestModeChange(listener: GuestModeListener): () => void;
}
