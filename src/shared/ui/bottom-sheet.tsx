import { useEffect, useMemo, useState, type ReactNode } from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  Modal,
  PanResponder,
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

const OPEN_DURATION = 280;
const CLOSE_DURATION = 220;
/** Drag past this share of the sheet's height to dismiss on release. */
const DISMISS_DISTANCE_RATIO = 0.3;
/** Or release faster than this (px/ms) while moving down. */
const DISMISS_VELOCITY = 1;
/** Vertical movement before a touch becomes a drag (taps still reach rows). */
const DRAG_SLOP = 6;

export interface BottomSheetProps {
  visible: boolean;
  onDismiss: () => void;
  children: ReactNode;
  /** Read by screen readers when the sheet opens. */
  accessibilityLabel?: string;
  /** Layout of the content column under the handle (it already has a gap). */
  contentStyle?: StyleProp<ViewStyle>;
}

// A panel that slides up over the bottom of the screen. Tapping outside,
// dragging it down or the back button closes it.
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

  // Stays mounted while the close animation runs.
  const [mounted, setMounted] = useState(visible);
  const [sheetHeight, setSheetHeight] = useState(
    Dimensions.get('window').height,
  );
  const [translateY] = useState(
    () => new Animated.Value(Dimensions.get('window').height),
  );

  if (visible && !mounted) setMounted(true);

  useEffect(() => {
    if (!mounted) return;
    if (visible) {
      Animated.timing(translateY, {
        toValue: 0,
        duration: OPEN_DURATION,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(translateY, {
        toValue: sheetHeight,
        duration: CLOSE_DURATION,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished) setMounted(false);
      });
    }
  }, [visible, mounted, translateY, sheetHeight]);

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: (_, g) =>
          g.dy > DRAG_SLOP && Math.abs(g.dy) > Math.abs(g.dx),
        onPanResponderMove: (_, g) => {
          // Resist dragging upward; follow the finger downward.
          translateY.setValue(g.dy > 0 ? g.dy : g.dy / 6);
        },
        onPanResponderRelease: (_, g) => {
          const shouldClose =
            g.dy > sheetHeight * DISMISS_DISTANCE_RATIO ||
            g.vy > DISMISS_VELOCITY;
          if (shouldClose) {
            onDismiss();
          } else {
            Animated.timing(translateY, {
              toValue: 0,
              duration: OPEN_DURATION,
              easing: Easing.out(Easing.cubic),
              useNativeDriver: true,
            }).start();
          }
        },
        onPanResponderTerminate: () => {
          Animated.timing(translateY, {
            toValue: 0,
            duration: OPEN_DURATION,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          }).start();
        },
      }),
    [translateY, sheetHeight, onDismiss],
  );

  const scrimOpacity = translateY.interpolate({
    inputRange: [0, sheetHeight],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  return (
    <Modal
      visible={mounted}
      transparent
      animationType="none"
      statusBarTranslucent
      onRequestClose={onDismiss}
    >
      <View style={{ flex: 1, justifyContent: 'flex-end' }}>
        <Animated.View
          style={[StyleSheet.absoluteFill, { opacity: scrimOpacity }]}
        >
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={t('common.close')}
            onPress={onDismiss}
            style={[StyleSheet.absoluteFill, { backgroundColor: colors.scrim }]}
          />
        </Animated.View>
        <Animated.View
          {...panResponder.panHandlers}
          accessibilityViewIsModal
          accessibilityLabel={accessibilityLabel}
          onLayout={(e) => setSheetHeight(e.nativeEvent.layout.height)}
          style={{
            maxHeight: MAX_HEIGHT,
            transform: [{ translateY }],
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
        </Animated.View>
      </View>
    </Modal>
  );
}
