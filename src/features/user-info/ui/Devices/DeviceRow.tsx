import { memo } from 'react';
import { Text, View } from 'react-native';
import { useThemedStyles } from '../../../../shared';
import { parseDeviceTitle } from '../../lib/parse-device-title.ts';
import type { DeviceType } from '../../model/types/DeviceType.ts';
import { DeviceLogoutAction } from './DeviceLogoutAction.tsx';
import { DevicePlatformIcon } from './DevicePlatformIcon.tsx';
import { createDeviceRowStyles } from './DeviceRow.styles.ts';

type DeviceRowProps = {
  device: DeviceType;
  logoutVariant?: 'main' | 'other';
};

export const DeviceRow = memo(({ device, logoutVariant }: DeviceRowProps) => {
  const styles = useThemedStyles(createDeviceRowStyles);
  const { platform, displayTitle } = parseDeviceTitle(device.title);

  return (
    <View style={styles.container}>
      <DevicePlatformIcon platform={platform} />
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>
          {displayTitle}
        </Text>
        {logoutVariant ? (
          <DeviceLogoutAction
            deviceId={device.deviceId}
            variant={logoutVariant}
          />
        ) : null}
      </View>
    </View>
  );
});
