import React, {
    ReactNode,
    ReactElement,
    isValidElement,
    Children,
    CSSProperties,
} from 'react';
import { SkeletonContextValue } from '../types';
import {
    isImageElement,
    isInlineElement,
    isSkippableElement,
} from '../utils/constants';

interface WalkOptions {
    ctx: SkeletonContextValue;
    depth?: number;
    keyPrefix?: string;
    skipComponents?: string[];
    debug?: boolean;
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
            // Detect class component by checking for render method on prototype
            const proto = (type as { prototype?: { render?: unknown } }).prototype;
            if (proto && typeof proto.render === 'function') {
                // Class component — instantiate and call render
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const instance = new (type as any)(el.props);
                instance.props = el.props;
                instance.state = instance.state || {};
                const rendered = instance.render();
                return rendered as ReactNode;
            }
            // Function component (including arrow functions & hooks)
            // We pass a stub context; hooks that use external state will just
            // return early or return undefined which we handle gracefully.
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
        // Component might use hooks (useState, useContext etc.) which throw
        // outside a React render — that's fine, we fall back to a block.
    }
    return null;
}

export function extractLayoutStyle(childStyle?: CSSProperties): CSSProperties {
    const layoutStyle: CSSProperties = {};
    if (childStyle) {
        const layoutProps: (keyof CSSProperties)[] = [
            'display', 'flexDirection', 'flexWrap', 'justifyContent', 'alignItems',
            'alignContent', 'gap', 'columnGap', 'rowGap', 'gridTemplateColumns',
            'gridTemplateRows', 'padding', 'paddingTop', 'paddingBottom', 'paddingLeft',
            'paddingRight', 'margin', 'marginTop', 'marginBottom', 'marginLeft', 'marginRight',
            'width', 'height', 'minWidth', 'minHeight', 'maxWidth', 'maxHeight',
            'flex', 'flexGrow', 'flexShrink', 'flexBasis', 'overflow',
            'position', 'top', 'left', 'right', 'bottom',
        ];
        for (const prop of layoutProps) {
            if ((childStyle as Record<string, unknown>)[prop as string] !== undefined) {
                (layoutStyle as Record<string, unknown>)[prop as string] =
                    (childStyle as Record<string, unknown>)[prop as string];
            }
        }
    }
    return layoutStyle;
}

/**
 * Recursively walks a React tree and replaces each renderable node with a
 * matching skeleton placeholder that preserves layout.
 */
export function buildSkeletonTree(
    node: ReactNode,
    opts: WalkOptions
): ReactNode {
    const { ctx, depth = 0, keyPrefix = 'sk', skipComponents = [], debug } = opts;

    if (depth > MAX_DEPTH) return null;

    if (node === null || node === undefined || node === false || node === true) {
        return null;
    }

    // Arrays / fragments
    if (Array.isArray(node)) {
        const results = node.map((child, i) =>
            buildSkeletonTree(child, { ...opts, depth: depth + 1, keyPrefix: `${keyPrefix}-${i}` })
        );
        return React.createElement(React.Fragment, { key: keyPrefix }, ...results.filter(Boolean));
    }

    // Plain text node
    if (typeof node === 'string' || typeof node === 'number') {
        const text = String(node).trim();
        if (!text) return null;
        const charWidth = Math.max(40, Math.min(text.length * 8, 300));
        return makeSkeletonElement({
            key: keyPrefix,
            ctx,
            width: charWidth,
            height: '0.85em',
            variant: 'text',
            debug,
        });
    }

    if (!isValidElement(node)) return null;

    const el = node as ReactElement<Record<string, unknown>>;
    const elType = el.type;

    // ── Function / class components ──────────────────────────────────────
    if (typeof elType === 'function' || (typeof elType === 'object' && elType !== null)) {
        const displayName =
            (elType as { displayName?: string; name?: string }).displayName ||
            (elType as { displayName?: string; name?: string }).name ||
            '';

        if (skipComponents.includes(displayName)) return null;

        // Try to render the component so we can walk its output tree
        const rendered = tryRenderComponent(el);

        if (rendered != null) {
            return buildSkeletonTree(rendered, {
                ...opts,
                depth: depth + 1,
                keyPrefix,
            });
        }

        // Fallback: check for static children on the element props
        const staticChildren = el.props.children as ReactNode;
        if (staticChildren != null) {
            return buildSkeletonTree(staticChildren, {
                ...opts,
                depth: depth + 1,
                keyPrefix,
            });
        }

        // Last resort: single block placeholder
        return makeSkeletonElement({ key: keyPrefix, ctx, width: '100%', height: 40, debug });
    }

    // ── Native DOM element ───────────────────────────────────────────────
    const tag = (elType as string).toLowerCase();

    if (isSkippableElement(tag)) return null;

    // Image-like
    if (isImageElement(tag)) {
        const propsWithDims = el.props as { width?: number | string; height?: number | string; style?: CSSProperties; className?: string };
        const w = propsWithDims.width || propsWithDims.style?.width || '100%';
        const h = propsWithDims.height || propsWithDims.style?.height || 200;
        return makeSkeletonElement({ 
            key: keyPrefix, ctx, width: w, height: h, variant: 'image', 
            className: propsWithDims.className, extraStyle: extractLayoutStyle(propsWithDims.style), debug 
        });
    }

    // Input / textarea / select
    if (tag === 'input' || tag === 'textarea' || tag === 'select') {
        const inputProps = el.props as { style?: CSSProperties; type?: string; className?: string };
        const extraStyle = extractLayoutStyle(inputProps.style);
        if (inputProps.type === 'checkbox' || inputProps.type === 'radio') {
            return makeSkeletonElement({ key: keyPrefix, ctx, width: 20, height: 20, variant: 'circular', className: inputProps.className, extraStyle, debug });
        }
        const h = (inputProps.style?.height as number | undefined) || 44;
        return makeSkeletonElement({ key: keyPrefix, ctx, width: '100%', height: h, className: inputProps.className, extraStyle, debug });
    }

    // Button
    if (tag === 'button') {
        const btnProps = el.props as { style?: CSSProperties; className?: string };
        const children = el.props.children as ReactNode;
        let approxWidth: number | string = 120;
        if (btnProps.style?.width) {
            approxWidth = btnProps.style.width as number | string;
        } else if (typeof children === 'string') {
            approxWidth = Math.max(80, Math.min(children.length * 9, 200));
        }
        return makeSkeletonElement({
            key: keyPrefix,
            ctx,
            width: approxWidth,
            height: (btnProps.style?.height as number | undefined) || 38,
            className: btnProps.className,
            extraStyle: extractLayoutStyle(btnProps.style),
            debug,
        });
    }

    // hr / br
    if (tag === 'hr' || tag === 'br') {
        return makeSkeletonElement({ key: keyPrefix, ctx, width: '100%', height: 2, debug });
    }

    // Inline elements — transparent pass-through, walk inner text
    if (isInlineElement(tag)) {
        const children = el.props.children as ReactNode;
        if (!children) return null;
        return buildSkeletonTree(children, { ...opts, depth: depth + 1, keyPrefix });
    }

    // ── Block containers — preserve layout, recurse children ────────────
    const children = el.props.children as ReactNode;
    const propsWithStyle = el.props as { style?: CSSProperties };
    const childStyle = propsWithStyle.style;

    if (children == null) {
        // Leaf block with no children — use its own size hints
        const w = (childStyle?.width as number | string | undefined) || '100%';
        const h = (childStyle?.height as number | string | undefined) || 20;
        const className = (el.props as { className?: string }).className;
        return makeSkeletonElement({ key: keyPrefix, ctx, width: w, height: h, className, debug });
    }

    const childArray = Children.toArray(children);

    if (childArray.length === 0) {
        const w = (childStyle?.width as number | string | undefined) || '100%';
        const h = (childStyle?.height as number | string | undefined) || 20;
        const className = (el.props as { className?: string }).className;
        return makeSkeletonElement({ key: keyPrefix, ctx, width: w, height: h, className, debug });
    }

    const skeletonChildren = childArray.map((child, i) =>
        buildSkeletonTree(child, { ...opts, depth: depth + 1, keyPrefix: `${keyPrefix}-${i}` })
    ).filter(Boolean);

    if (skeletonChildren.length === 0) return null;

    const layoutStyle = extractLayoutStyle(childStyle);

    return React.createElement(
        elType as string,
        {
            key: keyPrefix,
            style: layoutStyle,
            className: (el.props as { className?: string }).className,
            'aria-hidden': 'true',
            'data-auto-skeleton-wrapper': 'true',
        },
        ...skeletonChildren
    );
}

// ── Skeleton element factory ─────────────────────────────────────────────────

interface MakeElementOptions {
    key: string;
    ctx: SkeletonContextValue;
    width?: number | string;
    height?: number | string;
    variant?: 'rectangular' | 'text' | 'image' | 'circular';
    className?: string;
    extraStyle?: CSSProperties;
    debug?: boolean;
}

function makeSkeletonElement({
    key,
    ctx,
    width = '100%',
    height = 20,
    variant = 'rectangular',
    className,
    extraStyle,
    debug,
}: MakeElementOptions): ReactElement {
    const typeAttr =
        variant === 'circular' ? 'circle' :
            variant === 'text' ? 'inline' :
                variant === 'image' ? 'image' :
                    'block';

    const animAttr =
        ctx.animation === 'wave' ? 'wave' :
            ctx.animation === 'pulse' ? 'pulse' : 'none';

    const r = typeof ctx.borderRadius === 'number' ? `${ctx.borderRadius}px` : ctx.borderRadius;

    const style: CSSProperties = {
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
        '--sk-base': ctx.baseColor,
        '--sk-highlight': ctx.highlightColor,
        '--sk-speed': `${ctx.speed}s`,
        '--sk-radius': r,
        ...extraStyle,
        ...(debug ? { outline: '2px dashed rgba(255,0,0,0.4)' } : {}),
    } as CSSProperties;

    return React.createElement('span', {
        key,
        className,
        'data-auto-skeleton': typeAttr,
        'data-auto-skeleton-anim': animAttr,
        style,
        'aria-hidden': 'true',
    });
}
