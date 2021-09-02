# React Native Android System Bars

Control the visibility of Android's Status and Navigation Bars.

A lightweight implementation that exposes [Android's system UI visibility API](https://developer.android.com/training/system-ui) to the JS layer. 

> Note, this package is for **Android only** and its API will silently do nothing when called on iOS.

## Installation

```sh
yarn add react-native-system-bars
```

## Usage

### Setting Android's system UI visibility flags directly

```typescript
import AndroidSystemBars from "react-native-system-bars";

// Go immersive (i.e. hide status bar and nav bar)
AndroidSystemBars.setSystemUIVisibility(
    'SYSTEM_UI_FLAG_IMMERSIVE',
    'SYSTEM_UI_FLAG_FULLSCREEN',
    'SYSTEM_UI_FLAG_HIDE_NAVIGATION'
);

// Show status bar and nav bar
AndroidSystemBars.setSystemUIVisibility('SYSTEM_UI_FLAG_VISIBLE');
```

### Utility functions

We've went through the [Android docs](https://developer.android.com/training/system-ui) for managing the visibility of system bars, and came up with a set of utility functions that you can use. 

> If a utility function doesn't exist for your use case, just use the `AndroidSystemBars.setSystemUIVisibility()` function, passing whatever combination of flags you need.

```typescript
AndroidSystemBars.clearFlags();

AndroidSystemBars.setContentBehindSystemBars();

AndroidSystemBars.dimSystemBars();

AndroidSystemBars.hideStatusBar();

AndroidSystemBars.hideNavigationBar();

AndroidSystemBars.hideStatusAndNavigationBars();

AndroidSystemBars.enableFullScreenMode('immersive', /*preventResizing (optional)*/true);

AndroidSystemBars.enableFullScreenMode('sticky-immersive', /*preventResizing (optional)*/true);

AndroidSystemBars.enableFullScreenMode('lean-back', /*preventResizing (optional)*/true);
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
