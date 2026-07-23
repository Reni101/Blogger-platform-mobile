import {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import {
  Modal as RNModal,
  Platform,
  Pressable,
  type StyleProp,
  useWindowDimensions,
  type ViewStyle,
  View,
} from 'react-native';
import {
  GestureDetector,
  GestureHandlerRootView,
  usePanGesture,
} from 'react-native-gesture-handler';
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';
import { useThemedStyles } from '../../hooks';
import { createBottomSheetStyles } from './BottomSheet.styles.ts';

const DEFAULT_ANIMATION_DURATION = 260;
const DEFAULT_CLOSE_THRESHOLD = 0.3;
const DEFAULT_BACKDROP_OPACITY = 0.45;
/** Ignore tiny vertical noise so taps on actions don't activate pan. */
const PAN_ACTIVE_OFFSET_Y = 10;

export type BottomSheetControls = {
  open: () => void;
  close: () => void;
  isVisible: boolean;
};

type BottomSheetRenderable =
  | ReactNode
  | ((controls: BottomSheetControls) => ReactNode);

export type BottomSheetProps = {
  children: BottomSheetRenderable;
  trigger?: BottomSheetRenderable;
  isVisible?: boolean;
  defaultVisible?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  /** Fires after the sheet is fully dismissed (safe to present another native modal). */
  onDismissed?: () => void;
  closeOnBackdropPress?: boolean;
  enablePanToClose?: boolean;
  closeThreshold?: number;
  backdropOpacity?: number;
  maxHeight?: number;
  sheetStyle?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  animationDuration?: number;
};

export const BottomSheet = memo(
  ({
    children,
    trigger,
    isVisible,
    defaultVisible = false,
    onOpen,
    onClose,
    onDismissed,
    closeOnBackdropPress = true,
    enablePanToClose = true,
    closeThreshold = DEFAULT_CLOSE_THRESHOLD,
    backdropOpacity = DEFAULT_BACKDROP_OPACITY,
    maxHeight,
    sheetStyle,
    contentContainerStyle,
    animationDuration = DEFAULT_ANIMATION_DURATION,
  }: BottomSheetProps) => {
    const styles = useThemedStyles(createBottomSheetStyles);
    const { height: screenHeight } = useWindowDimensions();

    const isControlled = isVisible !== undefined;
    const [internalVisible, setInternalVisible] = useState(defaultVisible);
    const resolvedVisible = isControlled ? isVisible : internalVisible;
    const [isMounted, setIsMounted] = useState(resolvedVisible);
    const resolvedMaxHeight = maxHeight ?? Math.round(screenHeight * 0.85);
    const onDismissedRef = useRef(onDismissed);
    const hasNotifiedDismissRef = useRef(false);
    const dismissFallbackTimeoutRef = useRef<ReturnType<
      typeof setTimeout
    > | null>(null);
    onDismissedRef.current = onDismissed;

    const sheetHeight = useSharedValue(0);
    const screenHeightValue = useSharedValue(screenHeight);
    const openProgress = useSharedValue(resolvedVisible ? 1 : 0);
    // Blocks pan snap-back while a programmatic / gesture close is in flight.
    const isClosing = useSharedValue(false);

    useEffect(() => {
      // Freeze height while mounted — Android Modal/inset updates otherwise
      // change the interpolate range mid-animation and the sheet jumps.
      if (!isMounted) {
        screenHeightValue.set(screenHeight);
      }
    }, [isMounted, screenHeight, screenHeightValue]);

    useEffect(() => {
      return () => {
        if (dismissFallbackTimeoutRef.current != null) {
          clearTimeout(dismissFallbackTimeoutRef.current);
        }
      };
    }, []);

    const notifyDismissed = useCallback(() => {
      if (hasNotifiedDismissRef.current) {
        return;
      }
      hasNotifiedDismissRef.current = true;
      if (dismissFallbackTimeoutRef.current != null) {
        clearTimeout(dismissFallbackTimeoutRef.current);
        dismissFallbackTimeoutRef.current = null;
      }
      onDismissedRef.current?.();
    }, []);

    const handleCloseAnimationEnd = useCallback(() => {
      setIsMounted(false);
      // Android has no Modal.onDismiss. On iOS prefer onDismiss; short
      // fallback covers transparent modals where it may not fire — long
      // enough for native teardown, short enough to avoid dead air before
      // chaining into another native presenter (camera / PHPicker).
      if (Platform.OS === 'ios') {
        dismissFallbackTimeoutRef.current = setTimeout(notifyDismissed, 100);
      } else {
        notifyDismissed();
      }
    }, [notifyDismissed]);

    const runCloseAnimation = useCallback(() => {
      openProgress.set(
        withTiming(
          0,
          {
            duration: animationDuration,
            easing: Easing.in(Easing.cubic),
          },
          finished => {
            if (finished) {
              scheduleOnRN(handleCloseAnimationEnd);
            }
          },
        ),
      );
    }, [animationDuration, handleCloseAnimationEnd, openProgress]);

    const syncClosedState = useCallback(() => {
      if (!isControlled) {
        setInternalVisible(false);
      }
      onClose?.();
    }, [isControlled, onClose]);

    const open = useCallback(() => {
      if (!isControlled) {
        setInternalVisible(true);
      }
      onOpen?.();
    }, [isControlled, onOpen]);

    const close = useCallback(() => {
      if (isClosing.get()) {
        syncClosedState();
        return;
      }

      isClosing.set(true);
      // Start animation immediately — waiting for the visibility useEffect
      // leaves a frame gap that reads as a jump on Android.
      runCloseAnimation();
      syncClosedState();
    }, [isClosing, runCloseAnimation, syncClosedState]);

    useEffect(() => {
      if (resolvedVisible) {
        hasNotifiedDismissRef.current = false;
        isClosing.set(false);
        openProgress.set(0);
        setIsMounted(true);

        const startOpenAnimation = () => {
          openProgress.set(
            withTiming(1, {
              duration: animationDuration,
              easing: Easing.out(Easing.cubic),
            }),
          );
        };

        // Wait one frame so Modal paints the sheet off-screen before animating.
        if (Platform.OS === 'android') {
          requestAnimationFrame(startOpenAnimation);
        } else {
          startOpenAnimation();
        }
        return;
      }

      if (!isMounted) {
        return;
      }

      // close() / pan already own the animation — only finish if we're at rest.
      if (isClosing.get()) {
        if (openProgress.get() <= 0.001) {
          handleCloseAnimationEnd();
        }
        return;
      }

      // Controlled hide from parent without going through close().
      isClosing.set(true);

      if (openProgress.get() <= 0.001) {
        handleCloseAnimationEnd();
        return;
      }

      runCloseAnimation();
    }, [
      animationDuration,
      handleCloseAnimationEnd,
      isClosing,
      isMounted,
      openProgress,
      resolvedVisible,
      runCloseAnimation,
    ]);

    const controls = useMemo<BottomSheetControls>(
      () => ({
        open,
        close,
        isVisible: resolvedVisible,
      }),
      [close, open, resolvedVisible],
    );

    const panGesture = usePanGesture({
      enabled: enablePanToClose,
      // Require intentional downward drag so Dismiss / action taps don't arm pan
      // and later fight close() with a snap-back to openProgress=1.
      activeOffsetY: PAN_ACTIVE_OFFSET_Y,
      failOffsetX: [-25, 25],
      onUpdate: event => {
        if (isClosing.get() || event.translationY <= 0) {
          return;
        }

        const travel = Math.max(screenHeightValue.get(), 1);
        const nextProgress = 1 - event.translationY / travel;
        openProgress.set(Math.max(0, Math.min(1, nextProgress)));
      },
      onDeactivate: event => {
        if (isClosing.get()) {
          return;
        }

        const height = Math.max(sheetHeight.get(), 1);
        const threshold = height * closeThreshold;
        const shouldClose =
          event.translationY > threshold || event.velocityY > 900;

        if (shouldClose) {
          isClosing.set(true);
          // Animate on the UI thread first — waiting for React close() makes
          // Android hitch / jump between finger-up and withTiming start.
          openProgress.set(
            withTiming(
              0,
              {
                duration: animationDuration,
                easing: Easing.in(Easing.cubic),
              },
              finished => {
                if (finished) {
                  scheduleOnRN(syncClosedState);
                  scheduleOnRN(handleCloseAnimationEnd);
                }
              },
            ),
          );
          return;
        }

        openProgress.set(
          withTiming(1, {
            duration: animationDuration,
            easing: Easing.out(Easing.cubic),
          }),
        );
      },
    });

    const backdropAnimatedStyle = useAnimatedStyle(() => ({
      opacity: interpolate(openProgress.get(), [0, 1], [0, backdropOpacity]),
    }));

    const sheetAnimatedStyle = useAnimatedStyle(() => ({
      transform: [
        {
          translateY: interpolate(
            openProgress.get(),
            [0, 1],
            [screenHeightValue.get(), 0],
          ),
        },
      ],
    }));

    const triggerNode =
      typeof trigger === 'function' ? (
        trigger(controls)
      ) : trigger ? (
        <Pressable accessibilityRole="button" onPress={open}>
          {trigger}
        </Pressable>
      ) : null;

    const contentNode =
      typeof children === 'function' ? children(controls) : children;

    return (
      <>
        {triggerNode}
        <RNModal
          animationType="none"
          onDismiss={notifyDismissed}
          onRequestClose={close}
          statusBarTranslucent
          transparent
          visible={isMounted}
        >
          <GestureHandlerRootView style={styles.overlay}>
            <Animated.View style={[styles.backdrop, backdropAnimatedStyle]}>
              <Pressable
                accessibilityLabel="Close bottom sheet"
                accessibilityRole="button"
                disabled={!closeOnBackdropPress}
                onPress={closeOnBackdropPress ? close : undefined}
                style={styles.backdropPressable}
              />
            </Animated.View>

            <GestureDetector gesture={panGesture}>
              <Animated.View
                onLayout={event => {
                  const { height } = event.nativeEvent.layout;
                  if (sheetHeight.get() !== height) {
                    sheetHeight.set(height);
                  }
                }}
                style={[
                  styles.sheet,
                  { maxHeight: resolvedMaxHeight },
                  sheetStyle,
                  sheetAnimatedStyle,
                ]}
              >
                <View style={styles.handle} />
                <View style={[styles.content, contentContainerStyle]}>
                  {contentNode}
                </View>
              </Animated.View>
            </GestureDetector>
          </GestureHandlerRootView>
        </RNModal>
      </>
    );
  },
);
