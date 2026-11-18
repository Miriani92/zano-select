import { router } from 'expo-router';

import { HomeScreen } from '@/features/catalog/presentation/screens/home-screen';

export default function HomeRoute() {
  return (
    <HomeScreen
      onSeeAll={(rail, gender) =>
        router.push({ pathname: '/rail/[rail]', params: { rail, gender } })
      }
      onCategory={(slug) =>
        router.navigate({
          pathname: '/catalog',
          params: { category: slug, at: String(Date.now()) },
        })
      }
      onSignIn={() => router.push('/welcome')}
      onProduct={(id) =>
        router.push({ pathname: '/product/[id]', params: { id } })
      }
    />
  );
}
