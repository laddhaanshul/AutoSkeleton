import React from 'react';
import { render } from '@testing-library/react';
// @ts-ignore
import { View } from 'react-native';
import { AutoSkeleton } from '../AutoSkeletonNative';

describe('AutoSkeletonNative', () => {
    it('renders a wrapper when isLoading is true', () => {
        const { container } = render(
            <AutoSkeleton isLoading={true}>
                <View>Test</View>
            </AutoSkeleton>
        );
        expect(container).not.toBeNull();
    });

    it('renders original children when isLoading is false', () => {
        const { container } = render(
            <AutoSkeleton isLoading={false}>
                <div data-testid="real">Real Content</div>
            </AutoSkeleton>
        );
        expect(container.querySelector('[data-testid="real"]')).not.toBeNull();
    });
});
