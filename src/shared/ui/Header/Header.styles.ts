import { StyleSheet } from 'react-native';
import { type AppThemeColors } from '../../consts';

export const HEADER_CONTENT_HEIGHT = 44;

export const createHeaderStyles = (colors: AppThemeColors) =>
  StyleSheet.create({
    backButton: {
      alignItems: 'center',
      borderCurve: 'continuous',
      borderRadius: 22,
      height: HEADER_CONTENT_HEIGHT,
      justifyContent: 'center',
      width: HEADER_CONTENT_HEIGHT,
    },
    backButtonPressed: {
      opacity: 0.6,
    },
    backButtonSpacer: {
      width: HEADER_CONTENT_HEIGHT,
    },
    container: {
      backgroundColor: colors.screenBackground,
    },
    content: {
      alignItems: 'center',
      flexDirection: 'row',
      height: HEADER_CONTENT_HEIGHT,
      paddingHorizontal: 8,
    },
    title: {
      color: colors.textPrimary,
      flex: 1,
      fontSize: 17,
      fontWeight: '600',
      textAlign: 'center',
    },
  });
