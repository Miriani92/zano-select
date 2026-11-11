import { Ionicons } from '@expo/vector-icons';
import { Image, useColorScheme, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useSignInWithGoogle } from '@/features/auth/presentation/hooks/use-sign-in-with-google';
import { Trans, useTranslation } from '@/shared/i18n';
import { fonts, spacing, useColors } from '@/shared/theme';
import { Button, ThemedText } from '@/shared/ui';

export interface WelcomeScreenProps {
  onContinueWithEmail: () => void;
  /** Apple sign-in comes later. */
  onContinueWithApple?: () => void;
}

export function WelcomeScreen({ onContinueWithEmail }: WelcomeScreenProps) {
  const colors = useColors();
  const scheme = useColorScheme();
  const { t } = useTranslation();
  const google = useSignInWithGoogle();

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
      {/* Same wordmark as the splash screen, so launch → welcome feels continuous. */}
      <Image
        source={
          scheme === 'dark'
            ? require('@/assets/images/logo-wordmark-dark.png')
            : require('@/assets/images/logo-wordmark.png')
        }
        accessibilityRole="image"
        accessibilityLabel={t('common.appName')}
        resizeMode="contain"
        style={{ width: 190, height: 78, alignSelf: 'center' }}
      />

      <View style={{ marginTop: spacing.xxl, gap: spacing.sm }}>
        <ThemedText variant="title" accessibilityRole="header">
          {t('auth.welcome.title')}
        </ThemedText>
        <View
          style={{ width: 40, height: 1, backgroundColor: colors.accent }}
        />
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
          onPress={google.signIn}
          loading={google.isSigningIn}
        />
        <Button
          size="lg"
          title={t('auth.welcome.continueWithEmail')}
          icon={
            <Ionicons name="mail-outline" size={20} color={colors.onPrimary} />
          }
          onPress={onContinueWithEmail}
          disabled={google.isSigningIn}
        />
        {google.error && (
          <ThemedText
            variant="caption"
            color="error"
            accessibilityRole="alert"
            style={{ textAlign: 'center' }}
          >
            {t(`auth.errors.${google.error}`)}
          </ThemedText>
        )}
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
