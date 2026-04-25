import React, { CSSProperties } from 'react';
import { SkeletonElementProps } from '../types';

export function SkeletonElement({
    width,
    height,
    borderRadius,
    style,
    className,
    animation = 'wave',
    baseColor,
    highlightColor,
    speed,
    variant = 'rectangular',
}: SkeletonElementProps) {
    const typeAttr =
        variant === 'circular' ? 'circle' :
            variant === 'text' ? 'inline' :
                'block';

    const animAttr =
        animation === 'wave' ? 'wave' :
            animation === 'pulse' ? 'pulse' :
                'none';

    const cssVars: Record<string, string> = {};
    if (baseColor) cssVars['--sk-base'] = baseColor;
    if (highlightColor) cssVars['--sk-highlight'] = highlightColor;
    if (speed !== undefined) cssVars['--sk-speed'] = `${speed}s`;
    if (borderRadius !== undefined) {
        const r = typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius;
        cssVars['--sk-radius'] = r;
    }

    const inlineStyle: CSSProperties = {
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
        ...(cssVars as CSSProperties),
        ...style,
    };

    return React.createElement('span', {
        'data-auto-skeleton': typeAttr,
        'data-auto-skeleton-anim': animAttr,
        className,
        style: inlineStyle,
        'aria-hidden': 'true',
    });
}
