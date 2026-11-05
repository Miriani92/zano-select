import { router } from 'expo-router';

import { EmailEntryScreen } from '@/features/auth/presentation/screens/email-entry-screen';

export default function EmailRoute() {
  return (
    <EmailEntryScreen
      onBack={() => router.back()}
      onCodeSent={(email) =>
        router.push({ pathname: '/verify', params: { email } })
      }
    />
  );
}
