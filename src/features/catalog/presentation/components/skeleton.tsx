import { useEffect, useState, type ReactNode } from 'react';
import { Animated, View, type DimensionValue } from 'react-native';

import {
  RAIL_CARD_WIDTH,
  RAIL_IMAGE_HEIGHT,
} from '@/features/catalog/presentation/components/product-rail';
import { spacing, useColors } from '@/shared/theme';

interface BlockProps {
  width: DimensionValue;
  height: number;
  radius?: number;
}

/** A gray placeholder shape; wrap a group in <SkeletonPulse> to animate it. */
export function SkeletonBlock({ width, height, radius = 8 }: BlockProps) {
  const colors = useColors();
  return (
    <View
      style={{
        width,
        height,
        borderRadius: radius,
        backgroundColor: colors.disabled,
      }}
    />
  );
}

/** Gently fades its children in and out while content loads. */
export function SkeletonPulse({ children }: { children: ReactNode }) {
  const [opacity] = useState(() => new Animated.Value(1));

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.5,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [opacity]);

  return (
    <Animated.View
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      style={{ opacity }}
    >
      {children}
    </Animated.View>
  );
}

/** One product card's shape, at rail or grid size. */
export function ProductCardSkeleton({
  width,
  imageHeight = RAIL_IMAGE_HEIGHT,
}: {
  width: DimensionValue;
  imageHeight?: number;
}) {
  return (
    <View style={{ width, gap: 8 }}>
      <SkeletonBlock width="100%" height={imageHeight} radius={14} />
      <SkeletonBlock width="40%" height={10} />
      <SkeletonBlock width="80%" height={14} />
      <SkeletonBlock width="35%" height={14} />
    </View>
  );
}

/** Banner, category circles and two rails, shaped like the loaded Home. */
export function HomeSkeleton() {
  return (
    <SkeletonPulse>
      <View style={{ gap: spacing.lg }}>
        <View style={{ paddingHorizontal: spacing.lg }}>
          <SkeletonBlock width="100%" height={188} radius={20} />
        </View>
        <View
          style={{
            flexDirection: 'row',
            gap: spacing.md,
            paddingHorizontal: spacing.lg,
          }}
        >
          {[0, 1, 2, 3].map((key) => (
            <View key={key} style={{ width: 72, alignItems: 'center', gap: 8 }}>
              <SkeletonBlock width={64} height={64} radius={32} />
              <SkeletonBlock width={48} height={10} />
            </View>
          ))}
        </View>
        {[0, 1].map((rail) => (
          <View key={rail} style={{ gap: 12 }}>
            <View style={{ paddingHorizontal: spacing.lg }}>
              <SkeletonBlock width={180} height={18} />
            </View>
            <View
              style={{
                flexDirection: 'row',
                gap: 12,
                paddingHorizontal: spacing.lg,
                overflow: 'hidden',
              }}
            >
              {[0, 1, 2].map((card) => (
                <ProductCardSkeleton key={card} width={RAIL_CARD_WIDTH} />
              ))}
            </View>
          </View>
        ))}
      </View>
    </SkeletonPulse>
  );
}

/** Two-column grid of card shapes, for the "See all" screen. */
export function GridSkeleton({ imageHeight }: { imageHeight: number }) {
  return (
    <SkeletonPulse>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          rowGap: 20,
          columnGap: 12,
          paddingTop: spacing.md,
          paddingHorizontal: spacing.lg,
        }}
      >
        {[0, 1, 2, 3].map((card) => (
          <View key={card} style={{ width: '47%', flexGrow: 1 }}>
            <ProductCardSkeleton width="100%" imageHeight={imageHeight} />
          </View>
        ))}
      </View>
    </SkeletonPulse>
  );
}
