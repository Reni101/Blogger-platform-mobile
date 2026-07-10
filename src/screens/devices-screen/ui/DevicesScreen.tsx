import { memo } from 'react';
import { View } from 'react-native';
import { useThemedStyles } from '../../../shared';
import { createDevicesScreenStyles } from './DevicesScreen.styles.ts';
import { DevicesWidget } from '../../../widgets/DevicesWidget';

export const DevicesScreen = memo(() => {
  const styles = useThemedStyles(createDevicesScreenStyles);

  return (
    <View style={styles.container}>
      <DevicesWidget />
    </View>
  );
});
