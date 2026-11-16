import type { ReactNode } from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useTranslation } from '@/shared/i18n';
import { radius, spacing, useColors } from '@/shared/theme';

const HANDLE_WIDTH = 40;
const HANDLE_HEIGHT = 4;
const MAX_HEIGHT = '90%';

export interface BottomSheetProps {
  visible: boolean;
  onDismiss: () => void;
  children: ReactNode;
  /** Read by screen readers when the sheet opens. */
  accessibilityLabel?: string;
  /** Layout of the content column under the handle (it already has a gap). */
  contentStyle?: StyleProp<ViewStyle>;
}

// A panel that slides over the bottom of the screen; tapping outside closes it.
export function BottomSheet({
  visible,
  onDismiss,
  children,
  accessibilityLabel,
  contentStyle,
}: BottomSheetProps) {
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
          style={[StyleSheet.absoluteFill, { backgroundColor: colors.scrim }]}
        />
        <View
          accessibilityViewIsModal
          accessibilityLabel={accessibilityLabel}
          style={{
            maxHeight: MAX_HEIGHT,
            backgroundColor: colors.surface,
            borderTopLeftRadius: radius.xxl,
            borderTopRightRadius: radius.xxl,
            paddingTop: spacing.ms,
            paddingHorizontal: spacing.lg,
            paddingBottom: Math.max(insets.bottom, spacing.lg) + spacing.sm,
            gap: spacing.ml,
          }}
        >
          <View
            style={{
              alignSelf: 'center',
              width: HANDLE_WIDTH,
              height: HANDLE_HEIGHT,
              borderRadius: radius.full,
              backgroundColor: colors.border,
            }}
          />
          <View style={[{ flexShrink: 1, gap: spacing.ml }, contentStyle]}>
            {children}
          </View>
        </View>
      </View>
    </Modal>
  );
}
