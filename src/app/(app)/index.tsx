import { router } from 'expo-router';

import { HomeScreen } from '@/features/catalog/presentation/screens/home-screen';

export default function HomeRoute() {
  return (
    <HomeScreen
      // "See all" gets its own screen in the next step.
      onSeeAll={() => {}}
      // The Catalog tab doesn't filter by category yet.
      onCategory={() => router.navigate('/catalog')}
      onSignIn={() => router.push('/welcome')}
    />
  );
}
