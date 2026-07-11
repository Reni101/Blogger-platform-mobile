import { memo, useState } from 'react';
import {
  FlatList,
  ScrollView,
  Text,
  View,
  type LayoutChangeEvent,
} from 'react-native';
import { useThemedStyles } from '../../../../../shared';
import type { DeviceType } from '../../../model/types/DeviceType.ts';
import { OtherDeviceItem } from './OtherDeviceItem.tsx';
import { createOtherDevicesStyles } from './OtherDevices.styles.ts';

type OtherDevicesProps = {
  devices: DeviceType[];
};

export const OtherDevices = memo(({ devices }: OtherDevicesProps) => {
  const styles = useThemedStyles(createOtherDevicesStyles);
  const [containerHeight, setContainerHeight] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);

  const isScrollable =
    containerHeight > 0 && contentHeight > containerHeight;

  const handleContainerLayout = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    setContainerHeight(prev => (prev === height ? prev : height));
  };

  const handleContentSizeChange = (_width: number, height: number) => {
    setContentHeight(prev => (prev === height ? prev : height));
  };

  if (devices.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Other devices</Text>
      <ScrollView
        style={styles.list}
        scrollEnabled={isScrollable}
        bounces
        alwaysBounceVertical={false}
        overScrollMode="never"
        showsVerticalScrollIndicator={isScrollable}
        onLayout={handleContainerLayout}
        onContentSizeChange={handleContentSizeChange}
      >
        <View style={styles.card}>
          <FlatList
            data={devices}
            scrollEnabled={false}
            keyExtractor={item => item.deviceId}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            renderItem={({ item }) => <OtherDeviceItem device={item} />}
          />
        </View>
      </ScrollView>
    </View>
  );
});
