import { Switch, Text, View } from 'react-native';
import { createToggleThemeStyles } from './ToggleTheme.styles.ts';
import { useAppTheme, useThemedStyles } from '../../../../shared';

export function ToggleTheme() {
  const { colors, mode, setThemeMode } = useAppTheme();
  const styles = useThemedStyles(createToggleThemeStyles);
  const isDarkMode = mode === 'dark';

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{isDarkMode ? 'Dark theme' : 'Light theme'}</Text>
      <Switch
        onValueChange={value => setThemeMode(value ? 'dark' : 'light')}
        trackColor={{
          false: colors.switchTrackOff,
          true: colors.switchTrackOn,
        }}
        thumbColor={colors.switchThumb}
        value={isDarkMode}
      />
    </View>
  );
}
