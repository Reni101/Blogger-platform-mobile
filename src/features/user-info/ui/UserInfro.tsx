import { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useMeQuery } from '../../../entities/user';
import { type AppThemeColors, useThemedStyles } from '../../../shared';

const createUserInfoStyles = (colors: AppThemeColors) =>
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

export const UserInfo = memo(() => {
  const styles = useThemedStyles(createUserInfoStyles);
  const { data } = useMeQuery();

  const login = data?.data.login ?? 'user login';
  const email = data?.data.email ?? 'user@email.com';

  return (
    <View style={styles.container}>
      <View style={styles.avatarPlaceholder}>
        <View style={styles.avatarInner} />
      </View>

      <View style={styles.content}>
        <Text style={styles.login} numberOfLines={1}>
          {login}
        </Text>
        <Text style={styles.email} numberOfLines={1}>
          {email}
        </Text>
      </View>
    </View>
  );
});
