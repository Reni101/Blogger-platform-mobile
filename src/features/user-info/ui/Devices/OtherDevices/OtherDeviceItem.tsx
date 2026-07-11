import { memo } from 'react';
import { Text, View } from 'react-native';
import { useThemedStyles } from '../../../../../shared';
import { parseDeviceTitle } from '../../../lib/parse-device-title.ts';
import type { DeviceType } from '../../../model/types/DeviceType.ts';
import { OtherDeviceLogoutAction } from './OtherDeviceLogoutAction.tsx';
import { DevicePlatformIcon } from '../DevicePlatformIcon.tsx';
import { createOtherDeviceItemStyles } from './OtherDeviceItem.styles.ts';

type OtherDeviceItemProps = {
  device: DeviceType;
};

export const OtherDeviceItem = memo(({ device }: OtherDeviceItemProps) => {
  const styles = useThemedStyles(createOtherDeviceItemStyles);
  const { platform, displayTitle } = parseDeviceTitle(device.title);

  return (
    <View style={styles.row}>
      <DevicePlatformIcon platform={platform} />
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>
          {displayTitle}
        </Text>
        <OtherDeviceLogoutAction deviceId={device.deviceId} />
      </View>
    </View>
  );
});
