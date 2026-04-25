import {
    resolveColors,
    isImageElement,
    isInlineElement,
    isSkippableElement,
    getBorderRadius,
    LIGHT_BASE_COLOR,
    LIGHT_HIGHLIGHT_COLOR,
    DARK_BASE_COLOR,
    DARK_HIGHLIGHT_COLOR,
} from '../constants';

describe('Constants and Helpers', () => {
    describe('resolveColors', () => {
        it('returns light colors for light theme', () => {
            const colors = resolveColors('light');
            expect(colors.base).toBe(LIGHT_BASE_COLOR);
            expect(colors.highlight).toBe(LIGHT_HIGHLIGHT_COLOR);
        });

        it('returns dark colors for dark theme', () => {
            const colors = resolveColors('dark');
            expect(colors.base).toBe(DARK_BASE_COLOR);
            expect(colors.highlight).toBe(DARK_HIGHLIGHT_COLOR);
        });

        it('prioritizes overrides', () => {
            const colors = resolveColors('light', '#000', '#fff');
            expect(colors.base).toBe('#000');
            expect(colors.highlight).toBe('#fff');
        });
    });

    describe('isImageElement', () => {
        it('identifies image tags', () => {
            expect(isImageElement('img')).toBe(true);
            expect(isImageElement('SVG')).toBe(true);
            expect(isImageElement('div')).toBe(false);
        });
    });

    describe('isInlineElement', () => {
        it('identifies inline text tags', () => {
            expect(isInlineElement('span')).toBe(true);
            expect(isInlineElement('a')).toBe(true);
            expect(isInlineElement('strong')).toBe(true);
            expect(isInlineElement('p')).toBe(false);
        });
    });

    describe('isSkippableElement', () => {
        it('identifies tags to skip', () => {
            expect(isSkippableElement('script')).toBe(true);
            expect(isSkippableElement('style')).toBe(true);
            expect(isSkippableElement('div')).toBe(false);
        });
    });

    describe('getBorderRadius', () => {
        it('returns forced radius for images', () => {
            expect(getBorderRadius(6, 'img')).toBe('8px');
        });
        it('returns default radius for non-images', () => {
            expect(getBorderRadius(6, 'div')).toBe(6);
        });
    });
});
