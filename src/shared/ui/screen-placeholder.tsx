import type { ReactNode } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { spacing, useColors } from '@/shared/theme';
import { ThemedText } from './text';

export interface ScreenPlaceholderProps {
  title: string;
  message?: string;
  icon?: ReactNode;
  children?: ReactNode;
}

// Centered title + message, for screens that are empty or not built yet.
export function ScreenPlaceholder({
  title,
  message,
  icon,
  children,
}: ScreenPlaceholderProps) {
  const colors = useColors();

  return (
    <SafeAreaView
      edges={['top']}
      style={{
        flex: 1,
        backgroundColor: colors.background,
        alignItems: 'center',
        justifyContent: 'center',
        padding: spacing.lg,
        gap: spacing.md,
      }}
    >
      {icon}
      <View style={{ gap: spacing.sm, alignItems: 'center' }}>
        <ThemedText variant="headline" accessibilityRole="header">
          {title}
        </ThemedText>
        {message && (
          <ThemedText
            variant="body"
            color="textSecondary"
            style={{ textAlign: 'center' }}
          >
            {message}
          </ThemedText>
        )}
      </View>
      {children && (
        <View style={{ alignSelf: 'stretch', marginTop: spacing.sm }}>
          {children}
        </View>
      )}
    </SafeAreaView>
  );
}
