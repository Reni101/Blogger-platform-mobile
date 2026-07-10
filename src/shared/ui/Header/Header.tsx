import { memo } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeftIcon } from '../../assets/svg/arrow-left-icon.tsx';
import { useAppTheme, useThemedStyles } from '../../lib';
import { createHeaderStyles } from './Header.styles.ts';

type HeaderProps = {
  title: string;
  onBackPress?: () => void;
};

export const Header = memo(({ title, onBackPress }: HeaderProps) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const { colors } = useAppTheme();
  const styles = useThemedStyles(createHeaderStyles);

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
      return;
    }

    navigation.goBack();
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.content}>
        <Pressable
          accessibilityLabel="Go back"
          accessibilityRole="button"
          hitSlop={8}
          onPress={handleBackPress}
          style={({ pressed }) => [
            styles.backButton,
            pressed ? styles.backButtonPressed : null,
          ]}
        >
          <ArrowLeftIcon
            color={colors.iconPrimary}
            size={24}
            strokeWidth={2}
          />
        </Pressable>
        <Text numberOfLines={1} style={styles.title}>
          {title}
        </Text>
        <View style={styles.backButtonSpacer} />
      </View>
    </View>
  );
});
