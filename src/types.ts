import { CSSProperties, ReactNode } from 'react';

export type SkeletonAnimation = 'wave' | 'pulse' | 'none';
export type SkeletonVariant = 'text' | 'rectangular' | 'circular' | 'rounded';
export type SkeletonTheme = 'light' | 'dark' | 'auto';

export interface SkeletonColors {
    base: string;
    highlight: string;
}

export interface AutoSkeletonConfig {
    /** Animation style for the skeleton */
    animation?: SkeletonAnimation;
    /** Theme mode */
    theme?: SkeletonTheme;
    /** Border radius applied to block elements */
    borderRadius?: number | string;
    /** Speed of shimmer animation in seconds */
    speed?: number;
    /** Custom colors override */
    colors?: Partial<SkeletonColors>;
    /** Skip skeleton for specific component display names */
    skipComponents?: string[];
    /** Enable debug outlines */
    debug?: boolean;
}

export interface AutoSkeletonProps {
    /** When true, renders skeleton; when false, renders actual children */
    isLoading: boolean;
    /** The actual content to render when not loading */
    children: ReactNode;
    /** Animation type */
    animation?: SkeletonAnimation;
    /** Theme mode */
    theme?: SkeletonTheme;
    /** Custom border radius */
    borderRadius?: number | string;
    /** Animation speed in seconds */
    speed?: number;
    /** Custom base color */
    baseColor?: string;
    /** Custom highlight color */
    highlightColor?: string;
    /** Skip components by display name */
    skipComponents?: string[];
    /** Additional CSS style (web only) */
    style?: CSSProperties;
    /** Additional class name (web only) */
    className?: string;
    /** Enable debug mode */
    debug?: boolean;
    /** Delay before showing skeleton (ms) */
    delay?: number;
}

export interface SkeletonElementProps {
    width?: number | string;
    height?: number | string;
    borderRadius?: number | string;
    style?: CSSProperties;
    className?: string;
    animation?: SkeletonAnimation;
    baseColor?: string;
    highlightColor?: string;
    speed?: number;
    variant?: SkeletonVariant;
}

export interface SkeletonContextValue {
    animation: SkeletonAnimation;
    theme: SkeletonTheme;
    borderRadius: number | string;
    speed: number;
    baseColor: string;
    highlightColor: string;
}
