import { StyleSheet } from 'react-native';
import { type AppThemeColors } from '../../../../../shared';

export const createMainDeviceStyles = (colors: AppThemeColors) =>
  StyleSheet.create({
    container: {
      gap: 8,
      width: '100%',
    },
    sectionTitle: {
      color: colors.textPrimary,
      fontSize: 16,
      fontWeight: '600',
      paddingHorizontal: 16,
    },
    card: {
      backgroundColor: colors.cardBackground,
      borderColor: colors.cardBorder,
      borderCurve: 'continuous',
      borderRadius: 16,
      borderWidth: 1,
      overflow: 'hidden',
    },
  });
