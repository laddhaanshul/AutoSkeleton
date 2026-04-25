# ⚡ AutoSkeleton

> **Zero-config skeleton loading screens that automatically mirror your React and React Native component layouts.**

[![npm version](https://img.shields.io/npm/v/auto-skeleton-react-and-native.svg?style=flat-square)](https://www.npmjs.com/package/auto-skeleton-react-and-native)
[![npm downloads](https://img.shields.io/npm/dm/auto-skeleton-react-and-native.svg?style=flat-square)](https://www.npmjs.com/package/auto-skeleton-react-and-native)
[![bundle size](https://img.shields.io/bundlephobia/minzip/auto-skeleton-react-and-native?style=flat-square&label=gzipped)](https://bundlephobia.com/package/auto-skeleton-react-and-native)
[![license](https://img.shields.io/npm/l/auto-skeleton-react-and-native.svg?style=flat-square)](./LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-ready-blue.svg?style=flat-square)](https://www.typescriptlang.org/)

---

## Website

https://auto-skeleton.anshulladdha.in/

---

## Overview

AutoSkeleton introspects your React component tree and renders shimmer placeholders that precisely match your layout — **no manual skeleton markup required**.

Just wrap your component, pass `isLoading`, and AutoSkeleton handles the rest:

- **Text nodes** → inline shimmer bars sized to character count
- **Images** → rectangular or rounded placeholders
- **Buttons** → correctly sized interactive placeholders
- **Inputs** → full-width input field skeletons
- **Containers** → layout-preserving wrappers with flex/grid intact

---

## Installation

```bash
npm install auto-skeleton-react-and-native
# or
yarn add auto-skeleton-react-and-native
# or
pnpm add auto-skeleton-react-and-native
```

**Peer dependencies** (already in your project):

```bash
npm install react react-dom     # for web
npm install react react-native  # for React Native
```

---

## Quick Start

### React (Web)

```tsx
import { AutoSkeleton } from 'auto-skeleton-react-and-native';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <AutoSkeleton isLoading={isLoading}>
      <UserProfileCard user={user} />
    </AutoSkeleton>
  );
}
```

### React Native

```tsx
import { AutoSkeleton } from 'auto-skeleton-react-and-native/native';

function Screen() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <AutoSkeleton isLoading={isLoading} animation="wave" theme="dark">
      <ProductCard product={product} />
    </AutoSkeleton>
  );
}
```

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isLoading` | `boolean` | **required** | Show skeleton when `true`, real content when `false` |
| `children` | `ReactNode` | **required** | The component(s) to render when loaded |
| `animation` | `'wave' \| 'pulse' \| 'none'` | `'wave'` | Shimmer animation style |
| `theme` | `'light' \| 'dark' \| 'auto'` | `'light'` | Color scheme (`auto` follows OS preference) |
| `borderRadius` | `number \| string` | `6` | Border radius on block skeleton elements |
| `speed` | `number` | `1.6` | Animation duration in seconds |
| `baseColor` | `string` | `'#e0e0e0'` | Primary skeleton background color |
| `highlightColor` | `string` | `'#f5f5f5'` | Shimmer sweep highlight color |
| `delay` | `number` | `0` | ms delay before skeleton appears (avoids flash on fast loads) |
| `skipComponents` | `string[]` | `[]` | Component display names to exclude from skeletonisation |
| `debug` | `boolean` | `false` | Show dashed red outlines around detected skeleton blocks |
| `style` | `CSSProperties` | — | Wrapper style *(web only)* |
| `className` | `string` | — | Wrapper class *(web only)* |

---

## Global Configuration with `SkeletonProvider`

Wrap your app once to set global defaults. Individual `AutoSkeleton` instances can still override locally.

```tsx
import { SkeletonProvider, AutoSkeleton } from 'auto-skeleton-react-and-native';

function App() {
  return (
    <SkeletonProvider animation="wave" theme="dark" speed={1.4} borderRadius={10}>
      {/* All AutoSkeleton instances inherit these defaults */}
      <Routes />
    </SkeletonProvider>
  );
}
```

---

## Examples

### Custom Colors

```tsx
<AutoSkeleton
  isLoading={loading}
  baseColor="#1a1a2e"
  highlightColor="#2d2d4e"
>
  <DashboardCard />
</AutoSkeleton>
```

### Delay to Avoid Flash

```tsx
<AutoSkeleton isLoading={loading} delay={300}>
  <Feed />
</AutoSkeleton>
```

### Skip Specific Sub-Components

```tsx
<AutoSkeleton isLoading={loading} skipComponents={['Icon', 'Badge', 'Tooltip']}>
  <ProductCard />
</AutoSkeleton>
```

### Pulse Animation

```tsx
<AutoSkeleton isLoading={loading} animation="pulse" speed={2}>
  <ArticleList />
</AutoSkeleton>
```

### React Native with Dark Theme

```tsx
import { AutoSkeleton } from 'auto-skeleton-react-and-native/native';

<AutoSkeleton
  isLoading={isLoading}
  animation="wave"
  theme="dark"
  borderRadius={12}
  speed={1.8}
>
  <ChatMessageList messages={messages} />
</AutoSkeleton>
```

---

## How It Works

AutoSkeleton recursively walks the React element tree using `React.Children` and `isValidElement`. For each node it:

1. **Identifies the element type** — host element (div, span, View, Text…) or custom component
2. **Determines the skeleton shape** — text bar, block, circle, image, or button based on tag/display name
3. **Preserves layout styles** — only flex, grid, dimension, and spacing properties are forwarded so skeletons lay out identically to real content
4. **Renders placeholders** — CSS custom properties drive colors/speed enabling zero class generation

On the web, CSS is injected once via a `<style>` tag. On React Native, `Animated.Value` drives background colour interpolation for smooth shimmer.

---

## Repository Structure

```
auto-skeleton/
├── src/
│   ├── index.ts              ← Web entry point
│   ├── types.ts              ← Shared TypeScript types
│   ├── components/
│   │   ├── AutoSkeleton.tsx  ← Web AutoSkeleton component
│   │   ├── SkeletonContext.tsx
│   │   └── SkeletonElement.tsx
│   ├── native/
│   │   ├── index.ts          ← Native entry point
│   │   ├── AutoSkeletonNative.tsx
│   │   └── nativeSkeletonBuilder.ts
│   └── utils/
│       ├── constants.ts
│       ├── injectStyles.ts
│       └── skeletonBuilder.ts
├── example/                  ← Live React demo app (Vite)
├── native-example/           ← Live React Native demo app (Expo)
├── website/                  ← Promotional PHP website
├── rollup.config.js
├── tsconfig.json
└── package.json
```

---

## Publishing to npm

```bash
# 1. Install dependencies
npm install

# 2. Build the package
npm run build

# 3. Login to npm (first time)
npm login

# 4. Publish
npm publish --access public
```

---

## Running the React (Web) Example App

```bash
cd example
npm install
npm start
```

Opens at `http://localhost:5173` with a live interactive demo.

---

## Running the React Native Example App

```bash
cd native-example
npm install
npm run ios     # to run on iOS Simulator
# OR
npm run android # to run on Android Emulator
# OR
npm run web     # to see the Native-compiled version in your browser
```

---

## Running the Website

```bash
# Requires PHP 7.4+
php -S localhost:8080 -t website/
```

Opens at `http://localhost:8080`.

---

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feat/amazing-feature`
3. Commit your changes: `git commit -m 'feat: add amazing feature'`
4. Push to the branch: `git push origin feat/amazing-feature`
5. Open a Pull Request

---

## License

MIT © [AutoSkeleton Contributors](./LICENSE)
