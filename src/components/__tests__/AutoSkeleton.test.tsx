import React from 'react';
import { render } from '@testing-library/react';
import { AutoSkeleton } from '../AutoSkeleton';

describe('AutoSkeleton', () => {
    it('renders a wrapper with aria-busy set to true', () => {
        const { container } = render(
            <AutoSkeleton isLoading={true}>
                <div>Test</div>
            </AutoSkeleton>
        );
        const wrapper = container.querySelector('.auto-skeleton-container');
        expect(wrapper).not.toBeNull();
        expect(wrapper?.getAttribute('aria-busy')).toBe('true');
    });

    it('replaces text children with skeleton lines', () => {
        const { container } = render(
            <AutoSkeleton isLoading={true}>
                <p>Hello World</p>
            </AutoSkeleton>
        );
        const skeletonSpan = container.querySelector('[data-auto-skeleton="inline"]');
        expect(skeletonSpan).not.toBeNull();
        // Since "Hello World" is replaced by a skeleton line, the actual text should not be visible.
        expect(container.textContent).not.toContain('Hello World');
    });

    it('replaces images with image skeleton blocks', () => {
        const { container } = render(
            <AutoSkeleton isLoading={true}>
                <img src="test.jpg" alt="test" width={100} height={100} />
            </AutoSkeleton>
        );
        const skeletonImg = container.querySelector('[data-auto-skeleton="image"]') as HTMLElement;
        expect(skeletonImg).not.toBeNull();
        expect(skeletonImg.style.width).toBe('100px');
        expect(skeletonImg.style.height).toBe('100px');
    });

    it('skips components included in the skipComponents prop', () => {
        const SkippedComponent = () => <div>Should be skipped</div>;
        SkippedComponent.displayName = 'SkippedComponent';

        const { container } = render(
            <AutoSkeleton isLoading={true} skipComponents={['SkippedComponent']}>
                <SkippedComponent />
                <div>Normal Div</div>
            </AutoSkeleton>
        );

        // It should skip the component entirely, returning null for it
        expect(container.querySelectorAll('[data-auto-skeleton-wrapper="true"]')).toHaveLength(1);
    });
});
