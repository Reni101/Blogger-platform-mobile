import { memo } from 'react';
import { Text, View } from 'react-native';
import { useThemedStyles } from '../../../shared';
import { createQuizGameScreenStyles } from './QuizGameScreen.styles.ts';

export const QuizGameScreen = memo(() => {
  const styles = useThemedStyles(createQuizGameScreenStyles);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quiz game screen</Text>
    </View>
  );
});
