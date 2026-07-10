import { memo } from 'react';
import { Text, View } from 'react-native';
import { createToggleThemeStyles } from './ToggleTheme.styles.ts';
import { Switch, useAppTheme, useThemedStyles } from '../../../shared';

export const ToggleTheme = memo(() => {
  const { mode, setThemeMode } = useAppTheme();
  const styles = useThemedStyles(createToggleThemeStyles);
  const isDarkMode = mode === 'dark';

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{isDarkMode ? 'Dark theme' : 'Light theme'}</Text>
      <Switch
        onValueChange={nextValue => setThemeMode(nextValue ? 'dark' : 'light')}
        value={isDarkMode}
      />
    </View>
  );
});
