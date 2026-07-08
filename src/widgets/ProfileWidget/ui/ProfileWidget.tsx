import { FlatList, View } from 'react-native';
import { useThemedStyles } from '../../../shared';
import { createProfileWidgetStyles } from './ProfileWidget.styles';
import { renderProfileWidgetRow } from './renderProfileWidgetRow.tsx';
import { useProfileFeatureItems } from './profileFeatureItems.tsx';

const ProfileWidgetSeparator = () => {
  const styles = useThemedStyles(createProfileWidgetStyles);

  return <View style={styles.separator} />;
};

export const ProfileWidget = () => {
  const styles = useThemedStyles(createProfileWidgetStyles);
  const profileFeatureItems = useProfileFeatureItems();
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <FlatList
          data={profileFeatureItems}
          keyExtractor={item => item.id}
          renderItem={renderProfileWidgetRow(styles)}
          ItemSeparatorComponent={ProfileWidgetSeparator}
          scrollEnabled={false}
        />
      </View>
    </View>
  );
};
