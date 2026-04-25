import { injectStyles } from '../injectStyles';

describe('injectStyles', () => {
    afterEach(() => {
        // Clean up head after each test
        const style = document.getElementById('auto-skeleton-styles');
        if (style) style.remove();
    });

    it('injects style tag into document head', () => {
        expect(document.getElementById('auto-skeleton-styles')).toBeNull();
        injectStyles();
        expect(document.getElementById('auto-skeleton-styles')).not.toBeNull();
    });

    it('does not inject duplicate style tags', () => {
        injectStyles();
        injectStyles();
        injectStyles();
        const tags = document.querySelectorAll('#auto-skeleton-styles');
        expect(tags.length).toBe(1);
    });

    it('includes required CSS properties in injected styles', () => {
        injectStyles();
        const styleTag = document.getElementById('auto-skeleton-styles');
        expect(styleTag?.textContent).toContain('[data-auto-skeleton]');
        expect(styleTag?.textContent).toContain('[data-auto-skeleton-anim="wave"]');
        expect(styleTag?.textContent).toContain('[data-auto-skeleton-wrapper="true"]');
    });
});
