import { StyleSheet } from 'react-native';
import { type AppThemeColors } from '../../../../shared';

export const createToggleThemeStyles = (colors: AppThemeColors) =>
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
      flex: 1,
      fontSize: 16,
      fontWeight: '600',
    },
  });
