import { StyleSheet } from 'react-native';
import { type AppThemeColors } from '../../../../shared';

export const createUserAvatarActionStyles = (colors: AppThemeColors) =>
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
