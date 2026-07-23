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
    onDismissedRef.current = onDismissed;

    const sheetHeight = useSharedValue(0);
    const screenHeightValue = useSharedValue(screenHeight);
    const openProgress = useSharedValue(resolvedVisible ? 1 : 0);

    useEffect(() => {
      screenHeightValue.set(screenHeight);
    }, [screenHeight, screenHeightValue]);

    const notifyDismissed = useCallback(() => {
      if (hasNotifiedDismissRef.current) {
        return;
      }
      hasNotifiedDismissRef.current = true;
      onDismissedRef.current?.();
    }, []);

    const handleCloseAnimationEnd = useCallback(() => {
      setIsMounted(false);
      // Prefer Modal.onDismiss on iOS; longer fallback covers transparent
      // modals where onDismiss may not fire. Android has no onDismiss.
      if (Platform.OS === 'ios') {
        setTimeout(notifyDismissed, 0);
      } else {
        notifyDismissed();
      }
    }, [notifyDismissed]);

    const open = useCallback(() => {
      if (!isControlled) {
        setInternalVisible(true);
      }
      onOpen?.();
    }, [isControlled, onOpen]);

    const close = useCallback(() => {
      if (!isControlled) {
        setInternalVisible(false);
      }
      onClose?.();
    }, [isControlled, onClose]);

    useEffect(() => {
      if (resolvedVisible) {
        hasNotifiedDismissRef.current = false;
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

      openProgress.set(
        withTiming(
          0,
          {
            duration: animationDuration,
            easing: Easing.out(Easing.cubic),
          },
          finished => {
            if (finished) {
              scheduleOnRN(handleCloseAnimationEnd);
            }
          },
        ),
      );
    }, [
      animationDuration,
      handleCloseAnimationEnd,
      isMounted,
      openProgress,
      resolvedVisible,
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
      onUpdate: event => {
        if (event.translationY <= 0) {
          return;
        }

        const travel = Math.max(screenHeightValue.get(), 1);
        const nextProgress = 1 - event.translationY / travel;
        openProgress.set(Math.max(0, Math.min(1, nextProgress)));
      },
      onDeactivate: event => {
        const height = Math.max(sheetHeight.get(), 1);
        const threshold = height * closeThreshold;
        const shouldClose =
          event.translationY > threshold || event.velocityY > 900;

        if (shouldClose) {
          scheduleOnRN(close);
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
