import { Platform } from 'react-native';
import AndroidSystemBarsModule from '../native-module';
import { bitwiseFlags } from '../AndroidSystemBarsUtil';

// #region Const

// https://developer.android.com/reference/android/view/WindowInsetsController#constants_1
export const WINDOW_INSETS_APPEARANCE_FLAGS = {
  APPEARANCE_OPAQUE_STATUS_BARS: 0x00000001,
  APPEARANCE_OPAQUE_NAVIGATION_BARS: 0x00000002,
  APPEARANCE_LOW_PROFILE_BARS: 0x00000004,
  APPEARANCE_LIGHT_STATUS_BARS: 0x00000008,
  APPEARANCE_LIGHT_NAVIGATION_BARS: 0x00000010,
  APPEARANCE_SEMI_TRANSPARENT_STATUS_BARS: 0x00000020,
  APPEARANCE_SEMI_TRANSPARENT_NAVIGATION_BARS: 0x00000040,
};

// https://developer.android.com/reference/android/view/WindowInsetsController#constants_1
export const WINDOW_INSETS_BEHAVIOR_FLAGS = {
  BEHAVIOR_DEFAULT: 0x00000001,
  BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE: 0x00000002,
};

/**
 * The WindowInsets.Type members related to Android system bars.
 *
 * https://developer.android.com/reference/android/view/WindowInsets.Type
 */
export const WINDOW_INSETS_TYPES_FLAGS = {
  STATUS_BARS: 0x00000001,
  NAVIGATION_BARS: 0x00000002,
};

/**
 * The WindowManager.LayoutParams that can influence the window's appearance
 * around Android system bars and display cutouts.
 *
 * https://developer.android.com/reference/android/view/WindowManager.LayoutParams
 */
export const WINDOW_MANAGER_LAYOUT_FLAGS = {
  FLAG_LAYOUT_NO_LIMITS: 0x00000200,
  FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS: 0x80000000,
};

/**
 * Flags that control whether and where the window can extend under Android display cutouts.
 *
 * https://developer.android.com/reference/android/view/DisplayCutout
 */
export const DISPLAY_CUTOUT_FLAGS = {
  LAYOUT_IN_DISPLAY_CUTOUT_MODE_DEFAULT: 0x00000000,
  LAYOUT_IN_DISPLAY_CUTOUT_MODE_SHORT_EDGES: 0x00000001,
  LAYOUT_IN_DISPLAY_CUTOUT_MODE_NEVER: 0x00000002,
  LAYOUT_IN_DISPLAY_CUTOUT_MODE_ALWAYS: 0x00000003,
};

// #endregion

export default class AndroidWindowInsets {
  private static MINIMUM_ANDROID_API_LEVEL = 30;

  public static isAPIAvailable(apiName?: string, withWarning?: boolean) {
    if (Platform.OS === 'android') {
      if (Platform.Version >= AndroidWindowInsets.MINIMUM_ANDROID_API_LEVEL) {
        return true;
      }
      if (withWarning) {
        console.warn(
          `${apiName} is not available on Android API ${Platform.Version} (API >= ${AndroidWindowInsets.MINIMUM_ANDROID_API_LEVEL} required).`
        );
      }
    }
    return false;
  }
  /**
   * Add Android layout flags to the window.
   *
   * https://developer.android.com/reference/android/view/Window#addFlags(int)
   *
   * @param flags array of Android Window.LayoutParams flags for application to the window.
   */
  public static addLayoutFlags(
    ...flags: (keyof typeof WINDOW_MANAGER_LAYOUT_FLAGS)[]
  ): void {
    const layout = bitwiseFlags(WINDOW_MANAGER_LAYOUT_FLAGS, ...flags);
    AndroidSystemBarsModule.addLayoutFlags(layout);
  }

  /**
   * Clear Android layout flags from the window.
   *
   * https://developer.android.com/reference/android/view/Window#clearFlags(int)
   *
   * @param flags array of Android Window.LayoutParams flags to clear from the window.
   * If none are provided, all flags will be cleared.
   */
  public static clearLayoutFlags(
    ...flags: (keyof typeof WINDOW_MANAGER_LAYOUT_FLAGS)[]
  ): void {
    // If no particular flags were provided, use all available flags in the record.
    const flagsToClear =
      flags.length > 0
        ? flags
        : (Object.keys(
            WINDOW_MANAGER_LAYOUT_FLAGS
          ) as (keyof typeof WINDOW_MANAGER_LAYOUT_FLAGS)[]);
    const layout = bitwiseFlags(WINDOW_MANAGER_LAYOUT_FLAGS, ...flagsToClear);
    AndroidSystemBarsModule.clearLayoutFlags(layout);
  }

  /**
   * Sets whether Android's decor view should fit root-level views
   * for WindowInsets.
   *
   * https://developer.android.com/reference/android/view/WindowInsetsController
   *
   * @param fitsSystemWindows whether the decor view should fit root-level content views for insets.
   */
  public static setDecorFitsSystemWindows(fitsSystemWindows: boolean): void {
    if (
      AndroidWindowInsets.isAPIAvailable(
        'AndroidWindowInsets.setDecorFitsSystemWindows',
        true
      )
    ) {
      AndroidSystemBarsModule.setDecorFitsSystemWindows(fitsSystemWindows);
    }
  }

  /**
   * Changes the Android display cutout mode.
   * https://developer.android.com/develop/ui/views/layout/display-cutout
   *
   *
   * @param cutoutMode Android DisplayCutout mode for application to the window.
   */
  public static setDisplayCutoutMode(
    cutoutMode: keyof typeof DISPLAY_CUTOUT_FLAGS
  ): void {
    if (
      AndroidWindowInsets.isAPIAvailable(
        'AndroidWindowInsets.setDisplayCutoutMode',
        true
      )
    ) {
      AndroidSystemBarsModule.setDisplayCutoutMode(
        DISPLAY_CUTOUT_FLAGS[cutoutMode]
      );
    }
  }

  /**
   * Control the visibility of Android's 'system bars' (i.e. the
   * Status Bar and Navigation Bar).
   *
   * https://developer.android.com/reference/android/view/WindowInsetsController
   *
   * @param appearanceFlags array of Android system bar appearance flags.
   */
  public static setSystemBarsAppearance(
    ...flags: (keyof typeof WINDOW_INSETS_APPEARANCE_FLAGS)[]
  ): void {
    if (
      AndroidWindowInsets.isAPIAvailable(
        'AndroidWindowInsets.setSystemBarsAppearance',
        true
      )
    ) {
      const appearance = bitwiseFlags(WINDOW_INSETS_APPEARANCE_FLAGS, ...flags);

      AndroidSystemBarsModule.setSystemBarsAppearance(appearance, appearance);
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
    flag: keyof typeof WINDOW_INSETS_BEHAVIOR_FLAGS
  ): void {
    if (
      AndroidWindowInsets.isAPIAvailable(
        'AndroidWindowInsets.setSystemBarsBehavior',
        true
      )
    ) {
      AndroidSystemBarsModule.setSystemBarsBehavior(
        WINDOW_INSETS_BEHAVIOR_FLAGS[flag]
      );
    }
  }

  /**
   * Makes a set of Android windows causing insets disappear.
   *
   * https://developer.android.com/reference/android/view/WindowInsetsController#hide(int)
   *
   * @param flags vararg array of Android inset types that specify what windows the app
   * would like to make disappear.
   */
  public static hide(
    ...flags: (keyof typeof WINDOW_INSETS_TYPES_FLAGS)[]
  ): void {
    if (AndroidWindowInsets.isAPIAvailable('AndroidWindowInsets.hide', true)) {
      const type = bitwiseFlags(WINDOW_INSETS_TYPES_FLAGS, ...flags);
      AndroidSystemBarsModule.hide(type);
    }
  }

  /**
   * Makes a set of Android windows that cause insets appear on screen.
   *
   * https://developer.android.com/reference/android/view/WindowInsetsController#show(int)
   *
   * @param flags vararg array of Android inset types that specify what windows the app
   * would like to make appear on screen.
   */
  public static show(
    ...flags: (keyof typeof WINDOW_INSETS_TYPES_FLAGS)[]
  ): void {
    if (AndroidWindowInsets.isAPIAvailable('AndroidWindowInsets.show', true)) {
      const type = bitwiseFlags(WINDOW_INSETS_TYPES_FLAGS, ...flags);
      AndroidSystemBarsModule.show(type);
    }
  }
}
