import { StyleSheet } from 'react-native';
import { type AppThemeColors } from '../../consts';

export const createBottomSheetStyles = (colors: AppThemeColors) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    backdrop: {
      ...StyleSheet.absoluteFill,
      backgroundColor: '#000',
    },
    backdropPressable: {
      flex: 1,
    },
    sheet: {
      backgroundColor: colors.cardBackground,
      borderColor: colors.cardBorder,
      borderCurve: 'continuous',
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      borderWidth: 1,
      boxShadow: colors.shadowStrong,
      paddingBottom: 24,
      width: '100%',
    },
    handle: {
      alignSelf: 'center',
      backgroundColor: colors.textMuted,
      borderCurve: 'continuous',
      borderRadius: 999,
      height: 5,
      marginBottom: 12,
      marginTop: 10,
      opacity: 0.45,
      width: 44,
    },
    content: {
      gap: 12,
      paddingHorizontal: 16,
    },
  });
