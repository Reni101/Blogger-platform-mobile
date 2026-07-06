import { StyleSheet } from 'react-native';
import { type AppThemeColors } from '../../../shared';

export const createProfileWidgetStyles = (colors: AppThemeColors) =>
  StyleSheet.create({
    container: {
      gap: 8,
      maxWidth: 360,
      width: '100%',
    },
    card: {
      backgroundColor: colors.cardBackground,
      borderColor: colors.cardBorder,
      borderCurve: 'continuous',
      borderRadius: 16,
      borderWidth: 1,
      overflow: 'hidden',
    },
    row: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: 12,
      justifyContent: 'space-between',
      minHeight: 68,
      paddingHorizontal: 16,
      paddingVertical: 12,
    },
    rowText: {
      color: colors.textPrimary,
      fontSize: 16,
      fontWeight: '600',
    },
    separator: {
      backgroundColor: colors.separator,
      height: 1,
      marginLeft: 16,
    },
  });
