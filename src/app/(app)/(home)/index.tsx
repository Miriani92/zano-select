import { router } from 'expo-router';

import { HomeScreen } from '@/features/catalog/presentation/screens/home-screen';

export default function HomeRoute() {
  return (
    <HomeScreen
      onSeeAll={(rail, gender) =>
        router.push({ pathname: '/rail/[rail]', params: { rail, gender } })
      }
      // The Catalog tab doesn't filter by category yet.
      onCategory={() => router.navigate('/catalog')}
      onSignIn={() => router.push('/welcome')}
    />
  );
}
