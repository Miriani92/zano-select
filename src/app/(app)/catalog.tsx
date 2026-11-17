import { router, useLocalSearchParams } from 'expo-router';

import { CatalogScreen } from '@/features/catalog/presentation/screens/catalog-screen';

// /catalog?category=shoes&at=1731744000000 — `at` makes a repeated request count.
export default function CatalogRoute() {
  const { category, at } = useLocalSearchParams<{
    category?: string;
    at?: string;
  }>();

  return (
    <CatalogScreen
      categoryRequest={
        category
          ? { slug: category, requestKey: `${category}:${at}` }
          : undefined
      }
      onSignIn={() => router.push('/welcome')}
    />
  );
}
