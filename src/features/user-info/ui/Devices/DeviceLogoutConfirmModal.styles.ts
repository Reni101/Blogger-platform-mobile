import { StyleSheet } from 'react-native';
import { type AppThemeColors } from '../../../../shared';

export const createDeviceLogoutConfirmModalStyles = (colors: AppThemeColors) =>
  StyleSheet.create({
    modalContent: {
      gap: 20,
    },
    modalTitle: {
      color: colors.textPrimary,
      fontSize: 18,
      fontWeight: '600',
      textAlign: 'center',
    },
    modalActions: {
      flexDirection: 'row',
      gap: 12,
    },
    modalButton: {
      alignItems: 'center',
      borderCurve: 'continuous',
      borderRadius: 32,
      flex: 1,
      justifyContent: 'center',
      paddingVertical: 14,
    },
    modalButtonPressed: {
      opacity: 0.85,
    },
    cancelButton: {
      backgroundColor: colors.inputBackground,
      borderColor: colors.inputBorder,
      borderWidth: 1,
    },
    cancelButtonText: {
      color: colors.textPrimary,
      fontSize: 16,
      fontWeight: '600',
    },
    confirmButton: {
      backgroundColor: colors.danger,
    },
    confirmButtonText: {
      color: colors.textOnAccent,
      fontSize: 16,
      fontWeight: '600',
    },
  });
