import { StyleSheet } from 'react-native';
import { type AppThemeColors } from '../../../../shared';

export const createUserAvatarSelectStyles = (colors: AppThemeColors) =>
  StyleSheet.create({
    sheetContent: {
      gap: 8,
      paddingBottom: 4,
    },
    sheetTitle: {
      color: colors.textPrimary,
      fontSize: 18,
      fontWeight: '700',
      marginBottom: 4,
      textAlign: 'center',
    },
    sheetAction: {
      alignItems: 'center',
      backgroundColor: colors.separator,
      borderCurve: 'continuous',
      borderRadius: 14,
      paddingHorizontal: 12,
      paddingVertical: 14,
    },
    sheetActionPressed: {
      opacity: 0.72,
    },
    sheetActionText: {
      color: colors.textPrimary,
      fontSize: 16,
      fontWeight: '600',
    },
    dismissAction: {
      backgroundColor: colors.accent,
      marginTop: 6,
    },
    dismissActionText: {
      color: colors.textOnAccent,
    },
  });
