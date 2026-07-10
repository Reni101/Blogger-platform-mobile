import { StyleSheet } from 'react-native';
import { type AppThemeColors } from '../../../shared';

export const createDevicesScreenStyles = (colors: AppThemeColors) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.screenBackground,
      flex: 1,
      width: '100%',
    },
  });
