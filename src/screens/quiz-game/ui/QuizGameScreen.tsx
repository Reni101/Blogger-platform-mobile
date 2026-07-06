import { Text, View } from 'react-native';
import { useThemedStyles } from '../../../shared';
import { createQuizGameScreenStyles } from './QuizGameScreen.styles.ts';

export function QuizGameScreen() {
  const styles = useThemedStyles(createQuizGameScreenStyles);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tracks screen</Text>
    </View>
  );
}
