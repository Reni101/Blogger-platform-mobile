import { memo } from 'react';
import { Text, View } from 'react-native';
import { useThemedStyles } from '../../../../../shared';
import { parseDeviceTitle } from '../../../lib/parse-device-title.ts';
import type { DeviceType } from '../../../model/types/DeviceType.ts';
import { MainDeviceLogoutAction } from './MainDeviceLogoutAction.tsx';
import { DevicePlatformIcon } from '../DevicePlatformIcon.tsx';
import { createMainDeviceStyles } from './MainDevice.styles.ts';

type MainDeviceProps = {
  device: DeviceType;
};

export const MainDevice = memo(({ device }: MainDeviceProps) => {
  const styles = useThemedStyles(createMainDeviceStyles);
  const { platform, displayTitle } = parseDeviceTitle(device.title);

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>This device</Text>
      <View style={styles.card}>
        <View style={styles.row}>
          <DevicePlatformIcon platform={platform} />
          <View style={styles.content}>
            <Text style={styles.title} numberOfLines={1}>
              {displayTitle}
            </Text>
            <MainDeviceLogoutAction />
          </View>
        </View>
      </View>
    </View>
  );
});
