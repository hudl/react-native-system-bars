# React Native Android System Bars

[![CircleCI](https://circleci.com/gh/hudl/react-native-system-bars/tree/main.svg?style=svg)](https://circleci.com/gh/hudl/react-native-system-bars/tree/main) [![npm version](https://badge.fury.io/js/react-native-system-bars.svg)](https://badge.fury.io/js/react-native-system-bars)

Control the visibility, behavior, and appearance of Android's Status and Navigation Bars.

A lightweight implementation that exposes Android's [window insets API](https://developer.android.com/reference/android/view/WindowInsetsController), deprecated [system UI visibility API](https://developer.android.com/training/system-ui), and select layout management helpers to the JS layer.

> Note, this package is for **Android only** and its APIs will silently do nothing when called on iOS.

## Installation

```sh
yarn add react-native-system-bars
```

## Usage

This package consists of three modules:

* **`AndroidSystemBars` (Android API level 11+)**
	* This module contains a variety of utility functions for the most common use cases, such as hiding system bars and enabling full-screen mode. Each utility function leverages the `AndroidWindowInsets` or `AndroidSystemUIVisibility` submodules, depending on the device's Android API version.
* **`AndroidWindowInsets` (Android API level 30+)**
	* This module exposes Android's [window insets API](https://developer.android.com/reference/android/view/WindowInsetsController), with additional functions for adding and removing [WindowManager layout flags](https://developer.android.com/reference/android/view/WindowManager.LayoutParams). `AndroidWindowInsets` allows you to change the behavior, appearance, and visibility of Android's system bars, while also tuning how your app content behaves around [display cutouts](https://developer.android.com/develop/ui/views/layout/display-cutout).
* **`AndroidSystemUIVisibility` (Deprecated) (Android API level 11+)**
	* This module has been deprecated with the introduction of Android's window insets API, which is exposed as `AndroidWindowInsets` in this package. Despite being fully functional, continued use of system UI flags is discouraged, due to their limited capabilities and potential removal in a future Android API. 

### AndroidSystemBars

> If a utility function doesn't exist for your use case,  consume the `AndroidWindowInsets` or `AndroidSystemUIVisibility` modules directly.
```typescript
import AndroidSystemBars from "react-native-system-bars";

AndroidSystemBars.reset();

AndroidSystemBars.setContentBehindSystemBars();
  
AndroidSystemBars.hideStatusBar();

AndroidSystemBars.hideNavigationBar();

AndroidSystemBars.hideStatusAndNavigationBars();

AndroidSystemBars.enableFullScreenMode('immersive');

AndroidSystemBars.enableFullScreenMode('sticky-immersive');
```

### AndroidWindowInsets

```typescript
import { AndroidWindowInsets } from "react-native-system-bars";

AndroidWindowInsets.addLayoutFlags('FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS');
  
AndroidWindowInsets.clearLayoutFlags('FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS');

AndroidWindowInsets.setDecorFitsSystemWindows(false);

AndroidWindowInsets.setDisplayCutoutMode('LAYOUT_IN_DISPLAY_CUTOUT_MODE_SHORT_EDGES');

AndroidWindowInsets.setSystemBarsAppearance('APPEARANCE_OPAQUE_STATUS_BARS');

AndroidWindowInsets.setSystemBarsBehavior('BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE');

AndroidWindowInsets.hide('STATUS_BARS', 'NAVIGATION_BARS');

AndroidWindowInsets.show('STATUS_BARS', 'NAVIGATION_BARS');
```

### AndroidSystemUIVisibility

```typescript
import { AndroidSystemUIVisibility } from "react-native-system-bars";

AndroidSystemUIVisibility.setSystemUIVisibility(
	'SYSTEM_UI_FLAG_IMMERSIVE',
	'SYSTEM_UI_FLAG_FULLSCREEN',
	'SYSTEM_UI_FLAG_HIDE_NAVIGATION'
);
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT