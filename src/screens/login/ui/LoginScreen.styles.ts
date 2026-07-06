import { Platform, StyleSheet } from 'react-native';
import { type AppThemeColors } from '../../../shared';

const displayFont = Platform.select({
  ios: 'Avenir Next',
  android: 'sans-serif-medium',
  default: undefined,
});

export const createLoginScreenStyles = (colors: AppThemeColors) =>
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
      fontFamily: displayFont,
      fontSize: 30,
      fontWeight: '800',
      letterSpacing: -0.5,
    },
    titleAccent: {
      color: colors.accentContrast,
      fontFamily: displayFont,
      fontWeight: '800',
    },
  });
