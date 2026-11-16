import { View } from 'react-native';

import { borderWidth, useColors } from '@/shared/theme';

const RULE_WIDTH = 40;

/** Short gold line under a title — the brand's signature accent. */
export function AccentRule() {
  const colors = useColors();
  return (
    <View
      style={{
        width: RULE_WIDTH,
        height: borderWidth.thin,
        backgroundColor: colors.accent,
      }}
    />
  );
}
