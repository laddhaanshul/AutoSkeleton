import { useEffect, useRef } from 'react';

const STYLE_ID = 'auto-skeleton-styles';

const CSS = `
@keyframes auto-skeleton-wave {
  0%   { background-position: -400px 0; }
  100% { background-position: calc(400px + 100%) 0; }
}

@keyframes auto-skeleton-pulse {
  0%   { opacity: 1; }
  50%  { opacity: 0.45; }
  100% { opacity: 1; }
}

/* ── Base rule for all skeleton elements ─────────────────────── */
[data-auto-skeleton] {
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  outline: none;
  border: none;
  cursor: default;
  user-select: none;
  pointer-events: none;
  flex-shrink: 0;
}

/* ── Animation modes ─────────────────────────────────────────── */
[data-auto-skeleton-anim="wave"] {
  background-image: linear-gradient(
    90deg,
    var(--sk-base, #e0e0e0) 25%,
    var(--sk-highlight, #f5f5f5) 45%,
    var(--sk-base, #e0e0e0) 65%
  );
  background-size: 800px 100%;
  animation: auto-skeleton-wave var(--sk-speed, 1.6s) linear infinite;
}

[data-auto-skeleton-anim="pulse"] {
  background-color: var(--sk-base, #e0e0e0);
  animation: auto-skeleton-pulse calc(var(--sk-speed, 1.6s) * 1.2) ease-in-out infinite;
}

[data-auto-skeleton-anim="none"] {
  background-color: var(--sk-base, #e0e0e0);
  animation: none;
}

/* ── Variants ────────────────────────────────────────────────── */
[data-auto-skeleton="block"] {
  display: block;
  border-radius: var(--sk-radius, 6px);
  min-height: 16px;
}

[data-auto-skeleton="inline"] {
  display: inline-block;
  vertical-align: middle;
  border-radius: calc(var(--sk-radius, 6px) / 2);
  min-height: 12px;
  min-width: 40px;
}

[data-auto-skeleton="image"] {
  display: block;
  border-radius: var(--sk-radius, 6px);
  min-height: 40px;
}

[data-auto-skeleton="circle"] {
  display: inline-block;
  border-radius: 50% !important;
}

/* ── Wrapper: must NOT collapse flex/grid context ────────────── */
[data-auto-skeleton-wrapper="true"] {
  box-sizing: border-box;
  background: transparent !important;
  border-color: transparent !important;
  box-shadow: none !important;
  color: transparent !important;
}

/* ── Container: display:contents so it never breaks layout ───── */
.auto-skeleton-container {
  display: contents;
}
`;

export function injectStyles(): void {
  if (typeof document === 'undefined') return;
  if (document.getElementById(STYLE_ID)) return;

  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = CSS;
  document.head.appendChild(style);
}

export function useStyleInjection(): void {
  const injected = useRef(false);
  useEffect(() => {
    if (!injected.current) {
      injectStyles();
      injected.current = true;
    }
  }, []);
}
