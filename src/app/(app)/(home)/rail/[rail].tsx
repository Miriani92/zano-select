import { router, useLocalSearchParams } from 'expo-router';

import {
  GENDERS,
  type Gender,
} from '@/features/catalog/domain/entities/gender';
import { isRail } from '@/features/catalog/domain/entities/rail';
import { DEFAULT_GENDER } from '@/features/catalog/domain/useCases/gender-preference';
import { SeeAllScreen } from '@/features/catalog/presentation/screens/see-all-screen';

// /rail/discounts?gender=women
export default function SeeAllRoute() {
  const params = useLocalSearchParams<{ rail: string; gender?: string }>();
  const rail = isRail(params.rail) ? params.rail : 'discounts';
  const gender =
    GENDERS.find((value): value is Gender => value === params.gender) ??
    DEFAULT_GENDER;

  return (
    <SeeAllScreen
      rail={rail}
      gender={gender}
      onBack={() => router.back()}
      onSignIn={() => router.push('/welcome')}
    />
  );
}
