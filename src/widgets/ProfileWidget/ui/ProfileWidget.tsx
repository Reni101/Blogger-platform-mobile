import { FlatList, Text, View } from 'react-native';
import { Logout } from '../../../features/auth';
import { ToggleTheme } from '../../../features/toggle-theme';
import { useThemedStyles } from '../../../shared';
import { createProfileWidgetStyles } from './ProfileWidget.styles';
import {
  type ProfileWidgetRowItem,
  renderProfileWidgetRow,
} from './renderProfileWidgetRow.tsx';

export const ProfileWidget = () => {
  const styles = useThemedStyles(createProfileWidgetStyles);

  const profileFeatureItems: ProfileWidgetRowItem[] = [
    {
      id: 'theme',
      actionElement: <ToggleTheme />,
    },
    {
      id: 'change-password',
      actionElement: (
        <View>
          <Text style={styles.rowText}>Изменить пароль</Text>
        </View>
      ),
    },
    {
      id: 'change-email',
      actionElement: (
        <View>
          <Text style={styles.rowText}>Изменить email</Text>
        </View>
      ),
    },
    {
      id: 'logout',
      actionElement: <Logout />,
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <FlatList
          data={profileFeatureItems}
          keyExtractor={item => item.id}
          renderItem={renderProfileWidgetRow(styles)}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          scrollEnabled={false}
        />
      </View>
    </View>
  );
};
