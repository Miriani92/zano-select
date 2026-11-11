import { router } from 'expo-router';
import { useState } from 'react';

import { useSession } from '@/features/auth/presentation/components/session-provider';
import { useBrowseAsGuest } from '@/features/auth/presentation/hooks/use-browse-as-guest';
import { WelcomeScreen } from '@/features/auth/presentation/screens/welcome-screen';

export default function WelcomeRoute() {
  const { isGuest } = useSession();
  const { browseAsGuest } = useBrowseAsGuest();
  const [openedByGuest] = useState(isGuest);

  return (
    <WelcomeScreen
      onContinueWithEmail={() => router.push('/email')}
      onBrowseAsGuest={
        openedByGuest
          ? undefined
          : async () => {
              await browseAsGuest();
              router.replace('/');
            }
      }
      onClose={openedByGuest ? () => router.back() : undefined}
    />
  );
}
