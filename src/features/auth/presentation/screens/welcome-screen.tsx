import { Ionicons } from '@expo/vector-icons';
import { Image, Pressable, useColorScheme, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useSignInWithGoogle } from '@/features/auth/presentation/hooks/use-sign-in-with-google';
import { Trans, useTranslation } from '@/shared/i18n';
import { fonts, spacing, useColors } from '@/shared/theme';
import { Button, IconButton, ThemedText } from '@/shared/ui';

export interface WelcomeScreenProps {
  onContinueWithEmail: () => void;
  /** Shown to visitors who haven't chosen guest mode yet. */
  onBrowseAsGuest?: () => void;
  /** Shown when a guest opened this screen to sign in. */
  onClose?: () => void;
  /** Apple sign-in comes later. */
  onContinueWithApple?: () => void;
}

export function WelcomeScreen({
  onContinueWithEmail,
  onBrowseAsGuest,
  onClose,
}: WelcomeScreenProps) {
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
        paddingTop: onClose ? spacing.sm : spacing.xl,
        paddingBottom: spacing.lg,
      }}
    >
      {onClose && (
        <IconButton
          accessibilityLabel={t('common.close')}
          onPress={onClose}
          style={{ marginLeft: -spacing.sm, marginBottom: spacing.sm }}
        >
          <Ionicons name="close" size={24} color={colors.text} />
        </IconButton>
      )}

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
        {onBrowseAsGuest && (
          <>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: spacing.md,
                marginTop: spacing.xs,
              }}
            >
              <View
                style={{ flex: 1, height: 1, backgroundColor: colors.border }}
              />
              <ThemedText variant="caption">{t('common.or')}</ThemedText>
              <View
                style={{ flex: 1, height: 1, backgroundColor: colors.border }}
              />
            </View>
            <Pressable
              accessibilityRole="button"
              onPress={onBrowseAsGuest}
              disabled={google.isSigningIn}
              hitSlop={spacing.sm}
              style={({ pressed }) => ({
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: spacing.xs,
                paddingVertical: spacing.sm,
                opacity: pressed ? 0.6 : 1,
              })}
            >
              <ThemedText variant="body" style={{ fontFamily: fonts.semiBold }}>
                {t('auth.welcome.browseAsGuest')}
              </ThemedText>
              <Ionicons name="arrow-forward" size={18} color={colors.text} />
            </Pressable>
          </>
        )}
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
