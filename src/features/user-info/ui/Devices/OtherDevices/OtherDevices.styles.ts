import { StyleSheet } from 'react-native';
import { type AppThemeColors } from '../../../../../shared';

export const createOtherDevicesStyles = (colors: AppThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      gap: 8,
      minHeight: 0,
      width: '100%',
    },
    list: {
      flex: 1,
      minHeight: 0,
    },
    sectionTitle: {
      color: colors.textPrimary,
      fontSize: 16,
      fontWeight: '600',
      paddingHorizontal: 16,
    },
    card: {
      backgroundColor: colors.cardBackground,
      borderColor: colors.cardBorder,
      borderCurve: 'continuous',
      borderRadius: 16,
      borderWidth: 1,
      overflow: 'hidden',
    },
    separator: {
      backgroundColor: colors.separator,
      height: 1,
      marginLeft: 72,
    },
  });
