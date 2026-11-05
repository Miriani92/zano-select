import { Redirect, router, useLocalSearchParams } from 'expo-router';

import { CodeEntryScreen } from '@/features/auth/presentation/screens/code-entry-screen';

export default function VerifyRoute() {
  const { email } = useLocalSearchParams<{ email?: string }>();

  if (!email) {
    return <Redirect href="/email" />;
  }

  return <CodeEntryScreen email={email} onBack={() => router.back()} />;
}
