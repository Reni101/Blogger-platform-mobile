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
  });
