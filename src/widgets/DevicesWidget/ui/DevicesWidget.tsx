import { memo } from 'react';
import { View } from 'react-native';
import {
  MainDevice,
  OtherDevices,
  splitDevices,
  useCurrentDeviceId,
  useDevicesQuery,
} from '../../../features/user-info';
import { Spinner, useThemedStyles } from '../../../shared';
import { createDevicesWidgetStyles } from './DevicesWidget.styles.ts';

export const DevicesWidget = memo(() => {
  const styles = useThemedStyles(createDevicesWidgetStyles);
  const currentDeviceId = useCurrentDeviceId();
  const { data, isPending } = useDevicesQuery();

  if (isPending) {
    return (
      <View style={styles.loader}>
        <Spinner />
      </View>
    );
  }

  const devices = data?.data ?? [];
  const { mainDevice, otherDevices } = splitDevices(devices, currentDeviceId);

  return (
    <View style={styles.container}>
      {mainDevice ? <MainDevice device={mainDevice} /> : null}
      <OtherDevices devices={otherDevices} />
    </View>
  );
});
