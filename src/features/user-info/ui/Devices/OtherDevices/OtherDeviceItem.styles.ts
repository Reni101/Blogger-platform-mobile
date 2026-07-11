import { StyleSheet } from 'react-native';
import { type AppThemeColors } from '../../../../../shared';

export const createOtherDeviceItemStyles = (colors: AppThemeColors) =>
  StyleSheet.create({
    row: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: 12,
      paddingHorizontal: 16,
      paddingVertical: 12,
    },
    content: {
      flex: 1,
      minWidth: 0,
    },
    title: {
      color: colors.textPrimary,
      fontSize: 16,
      fontWeight: '700',
    },
  });
