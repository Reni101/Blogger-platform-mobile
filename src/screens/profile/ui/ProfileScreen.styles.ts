import { StyleSheet } from 'react-native';
import { type AppThemeColors } from '../../../shared';

export const createProfileScreenStyles = (colors: AppThemeColors) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      backgroundColor: colors.screenBackground,
      flex: 1,
      justifyContent: 'center',
    },
  });
