import {
  ActivityIndicator,
  Alert,
  FlatList,
  RefreshControl,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CartEmpty } from '@/features/cart/presentation/components/cart-empty';
import { CartItem } from '@/features/cart/presentation/components/cart-item';
import { CartSummary } from '@/features/cart/presentation/components/cart-summary';
import { CheckoutBar } from '@/features/cart/presentation/components/checkout-bar';
import { useCart } from '@/features/cart/presentation/hooks/use-cart';
import { LoadError } from '@/features/catalog/presentation/components/load-error';
import { useTranslation } from '@/shared/i18n';
import { borderWidth, spacing, useColors } from '@/shared/theme';
import { ThemedText } from '@/shared/ui';

export interface CartScreenProps {
  onProduct: (id: string) => void;
  onStartShopping: () => void;
  onViewWishlist: () => void;
}

// The signed-in user's cart: lines, summary and a pinned checkout bar.
export function CartScreen({
  onProduct,
  onStartShopping,
  onViewWishlist,
}: CartScreenProps) {
  const colors = useColors();
  const { t } = useTranslation();
  const cart = useCart();
  const { lines, summary } = cart;
  const hasLines = cart.status === 'ready' && lines.length > 0;
  const hasSoldOut = lines.some((line) => !line.available);

  return (
    <SafeAreaView
      edges={['top']}
      style={{ flex: 1, backgroundColor: colors.background }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          paddingHorizontal: spacing.lg,
          paddingTop: spacing.sm,
          paddingBottom: spacing.ms,
          borderBottomWidth: borderWidth.thin,
          borderBottomColor: colors.border,
        }}
      >
        <ThemedText variant="title" accessibilityRole="header">
          {t('cart.title')}
        </ThemedText>
        {hasLines && (
          <ThemedText variant="subhead">
            {t('cart.itemCount', { count: summary.itemCount })}
          </ThemedText>
        )}
      </View>

      {cart.status === 'loading' && (
        <ActivityIndicator
          color={colors.textSecondary}
          style={{ marginTop: spacing.xxl }}
        />
      )}
      {cart.status === 'error' && <LoadError onRetry={cart.retry} />}
      {cart.status === 'ready' && lines.length === 0 && (
        <CartEmpty
          onStartShopping={onStartShopping}
          onViewWishlist={onViewWishlist}
        />
      )}
      {hasLines && (
        <>
          <FlatList
            data={lines}
            keyExtractor={(line) => `${line.product.id}:${line.size ?? ''}`}
            contentContainerStyle={{
              paddingHorizontal: spacing.lg,
              paddingTop: spacing.md,
              paddingBottom: spacing.ml,
              gap: spacing.ms,
            }}
            renderItem={({ item: line }) => (
              <CartItem
                line={line}
                onOpen={() => onProduct(line.product.id)}
                onQuantityChange={(quantity) =>
                  cart.changeQuantity(line, quantity)
                }
                onRemove={() => cart.remove(line)}
              />
            )}
            ListFooterComponent={
              <View style={{ gap: spacing.ms, marginTop: spacing.xs }}>
                {hasSoldOut && (
                  <ThemedText
                    variant="footnote"
                    style={{ marginHorizontal: spacing.xs }}
                  >
                    {t('cart.soldOutNote')}
                  </ThemedText>
                )}
                <CartSummary summary={summary} />
              </View>
            }
            refreshControl={
              <RefreshControl
                refreshing={cart.isRefreshing}
                onRefresh={cart.refresh}
                tintColor={colors.textSecondary}
              />
            }
          />
          <CheckoutBar
            total={summary.total}
            enabled={summary.availableCount > 0}
            // Checkout isn't built yet.
            onCheckout={() => Alert.alert(t('cart.checkoutSoon'))}
          />
        </>
      )}
    </SafeAreaView>
  );
}
