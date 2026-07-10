import { StyleSheet } from 'react-native';

export const SPINNER_SEGMENT_COUNT = 12;
export const SPINNER_DEGREES_PER_SEGMENT = 360 / SPINNER_SEGMENT_COUNT;

export const SPINNER_SIZES = {
  small: 20,
  large: 36,
} as const;

export type SpinnerSize = keyof typeof SPINNER_SIZES | number;

export function resolveSpinnerSize(size: SpinnerSize): number {
  return typeof size === 'number' ? size : SPINNER_SIZES[size];
}

export function getSegmentOpacities(count: number): number[] {
  return Array.from({ length: count }, (_, index) =>
    Math.max(0.08, 1 - index * (0.92 / (count - 1))),
  );
}

export const spinnerStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinner: {
    position: 'relative',
  },
});
