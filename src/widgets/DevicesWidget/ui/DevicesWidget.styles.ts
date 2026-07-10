import { StyleSheet } from 'react-native';
import { type AppThemeColors } from '../../../shared';

export const createDevicesWidgetStyles = (colors: AppThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      gap: 16,
      paddingHorizontal: 16,
      paddingTop: 16,
      width: '100%',
    },
    loader: {
      alignItems: 'center',
      backgroundColor: colors.screenBackground,
      flex: 1,
      justifyContent: 'center',
      width: '100%',
    },
  });
