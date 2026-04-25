# Getting Started with AutoSkeleton

AutoSkeleton is a revolutionary, zero-configuration loading skeleton generator for React and React Native. Instead of manually maintaining separate skeleton versions of your components, AutoSkeleton recursively maps your *real* UI tree to generate perfectly aligned loading states.

## Installation

```bash
npm install autoskeleton
```
*(Or `yarn add autoskeleton`, `pnpm add autoskeleton`)*

## Basic Usage

The easiest way to use AutoSkeleton is to wrap your components in the `<AutoSkeleton>` provider.

### Example

```tsx
import { AutoSkeleton } from 'autoskeleton';

function ProductFeed({ isLoading, products }) {
  if (isLoading) {
    return (
      <AutoSkeleton speed={1.5} animation="wave">
        {/* We just render the real component with mock/empty data! */}
        <ProductCard product={{}} />
        <ProductCard product={{}} />
        <ProductCard product={{}} />
      </AutoSkeleton>
    );
  }

  return (
    <>
      {products.map(p => <ProductCard key={p.id} product={p} />)}
    </>
  );
}
```

### How it Works

When you wrap a component in `<AutoSkeleton>`, the engine intercepts the React render cycle:
1. It recursively traverses down the children of the wrapped component.
2. It detects structural layout wrappers (like `div` elements with flex or grid styles) and copies their dimensional geometries.
3. It detects solid leaf nodes (`img`, `button`, `input`) and maps them to block-level skeleton shimmers.
4. It measures strings of text and replaces them with inline text shimmers of identical width.

You never have to write `<Skeleton width={200} height={20} />` again!

## Skipping Components

Sometimes you might have a deeply nested component or an intricate icon that you don't want AutoSkeleton to try and parse. You can opt-out specific sub-components using the `skipComponents` array:

```tsx
<AutoSkeleton skipComponents={['MyComplexChart', 'IconVector']}>
  <Dashboard />
</AutoSkeleton>
```
