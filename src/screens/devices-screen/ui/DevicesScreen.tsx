import { View } from 'react-native';
import { useThemedStyles } from '../../../shared';
import { createDevicesScreenStyles } from './DevicesScreen.styles.ts';
import { DevicesWidget } from '../../../widgets/DevicesWidget';

export function DevicesScreen() {
  const styles = useThemedStyles(createDevicesScreenStyles);

  return (
    <View style={styles.container}>
      <DevicesWidget />
    </View>
  );
}
