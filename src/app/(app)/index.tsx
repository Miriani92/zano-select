import { StyleSheet, View } from 'react-native';
import { ThemedText } from '@/shared/ui';
import { useTranslation } from '@/shared/i18n';

export default function App() {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <ThemedText>{t('auth.welcome.title')}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
