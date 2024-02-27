import { NativeModules, Platform } from 'react-native';

// @ts-ignore-error
const isTurboModuleEnabled = global.__turboModuleProxy != null;

const VISIBILITY_FLAGS = {
  SYSTEM_UI_FLAG_VISIBLE: 0,
  SYSTEM_UI_FLAG_LOW_PROFILE: 0x00000001,
  SYSTEM_UI_FLAG_HIDE_NAVIGATION: 0x00000002,
  SYSTEM_UI_FLAG_FULLSCREEN: 0x00000004,
  SYSTEM_UI_FLAG_LAYOUT_STABLE: 0x00000100,
  SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION: 0x00000200,
  SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN: 0x00000400,
  SYSTEM_UI_FLAG_IMMERSIVE: 0x00000800,
  SYSTEM_UI_FLAG_IMMERSIVE_STICKY: 0x00001000,
  SYSTEM_UI_FLAG_LIGHT_STATUS_BAR: 0x00002000,
  SYSTEM_UI_FLAG_LIGHT_NAVIGATION_BAR: 0x00000010,
};

// https://developer.android.com/reference/android/view/WindowInsetsController#constants_1
const APPEARANCE_FLAGS = {
  APPEARANCE_OPAQUE_STATUS_BARS: 0x00000001,
  APPEARANCE_OPAQUE_NAVIGATION_BARS: 0x00000002,
  APPEARANCE_LOW_PROFILE_BARS: 0x00000004,
  APPEARANCE_LIGHT_STATUS_BARS: 0x00000008,
  APPEARANCE_LIGHT_NAVIGATION_BARS: 0x00000010,
  APPEARANCE_SEMI_TRANSPARENT_STATUS_BARS: 0x00000020,
  APPEARANCE_SEMI_TRANSPARENT_NAVIGATION_BARS: 0x00000040,
};

// https://developer.android.com/reference/android/view/WindowInsetsController#constants_1
const BEHAVIOR_FLAGS = {
  BEHAVIOR_DEFAULT: 0x00000001,
  BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE: 0x00000002,
};

// https://developer.android.com/reference/android/view/WindowInsets.Type
const INSETS_FLAGS = {
  STATUS_BARS: 0x00000001,
  NAVIGATION_BARS: 0x00000002,
  CAPTION_BAR: 0x00000004,
  IME: 0x00000008,
  SYSTEM_GESTURES: 0x00000010,
  MANDATORY_SYSTEM_GESTURES: 0x00000020,
  TAPPABLE_ELEMENT: 0x00000040,
  DISPLAY_CUTOUT: 0x00000080,
  WINDOW_DECOR: 0x00000100,
};

function bitwiseFlags<FlagRecord extends Record<string, number>>(
  flagRecord: FlagRecord,
  ...flags: (keyof FlagRecord)[]
): number {
  // eslint-disable-next-line no-bitwise
  return flags.reduce((a, b) => a | flagRecord[b], 0);
}

export default class AndroidSystemBars {
  private static module = isTurboModuleEnabled
    ? require('./NativeAndroidSystemBars').default
    : NativeModules.AndroidSystemBars;

  /**
   * Sets whether Android's decor view should fit root-level views
   * for WindowInsets. If set to true, the framework will inspect the
   * now deprecated View.SYSTEM_UI_LAYOUT_FLAGS as well the WindowManager.
   * LayoutParams.SOFT_INPUT_ADJUST_RESIZE flag and fits content according
   * to these flags.
   *
   * https://developer.android.com/reference/android/view/WindowInsetsController
   *
   * @param fitsSystemWindows whether the decor view should fit root-level content views for insets.
   */
  public static setDecorFitsSystemWindows(fitsSystemWindows: boolean): void {
    if (Platform.OS === 'android') {
      AndroidSystemBars.module.setDecorFitsSystemWindows(fitsSystemWindows);
    }
  }

  /**
   * Control the visibility of Android's 'system bars' (i.e. the
   * Status Bar and Navigation Bar).
   *
   * https://developer.android.com/reference/android/view/WindowInsetsController
   *
   * @param appearanceFlags array of Android system bar appearance flags.
   * @param maskFlags array of Android system bar appearance flags to change.
   */
  public static setSystemBarsAppearance(
    appearanceFlags: (keyof typeof APPEARANCE_FLAGS)[],
    maskFlags: (keyof typeof APPEARANCE_FLAGS)[]
  ): void {
    if (Platform.OS === 'android') {
      const appearance = bitwiseFlags(APPEARANCE_FLAGS, ...appearanceFlags);
      const mask = bitwiseFlags(APPEARANCE_FLAGS, ...maskFlags);

      AndroidSystemBars.module.setSystemBarsAppearance(appearance, mask);
    }
  }

  /**
   * Control the behavior of Android's 'system bars' (i.e. the
   * Status Bar and Navigation Bar).
   *
   * https://developer.android.com/reference/android/view/WindowInsetsController
   *
   * @param behavior determines how the bars behave when being hidden.
   */
  public static setSystemBarsBehavior(
    behavior: keyof typeof BEHAVIOR_FLAGS
  ): void {
    if (Platform.OS === 'android') {
      AndroidSystemBars.module.setSystemBarsBehavior(behavior);
    }
  }

  /**
   * Makes a set of Android windows causing insets disappear.
   *
   * https://developer.android.com/reference/android/view/WindowInsetsController
   *
   * @param insetsFlags vararg array of Android inset types which specify what windows the app would like to make disappear.
   */
  public static hide(insetsFlags: (keyof typeof INSETS_FLAGS)[]): void {
    if (Platform.OS === 'android') {
      const type = bitwiseFlags(INSETS_FLAGS, ...insetsFlags);
      AndroidSystemBars.module.hide(type);
    }
  }

  /**
   * Makes a set of Android windows that cause insets appear on screen.
   *
   * https://developer.android.com/reference/android/view/WindowInsetsController
   *
   * @param insetsFlags vararg array of Android inset types which specify what windows the app would like to make appear on screen.
   */
  public static show(insetsFlags: (keyof typeof INSETS_FLAGS)[]): void {
    if (Platform.OS === 'android') {
      const type = bitwiseFlags(INSETS_FLAGS, ...insetsFlags);
      AndroidSystemBars.module.show(type);
    }
  }

  /**
   *
   * Control the visibility of Android's 'system bars' (i.e. the
   * Status Bar and Navigation Bar).
   *
   * For more information on setting system UI flags on Android
   * head over to https://developer.android.com/training/system-ui
   *
   * @param flags vararg array of Android system UI flags
   * @deprecated use `setDecorFitsSystemWindows`, `setSystemBarsAppearance`, `setSystemBarsBehavior`, `show`, and `hide`.
   */
  public static setSystemUIVisibility(
    ...flags: (keyof typeof VISIBILITY_FLAGS)[]
  ): void {
    if (Platform.OS === 'android') {
      const visibility = bitwiseFlags(VISIBILITY_FLAGS, ...flags);

      AndroidSystemBars.module.setSystemUIVisibility(visibility);
    }
  }

  /**
   * Reveal/unhide the Status and Navigation Bars.
   *
   * Uses the 'SYSTEM_UI_FLAG_VISIBLE' flag.
   */
  public static clearFlags() {
    this.setSystemUIVisibility('SYSTEM_UI_FLAG_VISIBLE');
  }

  /**
   * Set your application's content to appear behind the status and navigation bar.
   *
   * https://developer.android.com/training/system-ui/status#behind
   */
  public static setContentBehindSystemBars() {
    this.setSystemUIVisibility(
      'SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN',
      'SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION',
      'SYSTEM_UI_FLAG_LAYOUT_STABLE'
    );
  }

  /**
   * Dim the status and navigation bars.
   *
   * Uses the 'SYSTEM_UI_FLAG_LOW_PROFILE' flag.
   *
   * As soon as the user touches the status or navigation bar, the
   * flag is cleared, causing the bars to be undimmed. Once the
   * flag has been cleared, your app needs to reset it if you want
   * to dim the bars again.
   *
   * https://developer.android.com/training/system-ui/dim
   */
  public static dimSystemBars() {
    this.setSystemUIVisibility('SYSTEM_UI_FLAG_LOW_PROFILE');
  }

  /**
   * Hides the status bar.
   *
   * Uses the 'SYSTEM_UI_FLAG_FULLSCREEN' flag.
   *
   * https://developer.android.com/training/system-ui/status#41
   */
  public static hideStatusBar() {
    this.setSystemUIVisibility('SYSTEM_UI_FLAG_FULLSCREEN');
  }

  /**
   * Hides the navigation bar.
   *
   * Uses the 'SYSTEM_UI_FLAG_HIDE_NAVIGATION' flag.
   *
   * https://developer.android.com/training/system-ui/navigation#40
   */
  public static hideNavigationBar() {
    this.setSystemUIVisibility('SYSTEM_UI_FLAG_FULLSCREEN');
  }

  /**
   * Hides the status bar and navigation bar.
   *
   * Uses the 'SYSTEM_UI_FLAG_HIDE_NAVIGATION' and 'SYSTEM_UI_FLAG_FULLSCREEN' flags.
   *
   * https://developer.android.com/training/system-ui/navigation#40
   */
  public static hideStatusAndNavigationBars() {
    this.setSystemUIVisibility(
      'SYSTEM_UI_FLAG_HIDE_NAVIGATION',
      'SYSTEM_UI_FLAG_FULLSCREEN'
    );
  }

  /**
   * Enables fullscreen mode by hiding the status and navigation bars with
   * different behaviors (immersive, sticky immersive or 'lean back').
   *
   * Immersive mode uses 'SYSTEM_UI_FLAG_IMMERSIVE', 'SYSTEM_UI_FLAG_FULLSCREEN'
   * and 'SYSTEM_UI_FLAG_HIDE_NAVIGATION' flags.
   *
   * Sticky immersive mode uses 'SYSTEM_UI_FLAG_IMMERSIVE_STICKY', 'SYSTEM_UI_FLAG_FULLSCREEN'
   * and 'SYSTEM_UI_FLAG_HIDE_NAVIGATION' flags.
   *
   * 'Lean back' mode uses 'SYSTEM_UI_FLAG_FULLSCREEN' and
   * 'SYSTEM_UI_FLAG_HIDE_NAVIGATION' flags.
   *
   * https://developer.android.com/training/system-ui/immersive
   *
   * @param mode 'immersive', 'sticky-immersive' or 'lean-back'.
   * @param preventResizing Defaults to false. If true, adds the
   * 'SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION' and 'SYSTEM_UI_FLAG_LAYOUT_STABLE' flags
   * See https://developer.android.com/training/system-ui/immersive#EnableFullscreen
   * for more info.
   */
  public static enableFullScreenMode(
    mode: 'immersive' | 'sticky-immersive' | 'lean-back',
    preventResizing: boolean = false
  ) {
    const extraFlags: (keyof typeof VISIBILITY_FLAGS)[] = [];

    if (preventResizing) {
      extraFlags.push('SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION');
      extraFlags.push('SYSTEM_UI_FLAG_LAYOUT_STABLE');
    }

    switch (mode) {
      case 'immersive':
        this.setSystemUIVisibility(
          'SYSTEM_UI_FLAG_IMMERSIVE',
          'SYSTEM_UI_FLAG_FULLSCREEN',
          'SYSTEM_UI_FLAG_HIDE_NAVIGATION',
          ...extraFlags
        );
        break;
      case 'sticky-immersive':
        this.setSystemUIVisibility(
          'SYSTEM_UI_FLAG_IMMERSIVE_STICKY',
          'SYSTEM_UI_FLAG_FULLSCREEN',
          'SYSTEM_UI_FLAG_HIDE_NAVIGATION',
          ...extraFlags
        );
        break;
      case 'lean-back':
        this.setSystemUIVisibility(
          'SYSTEM_UI_FLAG_FULLSCREEN',
          'SYSTEM_UI_FLAG_HIDE_NAVIGATION',
          ...extraFlags
        );
        break;
    }
  }
}
