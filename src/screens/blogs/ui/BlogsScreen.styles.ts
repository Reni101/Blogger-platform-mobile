import { StyleSheet } from 'react-native';
import { type AppThemeColors } from '../../../shared';

export const createBlogsScreenStyles = (colors: AppThemeColors) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      backgroundColor: colors.screenBackground,
      flex: 1,
      justifyContent: 'center',
    },
    title: {
      color: colors.textPrimary,
      fontSize: 20,
      fontWeight: '600',
    },
  });
