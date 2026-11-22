import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';

import { ProfileAvatar } from '@/features/profile/presentation/components/profile-avatar';
import { useTranslation } from '@/shared/i18n';
import {
  borderWidth,
  radius,
  spacing,
  touchTarget,
  useColors,
} from '@/shared/theme';
import { IconButton, ThemedText } from '@/shared/ui';

const AVATAR_SIZE = 56;

export interface ProfileHeaderProps {
  initials: string;
  /** Null while loading or when no name is saved. */
  name: string | null;
  email: string | null;
  isLoading: boolean;
  onEdit: () => void;
}

// The card at the top of Profile: avatar, name, email and an edit button.
export function ProfileHeader({
  initials,
  name,
  email,
  isLoading,
  onEdit,
}: ProfileHeaderProps) {
  const colors = useColors();
  const { t } = useTranslation();

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md,
        padding: spacing.md,
        borderRadius: radius.lg,
        borderWidth: borderWidth.thin,
        borderColor: colors.border,
        backgroundColor: colors.surface,
      }}
    >
      <ProfileAvatar initials={initials} size={AVATAR_SIZE} />
      <View style={{ flex: 1, minWidth: 0, gap: spacing.xxs }}>
        <ThemedText
          variant="sectionTitle"
          numberOfLines={1}
          color={name ? 'text' : 'textSecondary'}
        >
          {isLoading ? ' ' : (name ?? t('profile.noName'))}
        </ThemedText>
        {email && (
          <ThemedText variant="subhead" numberOfLines={1}>
            {email}
          </ThemedText>
        )}
      </View>
      <IconButton
        accessibilityLabel={t('profile.edit')}
        onPress={onEdit}
        style={{
          width: touchTarget,
          height: touchTarget,
          borderWidth: borderWidth.thin,
          borderColor: colors.border,
          backgroundColor: colors.background,
        }}
      >
        <Ionicons name="pencil-outline" size={18} color={colors.text} />
      </IconButton>
    </View>
  );
}
