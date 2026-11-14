import { Ionicons } from '@expo/vector-icons';
import { Modal, Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useTranslation } from '@/shared/i18n';
import { spacing, useColors } from '@/shared/theme';
import { Button, ThemedText } from '@/shared/ui';

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
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            paddingTop: 12,
            paddingHorizontal: spacing.lg,
            paddingBottom: Math.max(insets.bottom, spacing.lg) + spacing.sm,
            alignItems: 'center',
            gap: 20,
          }}
        >
          <View
            style={{
              width: 40,
              height: 4,
              borderRadius: 2,
              backgroundColor: colors.border,
            }}
          />
          <View
            style={{
              width: 64,
              height: 64,
              borderRadius: 32,
              marginTop: 4,
              borderWidth: 1,
              borderColor: colors.border,
              backgroundColor: colors.background,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Ionicons name="heart-outline" size={28} color={colors.primary} />
          </View>
          <View style={{ alignItems: 'center', gap: 10 }}>
            <ThemedText
              variant="headline"
              accessibilityRole="header"
              style={{ fontSize: 22, lineHeight: 29, textAlign: 'center' }}
            >
              {t('home.signInSheet.title')}
            </ThemedText>
            <View
              style={{ width: 40, height: 1, backgroundColor: colors.accent }}
            />
            <ThemedText
              color="textSecondary"
              style={{ fontSize: 15, lineHeight: 23, textAlign: 'center' }}
            >
              {t('home.signInSheet.message')}
            </ThemedText>
          </View>
          <View style={{ alignSelf: 'stretch', gap: 12, marginTop: 4 }}>
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
