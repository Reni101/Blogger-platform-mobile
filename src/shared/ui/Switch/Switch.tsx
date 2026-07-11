import { memo, useEffect } from 'react';
import { Pressable, type StyleProp, type ViewStyle } from 'react-native';
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useAppTheme } from '../../hooks';
import {
  SWITCH_THUMB_TRAVEL,
  switchStyles,
} from './Switch.styles.ts';

const ANIMATION_DURATION = 200;

type SwitchProps = {
  value: boolean;
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
  trackColorOff?: string;
  trackColorOn?: string;
  thumbColor?: string;
  style?: StyleProp<ViewStyle>;
};

export const Switch = memo(({
  value,
  onValueChange,
  disabled = false,
  trackColorOff,
  trackColorOn,
  thumbColor,
  style,
}: SwitchProps) => {
  const { colors } = useAppTheme();
  const progress = useSharedValue(value ? 1 : 0);

  const resolvedTrackOff = trackColorOff ?? colors.switchTrackOff;
  const resolvedTrackOn = trackColorOn ?? colors.switchTrackOn;
  const resolvedThumb = thumbColor ?? colors.switchThumb;

  useEffect(() => {
    progress.set(withTiming(value ? 1 : 0, { duration: ANIMATION_DURATION }));
  }, [progress, value]);

  const trackAnimatedStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      progress.get(),
      [0, 1],
      [resolvedTrackOff, resolvedTrackOn],
    ),
  }));

  const thumbAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: interpolate(
          progress.get(),
          [0, 1],
          [0, SWITCH_THUMB_TRAVEL],
        ),
      },
    ],
  }));

  const handlePress = () => {
    if (disabled) {
      return;
    }

    onValueChange(!value);
  };

  return (
    <Pressable
      accessibilityRole="switch"
      accessibilityState={{ checked: value, disabled }}
      disabled={disabled}
      onPress={handlePress}
      style={[
        switchStyles.pressable,
        disabled ? switchStyles.pressableDisabled : null,
        style,
      ]}
    >
      <Animated.View style={[switchStyles.track, trackAnimatedStyle]}>
        <Animated.View
          style={[
            switchStyles.thumb,
            { backgroundColor: resolvedThumb },
            thumbAnimatedStyle,
          ]}
        />
      </Animated.View>
    </Pressable>
  );
});
