import { StyleSheet } from 'react-native';
import { type AppThemeColors } from '../../consts';

export const createScreenFallbackStyles = (colors: AppThemeColors) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      backgroundColor: colors.screenBackground,
      flex: 1,
      justifyContent: 'center',
    },
  });
