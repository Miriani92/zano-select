import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useSendEmailCode } from '@/features/auth/presentation/hooks/use-send-email-code';
import { useTranslation } from '@/shared/i18n';
import { spacing, useColors } from '@/shared/theme';
import { Button, IconButton, Input, ThemedText } from '@/shared/ui';

export interface EmailEntryScreenProps {
  onBack: () => void;
  /** Called with the email the code was sent to. */
  onCodeSent: (email: string) => void;
}

export function EmailEntryScreen({
  onBack,
  onCodeSent,
}: EmailEntryScreenProps) {
  const colors = useColors();
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const { sendCode, isSending, error, clearError } = useSendEmailCode();

  async function handleSubmit() {
    const trimmed = email.trim();
    if (await sendCode(trimmed)) {
      onCodeSent(trimmed);
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{
          flex: 1,
          paddingHorizontal: spacing.lg,
          paddingBottom: spacing.lg,
        }}
      >
        <IconButton
          accessibilityLabel={t('common.back')}
          onPress={onBack}
          style={{ marginLeft: -spacing.sm, marginTop: spacing.sm }}
        >
          <Ionicons name="chevron-back" size={24} color={colors.text} />
        </IconButton>

        <View style={{ marginTop: spacing.lg, gap: spacing.sm }}>
          <ThemedText variant="title" accessibilityRole="header">
            {t('auth.email.title')}
          </ThemedText>
          <ThemedText variant="body" color="textSecondary">
            {t('auth.email.subtitle')}
          </ThemedText>
        </View>
        <Input
          type="email"
          label={t('auth.email.label')}
          placeholder={t('auth.email.placeholder')}
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            if (error) clearError();
          }}
          error={error ? t(`auth.errors.${error}`) : undefined}
          returnKeyType="send"
          onSubmitEditing={handleSubmit}
          autoFocus
          containerStyle={{ marginTop: spacing.xl }}
        />

        <Button
          size="lg"
          title={t('auth.email.sendCode')}
          onPress={handleSubmit}
          loading={isSending}
          disabled={email.trim().length === 0}
          style={{ marginTop: 'auto' }}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
