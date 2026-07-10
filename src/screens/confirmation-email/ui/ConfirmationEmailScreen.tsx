import { memo } from 'react';
import { View } from 'react-native';
import { ConfirmationEmailForm } from '../../../features/auth';
import { useThemedStyles } from '../../../shared';
import { createConfirmationEmailScreenStyles } from './ConfirmationEmailScreen.styles.ts';

export const ConfirmationEmailScreen = memo(() => {
  const styles = useThemedStyles(createConfirmationEmailScreenStyles);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <ConfirmationEmailForm />
      </View>
    </View>
  );
});
