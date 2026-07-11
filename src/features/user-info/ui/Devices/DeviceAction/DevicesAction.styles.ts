import { StyleSheet } from 'react-native';
import { type AppThemeColors } from '../../../../../shared';

export const createDevicesActionStyles = (colors: AppThemeColors) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      flex: 1,
      flexDirection: 'row',
      gap: 12,
      justifyContent: 'space-between',
    },
    label: {
      color: colors.textPrimary,
      fontSize: 16,
      fontWeight: '600',
    },
    iconButton: {
      padding: 4,
    },
    iconButtonPressed: {
      opacity: 0.65,
    },
  });
