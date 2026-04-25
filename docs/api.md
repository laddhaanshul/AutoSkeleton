# API Reference

The `AutoSkeleton` component accepts several props allowing you to customize the behavior and appearance of the generated skeletons.

## `<AutoSkeleton>` Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | **Required** | The actual React component tree you wish to skeletonize. AutoSkeleton will traverse this tree to generate the layout structure. |
| `theme` | `'light' \| 'dark' \| 'auto'` | `'light'` | Determines the color palette used for the skeletons. `'auto'` will automatically detect the user's system preferences using media queries on the web. |
| `baseColor` | `string` | *(depends on theme)* | Custom override for the base color of the skeleton geometry. |
| `highlightColor` | `string` | *(depends on theme)* | Custom override for the animated shimmer highlight color. |
| `animation` | `'wave' \| 'pulse' \| 'none'` | `'wave'` | The type of animation effect to apply to the skeletons. |
| `speed` | `number` | `1.6` | The duration of the animation cycle in seconds. Lower numbers create faster animations. |
| `borderRadius` | `number \| string` | `6` | The default border radius applied to rectangular blocks. *(Note: Circular primitives like avatars and radio buttons automatically force a 50% border radius).* |
| `skipComponents` | `string[]` | `[]` | An array of Component display names (e.g., `['VictoryChart', 'LottieView']`) that the engine should skip. Skipped components return `null` instead of generating a skeleton. |
| `debug` | `boolean` | `false` | When set to `true`, the engine outlines all generated skeleton layout wrappers in a dashed red border to help debug flex/grid spacing issues. |

## Supported Primitives

AutoSkeleton comes with built-in detection heuristics for standard elements:

### Web Platform
* **Images:** (`img`, `svg`, `canvas`, `video`, `picture`) are replaced with block placeholders.
* **Inputs:** (`input`, `button`, `select`, `textarea`) retain their explicit CSS sizing and are mapped to block placeholders.
* **Layouts:** (`div`, `section`, `article`, etc.) preserve all `flex`, `grid`, `margin`, and `padding` geometry, but backgrounds and borders are stripped to ensure transparency.
* **Typography:** (`p`, `span`, `h1`-`h6`, strings) measure the character count of text and render an equivalent-width loading line.

### React Native Platform
* **Images:** (`Image`, `FastImage`) are mapped to `Animated.View` blocks matching the `style` dimensions.
* **Layouts:** (`View`, `SafeAreaView`, `ScrollView`) are converted to `Animated.View` wrappers preserving their React Native layout styles (arrays and flattened IDs supported).
* **Typography:** (`Text`, `TextInput`) maps raw text child strings to loading bars.
