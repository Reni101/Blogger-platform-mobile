import { FlatList, View } from 'react-native';
import { useThemedStyles } from '../../../shared';
import { createProfileWidgetStyles } from './ProfileWidget.styles';
import { renderProfileWidgetRow } from './renderProfileWidgetRow.tsx';
import { profileFeatureItems } from './profileFeatureItems.tsx';

export const ProfileWidget = () => {
  const styles = useThemedStyles(createProfileWidgetStyles);
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
