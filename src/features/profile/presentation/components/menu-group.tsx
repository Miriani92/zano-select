import { Ionicons } from '@expo/vector-icons';
import { Children, Fragment, type ComponentProps, type ReactNode } from 'react';
import { Pressable, View } from 'react-native';

import { useTranslation } from '@/shared/i18n';
import { borderWidth, radius, spacing, useColors } from '@/shared/theme';
import { ThemedText } from '@/shared/ui';

const ROW_HEIGHT = 56;

type IconName = ComponentProps<typeof Ionicons>['name'];

export interface MenuGroupProps {
  title: string;
  children: ReactNode;
}

// A titled card of rows with thin lines between them.
export function MenuGroup({ title, children }: MenuGroupProps) {
  const colors = useColors();
  const rows = Children.toArray(children);

  return (
    <View style={{ gap: spacing.sm }}>
      <ThemedText
        variant="footnote"
        accessibilityRole="header"
        style={{ marginHorizontal: spacing.xs }}
      >
        {title}
      </ThemedText>
      <View
        style={{
          borderRadius: radius.lg,
          borderWidth: borderWidth.thin,
          borderColor: colors.border,
          backgroundColor: colors.surface,
          overflow: 'hidden',
        }}
      >
        {rows.map((row, index) => (
          <Fragment key={index}>
            {index > 0 && (
              <View
                style={{
                  height: borderWidth.thin,
                  backgroundColor: colors.border,
                  marginLeft: spacing.md,
                }}
              />
            )}
            {row}
          </Fragment>
        ))}
      </View>
    </View>
  );
}

export interface MenuRowProps {
  icon: IconName;
  label: string;
  /** Shown on the right, e.g. the current language. */
  value?: string;
  /** Not built yet: shows a "Soon" badge and can't be tapped. */
  soon?: boolean;
  onPress?: () => void;
}

export function MenuRow({ icon, label, value, soon, onPress }: MenuRowProps) {
  const colors = useColors();
  const { t } = useTranslation();
  const tappable = !soon && onPress !== undefined;

  return (
    <Pressable
      accessibilityRole={tappable ? 'button' : undefined}
      accessibilityLabel={
        soon
          ? `${label}, ${t('profile.soon')}`
          : value
            ? `${label}, ${value}`
            : label
      }
      accessibilityState={{ disabled: !tappable }}
      disabled={!tappable}
      onPress={onPress}
      style={({ pressed }) => ({
        minHeight: ROW_HEIGHT,
        paddingHorizontal: spacing.md,
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.ms,
        backgroundColor: pressed ? colors.background : colors.surface,
      })}
    >
      <Ionicons name={icon} size={22} color={colors.text} />
      <ThemedText variant="label" style={{ flex: 1 }} numberOfLines={1}>
        {label}
      </ThemedText>
      {soon ? (
        <View
          style={{
            paddingHorizontal: spacing.sm,
            paddingVertical: spacing.xxs,
            borderRadius: radius.sm,
            borderWidth: borderWidth.thin,
            borderColor: colors.border,
            backgroundColor: colors.background,
          }}
        >
          <ThemedText variant="caption">{t('profile.soon')}</ThemedText>
        </View>
      ) : (
        <>
          {value && <ThemedText variant="subhead">{value}</ThemedText>}
          <Ionicons
            name="chevron-forward"
            size={18}
            color={colors.textSecondary}
          />
        </>
      )}
    </Pressable>
  );
}
