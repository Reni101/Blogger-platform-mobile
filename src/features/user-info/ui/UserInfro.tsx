import { memo } from 'react';
import { Image, Text, View } from 'react-native';
import { useMeQuery } from '../../../entities/user';
import { Spinner, useThemedStyles } from '../../../shared';
import { useAvatarQuery } from '../hooks/useAvatarQuery.ts';
import { createUserInfoStyles } from './UserInfro.styles.ts';

export const UserInfo = memo(() => {
  const styles = useThemedStyles(createUserInfoStyles);
  const { data } = useMeQuery();
  const { data: avatar, isPending: isAvatarPending, } = useAvatarQuery();

  const login = data?.data.login ?? 'user login';
  const email = data?.data.email ?? 'user@email.com';

  return (
    <View style={styles.container}>
      <View style={styles.avatarPlaceholder}>
        {isAvatarPending ? (
          <Spinner size="small" />
        ) : avatar?.uri ? (
          <Image
            source={{ uri: avatar.uri }}
            style={styles.avatarImage}
            resizeMode="cover"
            resizeMethod="resize"
          />
        ) : (
          <View style={styles.avatarInner} />
        )}
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
