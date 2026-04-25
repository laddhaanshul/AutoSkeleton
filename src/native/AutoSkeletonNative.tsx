import React, {
    ReactNode,
    ReactElement,
    isValidElement,
    Children,
    useEffect,
    useRef,
    useState,
} from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore — react-native is a peer dependency provided by the consumer
import {
    View,
    Animated,
    StyleSheet,
    ViewStyle,
    Platform,
} from 'react-native';
import { AutoSkeletonProps, SkeletonContextValue } from '../types';
import {
    DEFAULT_ANIMATION,
    DEFAULT_BORDER_RADIUS,
    DEFAULT_SPEED,
    DEFAULT_THEME,
    resolveColors,
} from '../utils/constants';
import { buildNativeSkeletonTree } from './nativeSkeletonBuilder';

// ─── Shimmer Block ────────────────────────────────────────────────────────────

interface ShimmerBlockProps {
    animValue: Animated.Value;
    baseColor: string;
    highlightColor: string;
    style?: ViewStyle;
}

function ShimmerBlock({ animValue, baseColor, highlightColor, style }: ShimmerBlockProps) {
    const backgroundColor = animValue.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [baseColor, highlightColor, baseColor],
    });

    return (
        <Animated.View
            style={[
                {
                    backgroundColor,
                },
                style,
            ]}
        />
    );
}

// ─── Tree resolver ───────────────────────────────────────────────────────────

/**
 * Post-process the skeleton tree produced by buildNativeSkeletonTree, replacing
 * sentinel element types with real React Native components.
 */
function resolveNativeTree(
    node: ReactNode,
    animValue: Animated.Value,
    baseColor: string,
    highlightColor: string
): ReactNode {
    if (node === null || node === undefined) return null;
    if (!isValidElement(node)) return null;

    const el = node as ReactElement<Record<string, unknown>>;
    const elType = el.type as string;

    if (elType === '__NativeAnimated__') {
        const s = el.props['style'] as ViewStyle | undefined;
        return (
            <ShimmerBlock
                key={el.key ?? undefined}
                animValue={animValue}
                baseColor={baseColor}
                highlightColor={highlightColor}
                style={s}
            />
        );
    }

    if (elType === '__NativeView__') {
        const s = el.props['style'] as ViewStyle | undefined;
        const childrenProp = el.props['children'] as ReactNode;
        const childrenArr = Children.toArray(childrenProp);
        return (
            <View key={el.key ?? undefined} style={s}>
                {childrenArr.map((c) => resolveNativeTree(c, animValue, baseColor, highlightColor))}
            </View>
        );
    }

    return null;
}

// ─── AutoSkeletonNative ───────────────────────────────────────────────────────

/**
 * AutoSkeleton for React Native.
 *
 * @example
 * ```tsx
 * import { AutoSkeleton } from 'auto-skeleton/native';
 *
 * <AutoSkeleton isLoading={isLoading}>
 *   <UserCard user={user} />
 * </AutoSkeleton>
 * ```
 */
export function AutoSkeleton({
    isLoading,
    children,
    animation = DEFAULT_ANIMATION,
    theme = DEFAULT_THEME,
    borderRadius = DEFAULT_BORDER_RADIUS,
    speed = DEFAULT_SPEED,
    baseColor,
    highlightColor,
    skipComponents = [],
    delay = 0,
}: AutoSkeletonProps) {
    const animValue = useRef(new Animated.Value(0)).current;
    const loopRef = useRef<Animated.CompositeAnimation | null>(null);
    const [showSkeleton, setShowSkeleton] = useState(isLoading);

    // Delay logic
    useEffect(() => {
        if (isLoading) {
            if (delay > 0) {
                const t = setTimeout(() => setShowSkeleton(true), delay);
                return () => clearTimeout(t);
            }
            setShowSkeleton(true);
        } else {
            setShowSkeleton(false);
        }
        return undefined;
    }, [isLoading, delay]);

    // Animation loop
    useEffect(() => {
        if (!showSkeleton) {
            loopRef.current?.stop();
            animValue.setValue(0);
            return;
        }

        const duration = speed * 1000;

        if (animation === 'wave' || animation === 'pulse') {
            loopRef.current = Animated.loop(
                Animated.sequence([
                    Animated.timing(animValue, {
                        toValue: 1,
                        duration: duration / 2,
                        useNativeDriver: Platform.OS !== 'web',
                    }),
                    Animated.timing(animValue, {
                        toValue: 0,
                        duration: duration / 2,
                        useNativeDriver: Platform.OS !== 'web',
                    }),
                ])
            );
            loopRef.current.start();
        }

        return () => {
            loopRef.current?.stop();
        };
    }, [showSkeleton, animation, speed, animValue]);

    const colors = resolveColors(theme, baseColor, highlightColor);

    if (!showSkeleton) {
        return <>{children}</>;
    }

    const ctx: SkeletonContextValue = {
        animation,
        theme,
        borderRadius,
        speed,
        baseColor: colors.base,
        highlightColor: colors.highlight,
    };

    const dummyAnimated = {
        Value: Animated.Value,
        View: Animated.View,
        loop: Animated.loop,
        sequence: Animated.sequence,
        timing: Animated.timing,
        spring: Animated.spring,
    };

    const rawTree = buildNativeSkeletonTree(children, {
        ctx,
        skipComponents,
        animatedValue: animValue,
        Animated: dummyAnimated as never,
    });

    const resolved = resolveNativeTree(rawTree, animValue, colors.base, colors.highlight);

    return <View style={styles.container}>{resolved}</View>;
}

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
    },
});

export default AutoSkeleton;
