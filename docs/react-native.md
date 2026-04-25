# React Native Integration

AutoSkeleton features a dedicated, native-optimized engine for React Native and Expo projects. It relies entirely on native `View` and `Animated` components, ensuring 60FPS fluid animations without the overhead of WebViews or massive dependencies.

## Installation

```bash
npm install auto-skeleton-react-and-native
```

*Note: AutoSkeleton does not require any native linking or CocoaPods installations. It is a pure JS/TS library using standard React Native primitives.*

## Usage

When importing `AutoSkeleton` in a React Native project, you **must** import it from the `/native` path. This ensures you do not accidentally bundle DOM-specific code.

```tsx
import { StyleSheet, View, Text } from 'react-native';
// Note the /native import path!
import { AutoSkeleton } from 'auto-skeleton-react-and-native/native';

function ProfileScreen({ isLoading, user }) {
  if (isLoading) {
    return (
      <View style={styles.container}>
        <AutoSkeleton animation="pulse">
          {/* We render our real UI, letting AutoSkeleton convert it into a loading state */}
          <UserProfileHeader user={{}} />
          <UserStats />
          <SettingsList />
        </AutoSkeleton>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <UserProfileHeader user={user} />
      <UserStats data={user.stats} />
      <SettingsList />
    </View>
  );
}
```

## How It Works in Native

The Native engine works by analyzing the component tree down to its base primitives: `View`, `Text`, and `Image`. 
- **Views**: AutoSkeleton extracts layout metrics from the `style` prop (such as `padding`, `margin`, `flexDirection`, `width`, and `height`). It recursively reconstructs transparent views matching that layout.
- **Images**: Automatically swapped out for shimmering rounded rectangles matching their given dimensions.
- **Text**: Strings are measured, and an equivalent-width animated bar is generated in place of the text element.

## Support for Animated Wrappers

If you are using Reanimated or React Native's built-in `Animated.View`, the engine automatically detects `AnimatedComponent` wrappers and treats them as standard views, ensuring your skeleton generation doesn't crash on complex native animations.
