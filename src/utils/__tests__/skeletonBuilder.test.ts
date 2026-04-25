import React from 'react';
import { extractLayoutStyle } from '../skeletonBuilder';

describe('skeletonBuilder', () => {
    describe('extractLayoutStyle', () => {
        it('extracts layout properties while dropping non-layout properties', () => {
            const style = {
                display: 'flex',
                width: 100,
                color: 'red',
                background: 'blue',
                padding: 10,
                margin: 5,
                fontSize: 16
            } as React.CSSProperties;

            const extracted = extractLayoutStyle(style);

            expect(extracted).toEqual({
                display: 'flex',
                width: 100,
                padding: 10,
                margin: 5
            });
            // color, background, and fontSize should be dropped!
        });

        it('returns empty object if no style provided', () => {
            expect(extractLayoutStyle()).toEqual({});
        });
    });
});
