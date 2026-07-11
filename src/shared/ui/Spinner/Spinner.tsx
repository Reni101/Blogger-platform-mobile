import { memo, useEffect } from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { useAppTheme } from '../../hooks';
import {
  getSegmentOpacities,
  resolveSpinnerSize,
  SPINNER_DEGREES_PER_SEGMENT,
  SPINNER_SEGMENT_COUNT,
  spinnerStyles,
  type SpinnerSize,
} from './Spinner.styles.ts';

const ROTATION_DURATION_MS = 1000;
const SEGMENT_OPACITIES = getSegmentOpacities(SPINNER_SEGMENT_COUNT);

type SpinnerProps = {
  size?: SpinnerSize;
  color?: string;
  style?: StyleProp<ViewStyle>;
};

export const Spinner = memo(({
  size = 'large',
  color,
  style,
}: SpinnerProps) => {
  const { colors } = useAppTheme();
  const rotation = useSharedValue(0);
  const resolvedSize = resolveSpinnerSize(size);
  const segmentColor = color ?? colors.iconPrimary;
  const segmentWidth = Math.max(2, resolvedSize * 0.07);
  const segmentHeight = Math.max(4, resolvedSize * 0.24);
  const segmentRadius = segmentWidth / 2;
  const orbitRadius = resolvedSize / 2 - segmentHeight / 2;

  useEffect(() => {
    rotation.set(
      withRepeat(
        withTiming(360, {
          duration: ROTATION_DURATION_MS,
          easing: Easing.linear,
        }),
        -1,
        false,
      ),
    );
  }, [rotation]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.get()}deg` }],
  }));

  return (
    <Animated.View
      accessibilityLabel="Loading"
      accessibilityRole="progressbar"
      style={[
        spinnerStyles.container,
        { width: resolvedSize, height: resolvedSize },
        style,
      ]}
    >
      <Animated.View
        style={[
          spinnerStyles.spinner,
          { width: resolvedSize, height: resolvedSize },
          animatedStyle,
        ]}
      >
        {SEGMENT_OPACITIES.map((opacity, index) => (
          <Animated.View
            key={index}
            style={{
              backgroundColor: segmentColor,
              borderCurve: 'continuous',
              borderRadius: segmentRadius,
              height: segmentHeight,
              left: resolvedSize / 2 - segmentWidth / 2,
              opacity,
              position: 'absolute',
              top: resolvedSize / 2 - segmentHeight / 2,
              transform: [
                { rotate: `${index * SPINNER_DEGREES_PER_SEGMENT}deg` },
                { translateY: -orbitRadius },
              ],
              width: segmentWidth,
            }}
          />
        ))}
      </Animated.View>
    </Animated.View>
  );
});
