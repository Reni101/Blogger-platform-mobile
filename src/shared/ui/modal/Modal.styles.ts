import { StyleSheet } from 'react-native';
import { type AppThemeColors } from '../../consts';

export const createModalStyles = (colors: AppThemeColors) =>
  StyleSheet.create({
    overlay: {
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: 24,
    },
    backdrop: {
      backgroundColor: 'rgba(0, 0, 0, 0.45)',

    },
    content: {
      backgroundColor: colors.cardBackground,
      borderColor: colors.cardBorder,
      borderCurve: 'continuous',
      borderRadius: 20,
      borderWidth: 1,
      boxShadow: colors.shadowStrong,
      maxWidth: 340,
      padding: 24,
      width: '100%',
      zIndex: 1,
    },
  });
