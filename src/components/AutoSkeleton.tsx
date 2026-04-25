import React, { useEffect, useState } from 'react';
import { AutoSkeletonProps } from '../types';
import { resolveColors, DEFAULT_ANIMATION, DEFAULT_BORDER_RADIUS, DEFAULT_SPEED, DEFAULT_THEME } from '../utils/constants';
import { useStyleInjection } from '../utils/injectStyles';
import { buildSkeletonTree } from '../utils/skeletonBuilder';
import { useSkeletonContext } from './SkeletonContext';

/**
 * AutoSkeleton — Web (React DOM) implementation.
 *
 * Renders skeleton placeholders that mirror the layout of `children` while
 * `isLoading` is true, then seamlessly transitions to the real content.
 *
 * @example
 * ```tsx
 * <AutoSkeleton isLoading={isLoading}>
 *   <ProfileCard user={user} />
 * </AutoSkeleton>
 * ```
 */
export function AutoSkeleton({
    isLoading,
    children,
    animation,
    theme,
    borderRadius,
    speed,
    baseColor,
    highlightColor,
    skipComponents = [],
    style,
    className,
    debug = false,
    delay = 0,
}: AutoSkeletonProps) {
    useStyleInjection();

    const ctxValues = useSkeletonContext();

    const [showSkeleton, setShowSkeleton] = useState(isLoading);

    useEffect(() => {
        if (isLoading) {
            if (delay > 0) {
                const timer = setTimeout(() => setShowSkeleton(true), delay);
                return () => clearTimeout(timer);
            } else {
                setShowSkeleton(true);
            }
        } else {
            setShowSkeleton(false);
        }
        return undefined;
    }, [isLoading, delay]);

    // Merge context + prop overrides
    const resolvedAnimation = animation ?? ctxValues.animation ?? DEFAULT_ANIMATION;
    const resolvedTheme = theme ?? ctxValues.theme ?? DEFAULT_THEME;
    const resolvedBorderRadius = borderRadius ?? ctxValues.borderRadius ?? DEFAULT_BORDER_RADIUS;
    const resolvedSpeed = speed ?? ctxValues.speed ?? DEFAULT_SPEED;
    const { base, highlight } = resolveColors(resolvedTheme, baseColor ?? ctxValues.baseColor, highlightColor ?? ctxValues.highlightColor);

    if (!showSkeleton) {
        return React.createElement(React.Fragment, null, children);
    }

    const ctx = {
        animation: resolvedAnimation,
        theme: resolvedTheme,
        borderRadius: resolvedBorderRadius,
        speed: resolvedSpeed,
        baseColor: base,
        highlightColor: highlight,
    };

    const skeleton = buildSkeletonTree(children, { ctx, skipComponents, debug });

    return React.createElement(
        'div',
        {
            className: ['auto-skeleton-container', className].filter(Boolean).join(' '),
            style: { display: 'contents', ...style },
            'aria-busy': 'true',
            'aria-label': 'Loading content…',
            role: 'status',
        },
        skeleton
    );
}

export default AutoSkeleton;
