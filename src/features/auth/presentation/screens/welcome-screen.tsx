import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Trans, useTranslation } from '@/shared/i18n';
import { fonts, radius, spacing, useColors } from '@/shared/theme';
import { Button, ThemedText } from '@/shared/ui';

export interface WelcomeScreenProps {
  onContinueWithEmail: () => void;
  /** Apple and Google sign-in come later; their buttons stay disabled until a handler is passed. */
  onContinueWithApple?: () => void;
  onContinueWithGoogle?: () => void;
}

const noop = () => {};

export function WelcomeScreen({
  onContinueWithEmail,
  // onContinueWithApple,
  onContinueWithGoogle,
}: WelcomeScreenProps) {
  const colors = useColors();
  const { t } = useTranslation();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background,
        paddingHorizontal: spacing.lg,
        paddingTop: spacing.xl,
        paddingBottom: spacing.lg,
      }}
    >
      <View
        style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.sm }}
      >
        <View
          style={{
            width: 36,
            height: 36,
            borderRadius: radius.sm,
            backgroundColor: colors.primary,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ThemedText
            variant="headline"
            style={{ color: colors.onPrimary, fontFamily: fonts.extraBold }}
          >
            Z
          </ThemedText>
        </View>
        <ThemedText variant="headline" style={{ fontFamily: fonts.extraBold }}>
          {t('common.appName')}
        </ThemedText>
      </View>

      <View style={{ marginTop: spacing.xxl, gap: spacing.sm }}>
        <ThemedText variant="title" accessibilityRole="header">
          {t('auth.welcome.title')}
        </ThemedText>
        <ThemedText variant="body" color="textSecondary">
          {t('auth.welcome.subtitle')}
        </ThemedText>
      </View>

      <View style={{ marginTop: 'auto', gap: spacing.sm }}>
        {/* <Button */}
        {/*   size="lg" */}
        {/*   variant="outline" */}
        {/*   title={t('auth.welcome.continueWithApple')} */}
        {/*   icon={<Ionicons name="logo-apple" size={20} color={colors.text} />} */}
        {/*   onPress={onContinueWithApple ?? noop} */}
        {/*   disabled={!onContinueWithApple} */}
        {/* /> */}
        <Button
          size="lg"
          variant="outline"
          title={t('auth.welcome.continueWithGoogle')}
          icon={<Ionicons name="logo-google" size={20} color={colors.text} />}
          onPress={onContinueWithGoogle ?? noop}
          disabled={!onContinueWithGoogle}
        />
        <Button
          size="lg"
          title={t('auth.welcome.continueWithEmail')}
          icon={
            <Ionicons name="mail-outline" size={20} color={colors.onPrimary} />
          }
          onPress={onContinueWithEmail}
        />
        <ThemedText
          variant="caption"
          style={{ textAlign: 'center', marginTop: spacing.sm }}
        >
          <Trans
            i18nKey="auth.welcome.legal"
            components={{
              terms: (
                <ThemedText
                  variant="caption"
                  color="primary"
                  style={{ fontFamily: fonts.bold }}
                />
              ),
              privacy: (
                <ThemedText
                  variant="caption"
                  color="primary"
                  style={{ fontFamily: fonts.bold }}
                />
              ),
            }}
          />
        </ThemedText>
      </View>
    </SafeAreaView>
  );
}
