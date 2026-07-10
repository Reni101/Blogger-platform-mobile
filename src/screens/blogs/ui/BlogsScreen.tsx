import { memo } from 'react';
import { Text, View } from 'react-native';
import { useThemedStyles } from '../../../shared';
import { createBlogsScreenStyles } from './BlogsScreen.styles.ts';

export const BlogsScreen = memo(() => {
  const styles = useThemedStyles(createBlogsScreenStyles);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>blogs screen</Text>
    </View>
  );
});
