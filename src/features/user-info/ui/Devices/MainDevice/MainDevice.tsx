import { memo } from 'react';
import { Text, View } from 'react-native';
import { useThemedStyles } from '../../../../../shared';
import type { DeviceType } from '../../../model/types/DeviceType.ts';
import { DeviceRow } from '../DeviceRow.tsx';
import { createMainDeviceStyles } from './MainDevice.styles.ts';

type MainDeviceProps = {
  device: DeviceType;
};

export const MainDevice = memo(({ device }: MainDeviceProps) => {
  const styles = useThemedStyles(createMainDeviceStyles);

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>This device</Text>
      <View style={styles.card}>
        <DeviceRow device={device} />
      </View>
    </View>
  );
});
