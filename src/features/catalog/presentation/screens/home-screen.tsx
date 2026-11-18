import { RefreshControl, ScrollView, useColorScheme, View } from 'react-native';
import { Image } from 'expo-image';
import { SafeAreaView } from 'react-native-safe-area-context';

import type { Banner } from '@/features/catalog/domain/entities/banner';
import type { Gender } from '@/features/catalog/domain/entities/gender';
import type { Rail } from '@/features/catalog/domain/entities/rail';
import { CategoryChips } from '@/features/catalog/presentation/components/category-chips';
import { GenderSwitch } from '@/features/catalog/presentation/components/gender-switch';
import { HeroBanner } from '@/features/catalog/presentation/components/hero-banner';
import { LoadError } from '@/features/catalog/presentation/components/load-error';
import { ProductRail } from '@/features/catalog/presentation/components/product-rail';
import { HomeSkeleton } from '@/features/catalog/presentation/components/skeleton';
import { useGenderPreference } from '@/features/catalog/presentation/hooks/use-gender-preference';
import { useHomeFeed } from '@/features/catalog/presentation/hooks/use-home-feed';
import { useWishlistHearts } from '@/features/wishlist/presentation/hooks/use-wishlist-hearts';
import { useTranslation } from '@/shared/i18n';
import { spacing, useColors } from '@/shared/theme';

const LOGO_WIDTH = 112;
const LOGO_HEIGHT = 44;

export interface HomeScreenProps {
  onSeeAll: (rail: Rail, gender: Gender) => void;
  onCategory: (slug: string) => void;
  onSignIn: () => void;
  onProduct: (id: string) => void;
}

export function HomeScreen({
  onSeeAll,
  onCategory,
  onSignIn,
  onProduct,
}: HomeScreenProps) {
  const colors = useColors();
  const scheme = useColorScheme();
  const { t } = useTranslation();
  const { gender, setGender } = useGenderPreference();
  const feed = useHomeFeed(gender);
  const hearts = useWishlistHearts(onSignIn);

  function openBanner(banner: Banner) {
    if (banner.target.kind === 'rail')
      onSeeAll(banner.target.rail, banner.gender);
    else onCategory(banner.target.slug);
  }

  const banner = feed.data?.banners[0];

  return (
    <SafeAreaView
      edges={['top']}
      style={{ flex: 1, backgroundColor: colors.background }}
    >
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={feed.isRefreshing}
            onRefresh={feed.refresh}
            tintColor={colors.textSecondary}
          />
        }
        contentContainerStyle={{
          paddingTop: spacing.sm,
          paddingBottom: spacing.lg,
          gap: spacing.lg,
        }}
      >
        <View style={{ paddingHorizontal: spacing.lg }}>
          <Image
            source={
              scheme === 'dark'
                ? require('@/assets/images/logo-wordmark-dark.png')
                : require('@/assets/images/logo-wordmark.png')
            }
            accessibilityRole="image"
            accessibilityLabel={t('common.appName')}
            contentFit="contain"
            contentPosition="left center"
            style={{ width: LOGO_WIDTH, height: LOGO_HEIGHT }}
          />
        </View>

        {gender && (
          <View style={{ paddingHorizontal: spacing.lg }}>
            <GenderSwitch value={gender} onChange={setGender} />
          </View>
        )}

        {feed.status === 'loading' && <HomeSkeleton />}

        {feed.status === 'error' && <LoadError onRetry={feed.retry} />}

        {feed.data && gender && (
          <>
            {banner && (
              <View style={{ paddingHorizontal: spacing.lg }}>
                <HeroBanner banner={banner} onPress={openBanner} />
              </View>
            )}
            <CategoryChips
              categories={feed.data.categories}
              onPress={(category) => onCategory(category.slug)}
            />
            <ProductRail
              title={t('home.rails.discounts')}
              products={feed.data.rails.discounts}
              onSeeAll={() => onSeeAll('discounts', gender)}
              accessoryFor={(product) => hearts.heartFor(product.id)}
              onProductPress={(product) => onProduct(product.id)}
            />
            <ProductRail
              title={t('home.rails.newest')}
              products={feed.data.rails.newest}
              onSeeAll={() => onSeeAll('newest', gender)}
              accessoryFor={(product) => hearts.heartFor(product.id)}
              onProductPress={(product) => onProduct(product.id)}
            />
          </>
        )}
      </ScrollView>
      {hearts.sheet}
    </SafeAreaView>
  );
}
