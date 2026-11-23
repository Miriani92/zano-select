import { router, useLocalSearchParams } from 'expo-router';

import { ProductDetailScreen } from '@/features/catalog/presentation/screens/product-detail-screen';

// /product/<uuid> — full screen over the tabs.
export default function ProductDetailRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <ProductDetailScreen
      productId={id}
      onBack={() => router.back()}
      onSignIn={() => router.push('/welcome')}
      onViewCart={() => router.navigate('/cart')}
    />
  );
}
