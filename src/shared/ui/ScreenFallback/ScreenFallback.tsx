import { memo } from 'react';
import { View } from 'react-native';
import { useThemedStyles } from '../../hooks';
import { Spinner } from '../Spinner/Spinner.tsx';
import { createScreenFallbackStyles } from './ScreenFallback.styles.ts';

export const ScreenFallback = memo(() => {
  const styles = useThemedStyles(createScreenFallbackStyles);

  return (
    <View style={styles.container}>
      <Spinner />
    </View>
  );
});
