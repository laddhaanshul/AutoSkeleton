import React, { createContext, useContext, ReactNode } from 'react';
import { SkeletonContextValue, SkeletonTheme, SkeletonAnimation } from '../types';
import {
    DEFAULT_ANIMATION,
    DEFAULT_BORDER_RADIUS,
    DEFAULT_SPEED,
    DEFAULT_THEME,
    resolveColors,
} from '../utils/constants';

const SkeletonContext = createContext<SkeletonContextValue>({
    animation: DEFAULT_ANIMATION,
    theme: DEFAULT_THEME,
    borderRadius: DEFAULT_BORDER_RADIUS,
    speed: DEFAULT_SPEED,
    baseColor: '#e0e0e0',
    highlightColor: '#f5f5f5',
});

export interface SkeletonProviderProps {
    children: ReactNode;
    animation?: SkeletonAnimation;
    theme?: SkeletonTheme;
    borderRadius?: number | string;
    speed?: number;
    baseColor?: string;
    highlightColor?: string;
}

export function SkeletonProvider({
    children,
    animation = DEFAULT_ANIMATION,
    theme = DEFAULT_THEME,
    borderRadius = DEFAULT_BORDER_RADIUS,
    speed = DEFAULT_SPEED,
    baseColor,
    highlightColor,
}: SkeletonProviderProps) {
    const colors = resolveColors(theme, baseColor, highlightColor);

    const value: SkeletonContextValue = {
        animation,
        theme,
        borderRadius,
        speed,
        baseColor: colors.base,
        highlightColor: colors.highlight,
    };

    return React.createElement(SkeletonContext.Provider, { value }, children);
}

export function useSkeletonContext(): SkeletonContextValue {
    return useContext(SkeletonContext);
}
