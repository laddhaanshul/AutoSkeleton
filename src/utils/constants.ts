import { SkeletonTheme } from '../types';

export const LIGHT_BASE_COLOR = '#e0e0e0';
export const LIGHT_HIGHLIGHT_COLOR = '#f5f5f5';
export const DARK_BASE_COLOR = '#2a2a2a';
export const DARK_HIGHLIGHT_COLOR = '#3d3d3d';

export const DEFAULT_BORDER_RADIUS = 6;
export const DEFAULT_SPEED = 1.6;
export const DEFAULT_ANIMATION = 'wave';
export const DEFAULT_THEME: SkeletonTheme = 'light';

export const SKIPPABLE_TAGS = new Set([
    'script', 'style', 'link', 'meta', 'head',
    'noscript', 'template', 'slot',
]);

export const INLINE_TAGS = new Set([
    'span', 'a', 'strong', 'em', 'b', 'i', 'u', 's', 'small', 'big',
    'sub', 'sup', 'abbr', 'cite', 'code', 'kbd', 'mark', 'q', 'samp',
    'time', 'var', 'label',
]);

export const IMAGE_TAGS = new Set(['img', 'svg', 'canvas', 'video', 'picture']);

export function resolveColors(
    theme: SkeletonTheme,
    baseColor?: string,
    highlightColor?: string
): { base: string; highlight: string } {
    const isDark = theme === 'dark' || (
        theme === 'auto' &&
        typeof window !== 'undefined' &&
        window.matchMedia?.('(prefers-color-scheme: dark)').matches
    );

    return {
        base: baseColor ?? (isDark ? DARK_BASE_COLOR : LIGHT_BASE_COLOR),
        highlight: highlightColor ?? (isDark ? DARK_HIGHLIGHT_COLOR : LIGHT_HIGHLIGHT_COLOR),
    };
}

export function isImageElement(type: string): boolean {
    return IMAGE_TAGS.has(type.toLowerCase());
}

export function isInlineElement(type: string): boolean {
    return INLINE_TAGS.has(type.toLowerCase());
}

export function isSkippableElement(type: string): boolean {
    return SKIPPABLE_TAGS.has(type.toLowerCase());
}

export function getBorderRadius(
    defaultRadius: number | string,
    type?: string
): number | string {
    if (type && isImageElement(type)) return '8px';
    return defaultRadius;
}
