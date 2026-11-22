import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useSession } from '@/features/auth/presentation/components/session-provider';
import {
  EMPTY_PROFILE,
  profileDisplayName,
  profileInitials,
} from '@/features/profile/domain/entities/profile';
import { LanguageSheet } from '@/features/profile/presentation/components/language-sheet';
import {
  MenuGroup,
  MenuRow,
} from '@/features/profile/presentation/components/menu-group';
import { ProfileHeader } from '@/features/profile/presentation/components/profile-header';
import { SignOutSheet } from '@/features/profile/presentation/components/sign-out-sheet';
import { useProfile } from '@/features/profile/presentation/hooks/use-profile';
import { useTranslation, type Language } from '@/shared/i18n';
import { borderWidth, radius, spacing, useColors } from '@/shared/theme';
import { ThemedText } from '@/shared/ui';

const appVersion = Constants.expoConfig?.version ?? '';

export interface ProfileScreenProps {
  onEdit: () => void;
  onWishlist: () => void;
}

// Only rendered for a signed-in user (the route wraps it in SignInGate).
export function ProfileScreen({ onEdit, onWishlist }: ProfileScreenProps) {
  const colors = useColors();
  const { t, i18n } = useTranslation();
  const { user } = useSession();
  const profile = useProfile(user?.id ?? '');
  const [sheet, setSheet] = useState<'language' | 'signOut' | null>(null);

  const shown = profile.data ?? EMPTY_PROFILE;
  const email = user?.email ?? null;

  return (
    <SafeAreaView
      edges={['top']}
      style={{ flex: 1, backgroundColor: colors.background }}
    >
      <View
        style={{
          paddingHorizontal: spacing.lg,
          paddingTop: spacing.sm,
          paddingBottom: spacing.ms,
          borderBottomWidth: borderWidth.thin,
          borderBottomColor: colors.border,
        }}
      >
        <ThemedText variant="title" accessibilityRole="header">
          {t('profile.title')}
        </ThemedText>
      </View>

      <ScrollView
        contentContainerStyle={{
          padding: spacing.lg,
          paddingTop: spacing.ml,
          gap: spacing.lg,
        }}
      >
        <View style={{ gap: spacing.sm }}>
          <ProfileHeader
            initials={profileInitials(shown, email)}
            name={profileDisplayName(shown)}
            email={email}
            isLoading={profile.status === 'loading'}
            onEdit={onEdit}
          />
          {profile.status === 'error' && (
            <Pressable
              accessibilityRole="button"
              onPress={profile.retry}
              style={{ alignSelf: 'flex-start', paddingVertical: spacing.xs }}
            >
              <ThemedText variant="link" color="error">
                {t('common.genericError')}
              </ThemedText>
            </Pressable>
          )}
        </View>

        <MenuGroup title={t('profile.groups.account')}>
          <MenuRow icon="cube-outline" label={t('profile.rows.orders')} soon />
          <MenuRow
            icon="location-outline"
            label={t('profile.rows.addresses')}
            soon
          />
          <MenuRow
            icon="heart-outline"
            label={t('profile.rows.wishlist')}
            onPress={onWishlist}
          />
        </MenuGroup>

        <MenuGroup title={t('profile.groups.settings')}>
          <MenuRow
            icon="globe-outline"
            label={t('profile.rows.language')}
            value={t(`profile.languages.${i18n.language as Language}`)}
            onPress={() => setSheet('language')}
          />
        </MenuGroup>

        <MenuGroup title={t('profile.groups.help')}>
          <MenuRow icon="mail-outline" label={t('profile.rows.contact')} soon />
          <MenuRow
            icon="document-text-outline"
            label={t('profile.rows.legal')}
            soon
          />
        </MenuGroup>

        <Pressable
          accessibilityRole="button"
          onPress={() => setSheet('signOut')}
          style={({ pressed }) => ({
            minHeight: 52,
            borderRadius: radius.md,
            borderWidth: borderWidth.thin,
            borderColor: colors.border,
            backgroundColor: colors.surface,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: spacing.sm,
            opacity: pressed ? 0.8 : 1,
          })}
        >
          <Ionicons name="log-out-outline" size={20} color={colors.error} />
          <ThemedText variant="headline" color="error">
            {t('auth.signOut')}
          </ThemedText>
        </Pressable>

        {appVersion !== '' && (
          <ThemedText variant="caption" style={{ textAlign: 'center' }}>
            {t('profile.version', { version: appVersion })}
          </ThemedText>
        )}
      </ScrollView>

      <LanguageSheet
        visible={sheet === 'language'}
        onDismiss={() => setSheet(null)}
      />
      <SignOutSheet
        visible={sheet === 'signOut'}
        onDismiss={() => setSheet(null)}
      />
    </SafeAreaView>
  );
}
