import { NativeModules, Platform } from 'react-native';

// @ts-ignore-error
const isTurboModuleEnabled = global.__turboModuleProxy != null;

const visibilityFlags = {
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

export default class AndroidSystemBars {
  private static module = isTurboModuleEnabled
    ? require('./NativeAndroidSystemBars').default
    : NativeModules.AndroidSystemBars;

  /**
   * Control the visibility of Android's 'system bars' (i.e. the
   * Status Bar and Navigation Bar).
   *
   * For more information on setting system UI flags on Android
   * head over to https://developer.android.com/training/system-ui
   *
   * @param flags vararg array of Android system UI flags
   */
  public static setSystemUIVisibility(
    ...flags: (keyof typeof visibilityFlags)[]
  ): void {
    if (Platform.OS === 'android') {
      // eslint-disable-next-line no-bitwise
      const visibility = flags.reduce((a, b) => a | visibilityFlags[b], 0);

      AndroidSystemBars.module.setSystemUIVisibility(visibility);
    }
  }

  /**
   * Reveal/unhide the Status and Navigation Bars.
   *
   * USes the 'SYSTEM_UI_FLAG_VISIBLE' flag.
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
    const extraFlags: (keyof typeof visibilityFlags)[] = [];

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
