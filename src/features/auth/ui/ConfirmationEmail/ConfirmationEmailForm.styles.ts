import { StyleSheet } from 'react-native';
import { type AppThemeColors } from '../../../../shared';

export const createConfirmationEmailStyles = (colors: AppThemeColors) =>
  StyleSheet.create({
    container: {
      gap: 8,
      width: '100%',
    },
    infoText: {
      color: colors.textSecondary,
      fontSize: 14,
      lineHeight: 20,
      paddingHorizontal: 4,
    },
    inputRow: {
      alignItems: 'center',
      backgroundColor: colors.inputBackground,
      borderColor: colors.inputBorder,
      borderCurve: 'continuous',
      borderRadius: 32,
      borderWidth: 1.5,
      boxShadow: colors.shadowSoft,
      flexDirection: 'row',
      gap: 12,
      paddingHorizontal: 22,
      paddingVertical: 16,
    },
    input: {
      color: colors.textPrimary,
      flex: 1,
      fontSize: 16,
      padding: 0,
    },
    iconText: {
      color: colors.iconPrimary,
      fontSize: 18,
      fontWeight: '700',
      width: 22,
    },
    errorSlot: {
      justifyContent: 'center',
      minHeight: 20,
      paddingTop: 4,
    },
    errorText: {
      color: colors.danger,
      fontSize: 13,
      paddingHorizontal: 22,
    },
    successText: {
      color: colors.success,
      fontSize: 14,
      paddingHorizontal: 4,
    },
    button: {
      alignItems: 'center',
      backgroundColor: colors.accent,
      borderCurve: 'continuous',
      borderRadius: 32,
      justifyContent: 'center',
      marginTop: 8,
      paddingVertical: 18,
    },
    buttonPressed: {
      opacity: 0.85,
    },
    buttonText: {
      color: colors.textOnAccent,
      fontSize: 18,
      fontWeight: '700',
      letterSpacing: 1,
    },
    secondaryButton: {
      alignItems: 'center',
      backgroundColor: colors.cardBackground,
      borderColor: colors.cardBorder,
      borderCurve: 'continuous',
      borderRadius: 32,
      borderWidth: 1,
      justifyContent: 'center',
      marginTop: 4,
      paddingVertical: 18,
    },
    secondaryButtonText: {
      color: colors.textPrimary,
      fontSize: 16,
      fontWeight: '600',
    },
  });
