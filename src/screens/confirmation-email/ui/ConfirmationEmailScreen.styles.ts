import { StyleSheet } from 'react-native';
import { type AppThemeColors } from '../../../shared';

export const createConfirmationEmailScreenStyles = (colors: AppThemeColors) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      backgroundColor: colors.screenBackground,
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: 20,
    },
    content: {
      gap: 24,
      maxWidth: 360,
      width: '100%',
    },
    header: {
      alignItems: 'center',
      gap: 12,
    },
    iconBadge: {
      alignItems: 'center',
      backgroundColor: colors.accent,
      borderCurve: 'continuous',
      borderRadius: 28,
      boxShadow: colors.shadowStrong,
      height: 72,
      justifyContent: 'center',
      width: 72,
    },
    title: {
      color: colors.textPrimary,
      fontSize: 28,
      fontWeight: '800',
      textAlign: 'center',
    },
    titleAccent: {
      color: colors.accentContrast,
    },
  });
