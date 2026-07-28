import { StyleSheet } from 'react-native';
import { type AppThemeColors } from '../../../shared';

export const createUserInfoStyles = (colors: AppThemeColors) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: 16,
      minHeight: 88,
      paddingHorizontal: 16,
      paddingVertical: 16,
    },
    avatarPlaceholder: {
      alignItems: 'center',
      backgroundColor: colors.separator,
      borderColor: colors.cardBorder,
      borderCurve: 'continuous',
      borderRadius: 28,
      borderWidth: 1,
      height: 56,
      justifyContent: 'center',
      overflow: 'hidden',
      width: 56,
    },
    avatarInner: {
      backgroundColor: colors.textMuted,
      borderCurve: 'continuous',
      borderRadius: 20,
      height: 40,
      opacity: 0.18,
      width: 40,
    },
    avatarImage: {
      height: 56,
      width: 56,
    },
    content: {
      flex: 1,
      gap: 4,
      justifyContent: 'center',
    },
    login: {
      color: colors.textPrimary,
      fontSize: 18,
      fontWeight: '700',
    },
    email: {
      color: colors.textSecondary,
      fontSize: 14,
      fontWeight: '500',
    },
  });
