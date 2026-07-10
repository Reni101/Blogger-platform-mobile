import { StyleSheet } from 'react-native';
import { type AppThemeColors } from '../../../../shared';

export const createDevicePlatformIconStyles = (colors: AppThemeColors) =>
  StyleSheet.create({
    badge: {
      alignItems: 'center',
      borderCurve: 'continuous',
      borderRadius: 22,
      height: 44,
      justifyContent: 'center',
      width: 44,
    },
    androidBadge: {
      backgroundColor: colors.success,
    },
    appleBadge: {
      backgroundColor: colors.accentContrast,
    },
    browserBadge: {
      backgroundColor: colors.warning,
    },
    unknownBadge: {
      backgroundColor: colors.accent,
    },
  });
