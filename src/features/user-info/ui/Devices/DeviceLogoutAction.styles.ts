import { StyleSheet } from 'react-native';
import { type AppThemeColors } from '../../../../shared';

export const createDeviceLogoutActionStyles = (colors: AppThemeColors) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: 6,
      marginTop: 4,
    },
    label: {
      color: colors.danger,
      fontSize: 14,
      fontWeight: '600',
    },
    pressed: {
      opacity: 0.65,
    },
  });
