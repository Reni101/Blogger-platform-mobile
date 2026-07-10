import { memo } from 'react';
import { View } from 'react-native';
import {
  AndroidIcon,
  AppleIcon,
  BrowserIcon,
  TabletSmartphoneIcon,
  useAppTheme,
  useThemedStyles,
} from '../../../../shared';
import type { DevicePlatform } from '../../lib/parse-device-title.ts';
import { createDevicePlatformIconStyles } from './DevicePlatformIcon.styles.ts';

type DevicePlatformIconProps = {
  platform: DevicePlatform;
};

export const DevicePlatformIcon = memo(({ platform }: DevicePlatformIconProps) => {
  const { colors } = useAppTheme();
  const styles = useThemedStyles(createDevicePlatformIconStyles);

  const badgeStyle = (() => {
    switch (platform) {
      case 'android':
        return styles.androidBadge;
      case 'apple':
        return styles.appleBadge;
      case 'browser':
        return styles.browserBadge;
      default:
        return styles.unknownBadge;
    }
  })();

  const iconColor = colors.iconOnAccent;
  const iconSize = platform === 'android' ? 22 : 20;

  return (
    <View style={[styles.badge, badgeStyle]}>
      {platform === 'android' ? (
        <AndroidIcon color={iconColor} size={iconSize} />
      ) : null}
      {platform === 'apple' ? (
        <AppleIcon color={iconColor} size={iconSize} />
      ) : null}
      {platform === 'browser' ? (
        <BrowserIcon color={iconColor} size={iconSize} />
      ) : null}
      {platform === 'unknown' ? (
        <TabletSmartphoneIcon color={iconColor} size={iconSize} strokeWidth={2} />
      ) : null}
    </View>
  );
});
