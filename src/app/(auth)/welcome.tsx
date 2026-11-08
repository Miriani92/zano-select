import { router } from 'expo-router';
import { WelcomeScreen } from '@/features/auth/presentation/screens/welcome-screen';

export default function WelcomeRoute() {
  return <WelcomeScreen onContinueWithEmail={() => router.push('/email')} />;
}
