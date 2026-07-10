import { memo, useCallback } from 'react';
import { FlatList, Text, View } from 'react-native';
import { useThemedStyles } from '../../../../../shared';
import type { DeviceType } from '../../../model/types/DeviceType.ts';
import { DeviceRow } from '../DeviceRow.tsx';
import { createOtherDevicesStyles } from './OtherDevices.styles.ts';

type OtherDevicesProps = {
  devices: DeviceType[];
};

export const OtherDevices = memo(({ devices }: OtherDevicesProps) => {
  const styles = useThemedStyles(createOtherDevicesStyles);

  const renderItem = useCallback(
    ({ item }: { item: DeviceType }) => (
      <DeviceRow device={item} logoutVariant="other" />
    ),
    [],
  );

  const keyExtractor = useCallback((item: DeviceType) => item.deviceId, []);

  const ItemSeparatorComponent = useCallback(
    () => <View style={styles.separator} />,
    [styles.separator],
  );

  if (devices.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Other devices</Text>
      <View style={styles.card}>
        <FlatList
          data={devices}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          ItemSeparatorComponent={ItemSeparatorComponent}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
});
