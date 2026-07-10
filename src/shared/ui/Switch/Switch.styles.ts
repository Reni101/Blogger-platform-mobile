import { StyleSheet } from 'react-native';

export const SWITCH_TRACK_WIDTH = 44;
export const SWITCH_TRACK_HEIGHT = 26;
export const SWITCH_THUMB_SIZE = 22;
export const SWITCH_THUMB_PADDING = 2;
export const SWITCH_THUMB_TRAVEL =
  SWITCH_TRACK_WIDTH - SWITCH_THUMB_SIZE - SWITCH_THUMB_PADDING * 2;

export const switchStyles = StyleSheet.create({
  pressable: {
    borderCurve: 'continuous',
  },
  pressableDisabled: {
    opacity: 0.5,
  },
  track: {
    borderCurve: 'continuous',
    borderRadius: SWITCH_TRACK_HEIGHT / 2,
    height: SWITCH_TRACK_HEIGHT,
    justifyContent: 'center',
    width: SWITCH_TRACK_WIDTH,
  },
  thumb: {
    borderCurve: 'continuous',
    borderRadius: SWITCH_THUMB_SIZE / 2,
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.2)',
    height: SWITCH_THUMB_SIZE,
    left: SWITCH_THUMB_PADDING,
    position: 'absolute',
    width: SWITCH_THUMB_SIZE,
  },
});
