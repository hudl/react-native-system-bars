# React Native Android System Bars

Control the visibility of Android's Status and Navigation Bars.

A lightweight implementation that exposes [Android's system UI visibility API](https://developer.android.com/training/system-ui) to the JS layer. 

> Note, this package is for **Android only** and its API will silently do nothing when called on iOS.

## Installation

```sh
yarn add react-native-system-bars
```

## Usage

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

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
