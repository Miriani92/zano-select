import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { EMAIL_CODE_LENGTH } from '@/features/auth/domain/entities/email';
import { CodeInput } from '@/features/auth/presentation/components/code-input';
import { useSendEmailCode } from '@/features/auth/presentation/hooks/use-send-email-code';
import { useVerifyEmailCode } from '@/features/auth/presentation/hooks/use-verify-email-code';
import { useTranslation } from '@/shared/i18n';
import { fonts, spacing, useColors } from '@/shared/theme';
import { Button, IconButton, ThemedText } from '@/shared/ui';

export interface CodeEntryScreenProps {
  email: string;
  onBack: () => void;
  /** Optional: the session listener handles navigation once signed in. */
  onVerified?: () => void;
}

export function CodeEntryScreen({
  email,
  onBack,
  onVerified,
}: CodeEntryScreenProps) {
  const colors = useColors();
  const { t } = useTranslation();
  const [code, setCode] = useState('');
  const [resent, setResent] = useState(false);
  const verify = useVerifyEmailCode();
  const resend = useSendEmailCode();

  const error = verify.error ?? resend.error;
  const isComplete = code.length === EMAIL_CODE_LENGTH;

  async function submit(value: string) {
    if (await verify.verifyCode(email, value)) {
      onVerified?.();
    }
  }

  function handleChange(value: string) {
    setCode(value);
    setResent(false);
    verify.clearError();
    resend.clearError();
    // Submit as soon as the last digit is typed or the code is autofilled.
    if (value.length === EMAIL_CODE_LENGTH && !verify.isVerifying) {
      void submit(value);
    }
  }

  async function handleResend() {
    setCode('');
    verify.clearError();
    setResent(await resend.sendCode(email));
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
            {t('auth.code.title')}
          </ThemedText>
          <ThemedText variant="body" color="textSecondary">
            {t('auth.code.subtitle', { email })}
          </ThemedText>
        </View>

        <View style={{ marginTop: spacing.xl, gap: spacing.sm }}>
          <ThemedText variant="subhead" color="text">
            {t('auth.code.label')}
          </ThemedText>
          <CodeInput
            value={code}
            onChange={handleChange}
            length={EMAIL_CODE_LENGTH}
            accessibilityLabel={t('auth.code.label')}
            error={error !== null}
            editable={!verify.isVerifying}
          />
          {error ? (
            <ThemedText variant="error">{t(`auth.errors.${error}`)}</ThemedText>
          ) : resent ? (
            <ThemedText variant="caption">
              {t('auth.code.codeResent')}
            </ThemedText>
          ) : null}
        </View>

        <View
          style={{
            marginTop: spacing.lg,
            flexDirection: 'row',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: spacing.xs,
          }}
        >
          <ThemedText variant="subhead">{t('auth.code.noCode')}</ThemedText>
          <Pressable
            accessibilityRole="button"
            onPress={handleResend}
            disabled={resend.isSending}
            hitSlop={spacing.sm}
          >
            <ThemedText
              variant="subhead"
              color="primary"
              style={{
                fontFamily: fonts.bold,
                opacity: resend.isSending ? 0.5 : 1,
              }}
            >
              {t('auth.code.resend')}
            </ThemedText>
          </Pressable>
        </View>

        <Button
          size="lg"
          title={t('auth.code.continue')}
          onPress={() => submit(code)}
          loading={verify.isVerifying}
          disabled={!isComplete}
          style={{ marginTop: 'auto' }}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
