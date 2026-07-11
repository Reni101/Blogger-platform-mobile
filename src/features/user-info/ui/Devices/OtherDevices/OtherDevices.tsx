import { memo } from 'react';
import { FlatList, Text, View } from 'react-native';
import { useThemedStyles } from '../../../../../shared';
import type { DeviceType } from '../../../model/types/DeviceType.ts';
import { OtherDeviceItem } from './OtherDeviceItem.tsx';
import { createOtherDevicesStyles } from './OtherDevices.styles.ts';

type OtherDevicesProps = {
  devices: DeviceType[];
};

export const OtherDevices = memo(({ devices }: OtherDevicesProps) => {
  const styles = useThemedStyles(createOtherDevicesStyles);

  if (devices.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Other devices</Text>
      <View style={styles.card}>
        <FlatList
          data={devices}
          keyExtractor={(item) => item.deviceId}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          renderItem={({ item }) => <OtherDeviceItem device={item} />}
        />
      </View>
    </View>
  );
});
