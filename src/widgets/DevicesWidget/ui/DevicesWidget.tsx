import { memo } from 'react';
import { View } from 'react-native';
import {
  MainDevice,
  OtherDevices,
  useDevicesQuery,
} from '../../../features/user-info';
import { Spinner, useThemedStyles } from '../../../shared';
import { createDevicesWidgetStyles } from './DevicesWidget.styles.ts';

export const DevicesWidget = memo(() => {
  const styles = useThemedStyles(createDevicesWidgetStyles);
  const { data, isPending } = useDevicesQuery();

  if (isPending) {
    return (
      <View style={styles.loader}>
        <Spinner />
      </View>
    );
  }

  const mainDevice = data?.mainDevice ?? null;
  const otherDevices = data?.otherDevices ?? [];

  return (
    <View style={styles.container}>
      {mainDevice ? <MainDevice device={mainDevice} /> : null}
      <OtherDevices devices={otherDevices} />
    </View>
  );
});
