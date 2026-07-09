import { FlatList, View } from 'react-native';
import { useThemedStyles } from '../../../shared';
import { createProfileWidgetStyles } from './ProfileWidget.styles';
import { renderProfileWidgetRow } from './renderProfileWidgetRow.tsx';
import { useProfileFeatureItems } from './profileFeatureItems.tsx';
import { UserInfo } from '../../../features/user-info';

export const ProfileWidget = () => {
  const styles = useThemedStyles(createProfileWidgetStyles);
  const profileFeatureItems = useProfileFeatureItems();
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <UserInfo />
      </View>
      <View style={styles.card}>
        <FlatList
          data={profileFeatureItems}
          keyExtractor={item => item.id}
          renderItem={renderProfileWidgetRow(styles)}
          ItemSeparatorComponent={<View style={styles.separator} />}
          scrollEnabled={false}
        />
      </View>
    </View>
  );
};
