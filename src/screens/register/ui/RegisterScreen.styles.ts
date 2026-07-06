import { StyleSheet } from 'react-native';
import { type AppThemeColors } from '../../../shared';

export const createRegisterScreenStyles = (colors: AppThemeColors) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      backgroundColor: colors.screenBackground,
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: 24,
    },
    header: {
      alignItems: 'center',
      gap: 14,
      marginBottom: 44,
    },
    iconBadge: {
      alignItems: 'center',
      backgroundColor: colors.accent,
      borderCurve: 'continuous',
      borderRadius: 22,
      boxShadow: colors.shadowStrong,
      height: 68,
      justifyContent: 'center',
      width: 68,
    },
    title: {
      color: colors.textPrimary,
      fontSize: 30,
      fontWeight: '800',
      letterSpacing: -0.5,
    },
    titleAccent: {
      color: colors.accentContrast,
      fontWeight: '800',
    },
  });
