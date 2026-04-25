import React, {
    ReactNode,
    ReactElement,
    isValidElement,
    Children,
} from 'react';
import { SkeletonContextValue } from '../types';

interface NativeWalkOptions {
    ctx: SkeletonContextValue;
    depth?: number;
    keyPrefix?: string;
    skipComponents?: string[];
    Animated: {
        Value: new (value: number) => { interpolate: (config: object) => object };
        View: React.ComponentType<object>;
        loop: (anim: object) => { start: () => void; stop: () => void };
        sequence: (anims: object[]) => object;
        timing: (value: object, config: object) => object;
        spring: (value: object, config: object) => object;
    };
    animatedValue: object;
}

type ViewStyle = object;

interface ViewProps {
    style?: ViewStyle;
    children?: ReactNode;
}

interface TextProps {
    style?: ViewStyle;
    children?: ReactNode;
}

interface ImageProps {
    style?: ViewStyle;
    source?: object;
}

interface PressableProps {
    style?: ViewStyle | ((state: object) => ViewStyle);
    children?: ReactNode;
}

const BLOCK_COMPONENTS = new Set([
    'View', 'ScrollView', 'SafeAreaView', 'FlatList', 'SectionList',
    'KeyboardAvoidingView', 'Modal', 'TouchableOpacity', 'TouchableHighlight',
    'Pressable', 'TouchableNativeFeedback', 'TouchableWithoutFeedback',
]);

const TEXT_COMPONENTS = new Set(['Text', 'TextInput', 'Paragraph', 'Headline']);
const IMAGE_COMPONENTS = new Set(['Image', 'FastImage', 'ImageBackground']);

function getDisplayName(type: ReactElement['type']): string {
    if (typeof type === 'string') return type;
    if (typeof type === 'function') {
        return (type as { displayName?: string; name?: string }).displayName ||
            (type as { displayName?: string; name?: string }).name || '';
    }
    if (typeof type === 'object' && type !== null) {
        return (type as { displayName?: string }).displayName || '';
    }
    return '';
}

const MAX_DEPTH = 40;

/**
 * Attempt to call a function/class component with its props so we can
 * walk the output tree. Returns null on any error.
 */
function tryRenderComponent(
    el: ReactElement<Record<string, unknown>>
): ReactNode | null {
    try {
        const type = el.type;

        // Function component — call it directly
        if (typeof type === 'function') {
            const proto = (type as { prototype?: { render?: unknown } }).prototype;
            if (proto && typeof proto.render === 'function') {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const instance = new (type as any)(el.props);
                instance.props = el.props;
                instance.state = instance.state || {};
                const rendered = instance.render();
                return rendered as ReactNode;
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const result = (type as any)(el.props);
            return result as ReactNode;
        }

        // React.forwardRef / React.memo → unwrap
        if (typeof type === 'object' && type !== null) {
            const objType = type as {
                $$typeof?: symbol;
                render?: (props: unknown, ref: unknown) => ReactNode;
                type?: React.ComponentType<Record<string, unknown>>;
            };

            // forwardRef
            if (typeof objType.render === 'function') {
                return objType.render(el.props, null);
            }
            // memo
            if (objType.type && typeof objType.type === 'function') {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                return (objType.type as any)(el.props);
            }
        }
    } catch {
        // Component might use hooks which throw outside a real render
    }
    return null;
}

export function buildNativeSkeletonTree(
    node: ReactNode,
    opts: NativeWalkOptions
): ReactNode {
    const { ctx, depth = 0, keyPrefix = 'sk', skipComponents = [] } = opts;

    if (depth > MAX_DEPTH) return null;

    if (node === null || node === undefined || node === false || node === true) return null;

    // Arrays / fragments
    if (Array.isArray(node)) {
        const results = node.map((child, i) =>
            buildNativeSkeletonTree(child, { ...opts, depth: depth + 1, keyPrefix: `${keyPrefix}-${i}` })
        );
        return React.createElement(React.Fragment, { key: keyPrefix }, ...results.filter(Boolean));
    }

    if (typeof node === 'string' || typeof node === 'number') {
        const text = String(node).trim();
        if (!text) return null;
        const charWidth = Math.max(40, Math.min(text.length * 8, 280));
        return makeNativeBlock(keyPrefix, ctx, { width: charWidth, height: 14, borderRadius: 7 }, opts);
    }

    if (!isValidElement(node)) return null;

    const el = node as ReactElement<Record<string, unknown>>;
    const displayName = getDisplayName(el.type);

    if (skipComponents.includes(displayName)) return null;

    const isNativePrimitive = 
        IMAGE_COMPONENTS.has(displayName) || 
        TEXT_COMPONENTS.has(displayName) || 
        BLOCK_COMPONENTS.has(displayName) ||
        displayName.startsWith('AnimatedComponent');

    // ── Custom Function / Class components ───────────────────────────────
    if (!isNativePrimitive && (typeof el.type === 'function' || (typeof el.type === 'object' && el.type !== null))) {
        // Try to render the component so we can walk its output tree
        const rendered = tryRenderComponent(el);

        if (rendered != null) {
            return buildNativeSkeletonTree(rendered, {
                ...opts,
                depth: depth + 1,
                keyPrefix,
            });
        }

        // Fallback: check for static children
        const staticChildren = el.props.children as ReactNode;
        if (staticChildren != null) {
            return buildNativeSkeletonTree(staticChildren, {
                ...opts,
                depth: depth + 1,
                keyPrefix,
            });
        }

        // Last resort generic block
        return makeNativeBlock(keyPrefix, ctx, { width: '100%', height: 40, borderRadius: 6 }, opts);
    }

    // ── Native Primitives ───────────────────────────────────────────────

    // Image
    if (IMAGE_COMPONENTS.has(displayName)) {
        const imgProps = el.props as ImageProps;
        const styleAsRecord = (imgProps.style as Record<string, unknown>) || {};
        const w = (styleAsRecord['width'] as number | undefined) || 200;
        const h = (styleAsRecord['height'] as number | undefined) || 200;
        return makeNativeBlock(keyPrefix, ctx, { width: w, height: h, borderRadius: 8 }, opts);
    }

    // Text
    if (TEXT_COMPONENTS.has(displayName)) {
        const textProps = el.props as TextProps;
        const styleAsRecord = (textProps.style as Record<string, unknown>) || {};
        const h = ((styleAsRecord['fontSize'] as number | undefined) || 14) * 1.2;
        const w = (styleAsRecord['width'] as string | number | undefined) || '80%';
        const children = el.props.children as ReactNode;
        if (children != null) {
            const childrenArr = Children.toArray(children);
            return wrapNativeColumn(keyPrefix, ctx, childrenArr.map((c, i) =>
                buildNativeSkeletonTree(c, { ...opts, keyPrefix: `${keyPrefix}-${i}`, depth: depth + 1 })
            ), opts);
        }
        return makeNativeBlock(keyPrefix, ctx, { width: w, height: h, borderRadius: 4 }, opts);
    }

    // Block containers (View, Touchable, etc.)
    if (BLOCK_COMPONENTS.has(displayName) || displayName === '') {
        const viewProps = el.props as ViewProps | PressableProps;
        const styleAsRecord = (typeof viewProps.style === 'function'
            ? (viewProps.style as (state: object) => ViewStyle)({})
            : viewProps.style) as Record<string, unknown> || {};

        const children = el.props.children as ReactNode;
        if (!children) {
            const w = (styleAsRecord['width'] as string | number | undefined) || '100%';
            const h = (styleAsRecord['height'] as number | undefined) || 48;
            const br = (styleAsRecord['borderRadius'] as number | undefined) || ctx.borderRadius;
            return makeNativeBlock(keyPrefix, ctx, { width: w, height: h, borderRadius: Number(br) }, opts);
        }

        const childrenArr = Children.toArray(children);
        const skeletonChildren = childrenArr.map((c, i) =>
            buildNativeSkeletonTree(c, { ...opts, keyPrefix: `${keyPrefix}-${i}`, depth: depth + 1 })
        ).filter(Boolean);

        // Extract layout styles to preserve container geometry
        const layoutStyle: Record<string, unknown> = {};
        const layoutKeys = [
            'flex', 'flexDirection', 'flexWrap', 'justifyContent', 'alignItems',
            'alignSelf', 'gap', 'padding', 'paddingHorizontal', 'paddingVertical',
            'paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight',
            'margin', 'marginHorizontal', 'marginVertical', 'marginTop', 'marginBottom',
            'width', 'height', 'minWidth', 'minHeight', 'maxWidth', 'maxHeight',
            'position', 'top', 'left', 'right', 'bottom', 'overflow',
        ];
        for (const k of layoutKeys) {
            if (styleAsRecord[k] !== undefined) layoutStyle[k] = styleAsRecord[k];
        }

        return React.createElement('__NativeView__' as unknown as string, {
            key: keyPrefix,
            style: layoutStyle,
        }, ...skeletonChildren);
    }

    // Default block if totally unrecognized
    return makeNativeBlock(keyPrefix, ctx, { width: '100%', height: 40, borderRadius: 6 }, opts);
}

function makeNativeBlock(
    key: string,
    ctx: SkeletonContextValue,
    dims: { width: number | string; height: number; borderRadius: number },
    opts: NativeWalkOptions
): ReactElement {
    const animStyle = opts.animatedValue;
    const baseColor = ctx.baseColor;
    const highlightColor = ctx.highlightColor;

    return React.createElement('__NativeAnimated__' as unknown as string, {
        key,
        __skeletonBase: baseColor,
        __skeletonHighlight: highlightColor,
        __animValue: animStyle,
        style: {
            width: dims.width,
            height: dims.height,
            borderRadius: dims.borderRadius,
            backgroundColor: baseColor,
            overflow: 'hidden',
            marginBottom: 6,
        },
    });
}

function wrapNativeColumn(
    key: string,
    _ctx: SkeletonContextValue,
    children: ReactNode[],
    _opts: NativeWalkOptions
): ReactElement {
    return React.createElement('__NativeView__' as unknown as string, {
        key,
        style: { flexDirection: 'column', gap: 4 },
    }, ...children.filter(Boolean));
}
