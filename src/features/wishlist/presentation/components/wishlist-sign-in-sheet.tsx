import { Ionicons } from '@expo/vector-icons';
import { Modal, Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useTranslation } from '@/shared/i18n';
import { borderWidth, radius, spacing, useColors } from '@/shared/theme';
import { AccentRule, Button, ThemedText } from '@/shared/ui';

const HANDLE_WIDTH = 40;
const HANDLE_HEIGHT = 4;
const ICON_CIRCLE = 64;
const ICON_SIZE = 28;

export interface WishlistSignInSheetProps {
  visible: boolean;
  onSignIn: () => void;
  onDismiss: () => void;
}

// Shown when a guest taps a heart: sign in, or "not now".
export function WishlistSignInSheet({
  visible,
  onSignIn,
  onDismiss,
}: WishlistSignInSheetProps) {
  const colors = useColors();
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onDismiss}
    >
      <View style={{ flex: 1, justifyContent: 'flex-end' }}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={t('common.close')}
          onPress={onDismiss}
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            backgroundColor: 'rgba(31,29,27,0.45)',
          }}
        />
        <View
          accessibilityViewIsModal
          style={{
            backgroundColor: colors.surface,
            borderTopLeftRadius: radius.xxl,
            borderTopRightRadius: radius.xxl,
            paddingTop: spacing.ms,
            paddingHorizontal: spacing.lg,
            paddingBottom: Math.max(insets.bottom, spacing.lg) + spacing.sm,
            alignItems: 'center',
            gap: spacing.ml,
          }}
        >
          <View
            style={{
              width: HANDLE_WIDTH,
              height: HANDLE_HEIGHT,
              borderRadius: radius.full,
              backgroundColor: colors.border,
            }}
          />
          <View
            style={{
              width: ICON_CIRCLE,
              height: ICON_CIRCLE,
              borderRadius: radius.full,
              marginTop: spacing.xs,
              borderWidth: borderWidth.thin,
              borderColor: colors.border,
              backgroundColor: colors.background,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Ionicons
              name="heart-outline"
              size={ICON_SIZE}
              color={colors.primary}
            />
          </View>
          <View style={{ alignItems: 'center', gap: spacing.ms }}>
            <ThemedText
              variant="headlineLarge"
              accessibilityRole="header"
              style={{ textAlign: 'center' }}
            >
              {t('home.signInSheet.title')}
            </ThemedText>
            <AccentRule />
            <ThemedText
              variant="bodyLong"
              color="textSecondary"
              style={{ textAlign: 'center' }}
            >
              {t('home.signInSheet.message')}
            </ThemedText>
          </View>
          <View
            style={{
              alignSelf: 'stretch',
              gap: spacing.ms,
              marginTop: spacing.xs,
            }}
          >
            <Button
              size="lg"
              title={t('home.signInSheet.signIn')}
              onPress={onSignIn}
            />
            <Button
              size="lg"
              variant="outline"
              title={t('home.signInSheet.notNow')}
              onPress={onDismiss}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}
