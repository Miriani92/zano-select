import { StyleSheet, View } from 'react-native';

import { SignOutButton } from '@/features/auth/presentation/components/sign-out-button';
import { useTranslation } from '@/shared/i18n';
import { spacing } from '@/shared/theme';
import { ThemedText } from '@/shared/ui';

// Placeholder until the home/profile features exist; the log-out button moves to profile then.
export default function App() {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <ThemedText>{t('auth.welcome.title')}</ThemedText>
      <SignOutButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.lg,
    padding: spacing.lg,
  },
});
