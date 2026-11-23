import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { SignInSheet } from '@/features/auth/presentation/components/sign-in-sheet';
import { AddedToCartSheet } from '@/features/cart/presentation/components/added-to-cart-sheet';
import { useCart } from '@/features/cart/presentation/hooks/use-cart';
import { isOnSale } from '@/features/catalog/domain/entities/product';
import {
  needsSize,
  type ProductDetail,
} from '@/features/catalog/domain/entities/product-detail';
import { AddToCartBar } from '@/features/catalog/presentation/components/add-to-cart-bar';
import { LoadError } from '@/features/catalog/presentation/components/load-error';
import {
  GALLERY_HEIGHT,
  ProductGallery,
} from '@/features/catalog/presentation/components/product-gallery';
import { ProductUnavailable } from '@/features/catalog/presentation/components/product-unavailable';
import { SizePicker } from '@/features/catalog/presentation/components/size-picker';
import { ProductDetailSkeleton } from '@/features/catalog/presentation/components/skeleton';
import { useProductDetail } from '@/features/catalog/presentation/hooks/use-product-detail';
import { useWishlistHearts } from '@/features/wishlist/presentation/hooks/use-wishlist-hearts';
import { useTranslation } from '@/shared/i18n';
import { useLocalized } from '@/shared/i18n/use-localized';
import { fonts, radius, spacing, touchTarget, useColors } from '@/shared/theme';
import { AccentRule, IconButton, ThemedText } from '@/shared/ui';
import { formatPrice } from '@/shared/utils/money';

const BACK_ICON_SIZE = 22;
const FLOATING_SHADOW = '0 1px 3px rgba(31,29,27,0.16)';

export interface ProductDetailScreenProps {
  productId: string;
  onBack: () => void;
  onSignIn: () => void;
  onViewCart: () => void;
}

// Photos, price, size and description of one product, with "Add to cart" pinned below.
export function ProductDetailScreen({
  productId,
  onBack,
  onSignIn,
  onViewCart,
}: ProductDetailScreenProps) {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const product = useProductDetail(productId);
  const hearts = useWishlistHearts(onSignIn);

  const isUnavailable = product.status === 'ready' && product.data === null;

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      {product.status === 'loading' && (
        <ProductDetailSkeleton galleryHeight={GALLERY_HEIGHT} />
      )}
      {product.status === 'error' && (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <LoadError onRetry={product.retry} />
        </View>
      )}
      {isUnavailable && <ProductUnavailable onBack={onBack} />}
      {product.data && (
        <ProductContent
          product={product.data}
          onSignIn={onSignIn}
          onViewCart={onViewCart}
        />
      )}

      <View
        style={{
          position: 'absolute',
          top: insets.top + spacing.sm,
          left: spacing.md,
          right: spacing.md,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
        pointerEvents="box-none"
      >
        <IconButton
          accessibilityLabel={t('common.back')}
          variant="filled"
          onPress={onBack}
          style={{
            width: touchTarget,
            height: touchTarget,
            boxShadow: FLOATING_SHADOW,
          }}
        >
          <Ionicons
            name="chevron-back"
            size={BACK_ICON_SIZE}
            color={colors.text}
          />
        </IconButton>
        {product.data && hearts.heartFor(product.data.id, { large: true })}
      </View>
      {hearts.sheet}
    </View>
  );
}

interface ProductContentProps {
  product: ProductDetail;
  onSignIn: () => void;
  onViewCart: () => void;
}

function ProductContent({
  product,
  onSignIn,
  onViewCart,
}: ProductContentProps) {
  const colors = useColors();
  const localized = useLocalized();
  const { t } = useTranslation();
  const cart = useCart();
  const [size, setSize] = useState<string | null>(null);
  const [isSizeMissing, setIsSizeMissing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [addFailed, setAddFailed] = useState(false);
  const [sheet, setSheet] = useState<'added' | 'signIn' | null>(null);
  const onSale = isOnSale(product);
  const description = localized(product.description);

  function selectSize(label: string) {
    setSize(label);
    setIsSizeMissing(false);
    setAddFailed(false);
  }

  // Guests are asked to sign in; a missing size is pointed out first.
  async function addToCart() {
    if (!cart.canAdd) {
      setSheet('signIn');
      return;
    }
    if (needsSize(product) && !size) {
      setIsSizeMissing(true);
      return;
    }
    setIsAdding(true);
    setAddFailed(false);
    try {
      await cart.add(product.id, needsSize(product) ? size : null);
      setSheet('added');
    } catch {
      setAddFailed(true);
    } finally {
      setIsAdding(false);
    }
  }

  return (
    <>
      <ScrollView style={{ flex: 1 }}>
        <ProductGallery imageUrls={product.imageUrls} />
        <View
          style={{
            paddingHorizontal: spacing.lg,
            paddingTop: spacing.ml,
            paddingBottom: spacing.xl,
            gap: spacing.lg,
          }}
        >
          <View style={{ gap: spacing.xs + spacing.xxs }}>
            <ThemedText variant="overline">
              {product.brand.toUpperCase()}
            </ThemedText>
            <ThemedText
              variant="headlineLarge"
              accessibilityRole="header"
              style={{ fontFamily: fonts.bold }}
            >
              {localized(product.name)}
            </ThemedText>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: spacing.ms - spacing.xxs,
                marginTop: spacing.xs + spacing.xxs,
              }}
            >
              <ThemedText
                variant="headlineLarge"
                style={{ fontFamily: fonts.bold }}
              >
                {formatPrice(product.price)}
              </ThemedText>
              {onSale && product.originalPrice !== null && (
                <>
                  <ThemedText
                    variant="bodyLong"
                    color="textSecondary"
                    style={{ textDecorationLine: 'line-through' }}
                  >
                    {formatPrice(product.originalPrice)}
                  </ThemedText>
                  <View
                    style={{
                      paddingVertical: spacing.xxs,
                      paddingHorizontal: spacing.sm,
                      borderRadius: radius.sm,
                      backgroundColor: colors.sale,
                    }}
                  >
                    <ThemedText
                      variant="caption"
                      style={{ fontFamily: fonts.bold, color: colors.onSale }}
                    >
                      −{product.discountPct}%
                    </ThemedText>
                  </View>
                </>
              )}
            </View>
          </View>

          <AccentRule />

          {needsSize(product) && (
            <SizePicker
              sizes={product.sizes}
              selected={size}
              showMissing={isSizeMissing}
              onSelect={selectSize}
            />
          )}

          {description.length > 0 && (
            <View style={{ gap: spacing.sm }}>
              <ThemedText
                variant="label"
                accessibilityRole="header"
                style={{ fontFamily: fonts.semiBold }}
              >
                {t('product.description')}
              </ThemedText>
              <ThemedText variant="bodyLong">{description}</ThemedText>
            </View>
          )}
        </View>
      </ScrollView>
      <AddToCartBar
        loading={isAdding}
        error={addFailed ? t('cart.addError') : undefined}
        onAdd={() => void addToCart()}
      />
      <AddedToCartSheet
        visible={sheet === 'added'}
        product={product}
        size={needsSize(product) ? size : null}
        cartCount={cart.summary.itemCount}
        onViewCart={() => {
          setSheet(null);
          onViewCart();
        }}
        onDismiss={() => setSheet(null)}
      />
      <SignInSheet
        visible={sheet === 'signIn'}
        title={t('cart.signInSheet.title')}
        message={t('cart.signInSheet.message')}
        icon="bag-handle-outline"
        onSignIn={() => {
          setSheet(null);
          onSignIn();
        }}
        onDismiss={() => setSheet(null)}
      />
    </>
  );
}
