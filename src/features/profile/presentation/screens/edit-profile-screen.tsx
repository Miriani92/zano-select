import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useSession } from '@/features/auth/presentation/components/session-provider';
import { LoadError } from '@/features/catalog/presentation/components/load-error';
import {
  profileInitials,
  type Profile,
} from '@/features/profile/domain/entities/profile';
import { ProfileAvatar } from '@/features/profile/presentation/components/profile-avatar';
import { useProfile } from '@/features/profile/presentation/hooks/use-profile';
import { useUpdateProfile } from '@/features/profile/presentation/hooks/use-update-profile';
import { useTranslation } from '@/shared/i18n';
import { borderWidth, spacing, touchTarget, useColors } from '@/shared/theme';
import { Button, IconButton, Input, ThemedText } from '@/shared/ui';

const AVATAR_SIZE = 80;

export interface EditProfileScreenProps {
  onDone: () => void;
}

// Full screen over the tabs: first name, last name and phone; email is read-only.
export function EditProfileScreen({ onDone }: EditProfileScreenProps) {
  const colors = useColors();
  const { t } = useTranslation();
  const { user } = useSession();
  const profile = useProfile(user?.id ?? '');

  return (
    <SafeAreaView
      edges={['top', 'bottom']}
      style={{ flex: 1, backgroundColor: colors.background }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: spacing.xs,
          paddingHorizontal: spacing.ms,
          paddingBottom: spacing.sm,
          borderBottomWidth: borderWidth.thin,
          borderBottomColor: colors.border,
        }}
      >
        <IconButton
          accessibilityLabel={t('common.back')}
          onPress={onDone}
          style={{ width: touchTarget, height: touchTarget }}
        >
          <Ionicons name="chevron-back" size={22} color={colors.text} />
        </IconButton>
        <ThemedText
          variant="sectionTitle"
          accessibilityRole="header"
          numberOfLines={1}
        >
          {t('profile.edit')}
        </ThemedText>
      </View>

      {profile.status === 'loading' && (
        <ActivityIndicator
          color={colors.textSecondary}
          style={{ marginTop: spacing.xxl }}
        />
      )}
      {profile.status === 'error' && <LoadError onRetry={profile.retry} />}
      {profile.data && (
        <EditProfileForm initial={profile.data} onSaved={onDone} />
      )}
    </SafeAreaView>
  );
}

interface EditProfileFormProps {
  initial: Profile;
  onSaved: () => void;
}

function EditProfileForm({ initial, onSaved }: EditProfileFormProps) {
  const colors = useColors();
  const { t } = useTranslation();
  const { user } = useSession();
  const { save, isSaving, error, clearError } = useUpdateProfile();
  const [firstName, setFirstName] = useState(initial.firstName ?? '');
  const [lastName, setLastName] = useState(initial.lastName ?? '');
  const [phone, setPhone] = useState(initial.phone ?? '');

  const email = user?.email ?? null;
  const draft: Profile = { firstName, lastName, phone };

  async function onSave() {
    if (await save(draft)) onSaved();
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ padding: spacing.lg, gap: spacing.ml }}
      >
        <View style={{ alignSelf: 'center' }}>
          <ProfileAvatar
            initials={profileInitials(draft, email)}
            size={AVATAR_SIZE}
          />
        </View>
        <Input
          label={t('profile.editForm.firstName')}
          value={firstName}
          onChangeText={setFirstName}
          textContentType="givenName"
          maxLength={50}
        />
        <Input
          label={t('profile.editForm.lastName')}
          value={lastName}
          onChangeText={setLastName}
          textContentType="familyName"
          maxLength={50}
        />
        <Input
          type="phone"
          label={t('profile.editForm.phone')}
          placeholder={t('profile.editForm.phonePlaceholder')}
          value={phone}
          onChangeText={(value) => {
            setPhone(value);
            if (error === 'invalidPhone') clearError();
          }}
          maxLength={20}
          error={
            error === 'invalidPhone'
              ? t('profile.editForm.invalidPhone')
              : undefined
          }
        />
        {email && (
          <Input
            type="email"
            label={t('profile.editForm.email')}
            value={email}
            disabled
            helperText={t('profile.editForm.emailHint')}
          />
        )}
        {error === 'unknown' && (
          <ThemedText variant="error" accessibilityRole="alert">
            {t('common.genericError')}
          </ThemedText>
        )}
      </ScrollView>
      <View
        style={{
          paddingHorizontal: spacing.lg,
          paddingTop: spacing.ms,
          paddingBottom: spacing.ms,
          backgroundColor: colors.surface,
          borderTopWidth: borderWidth.thin,
          borderTopColor: colors.border,
        }}
      >
        <Button
          size="lg"
          title={t('profile.editForm.save')}
          onPress={() => void onSave()}
          loading={isSaving}
        />
      </View>
    </KeyboardAvoidingView>
  );
}
