import { useMemo, useState } from 'react';
import { FlatList, Switch, Text, View } from 'react-native';
import { Logout } from '../../../features/auth';
import { styles } from './ProfileWidget.styles';
import {
  type ProfileWidgetRowItem,
  renderProfileWidgetRow,
} from './renderProfileWidgetRow.tsx';

export const ProfileWidget = () => {
  const [isDarkThemeEnabled, setIsDarkThemeEnabled] = useState(false);

  const profileFeatureItems = useMemo<ProfileWidgetRowItem[]>(
    () => [
      {
        id: 'theme',
        actionElement: (
          <View>
            <Text>Смена темы</Text>
            <Switch
              onValueChange={setIsDarkThemeEnabled}
              value={isDarkThemeEnabled}
            />
          </View>
        ),
      },
      {
        id: 'change-password',
        actionElement: (
          <View>
            <Text>Изменить пароль</Text>
          </View>
        ),
      },
      {
        id: 'change-email',
        actionElement: (
          <View>
            <Text>Изменить email</Text>
          </View>
        ),
      },
      {
        id: 'logout',
        actionElement: <Logout />,
      },
    ],
    [isDarkThemeEnabled],
  );

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <FlatList
          data={profileFeatureItems}
          keyExtractor={item => item.id}
          renderItem={renderProfileWidgetRow}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          scrollEnabled={false}
        />
      </View>
    </View>
  );
};
