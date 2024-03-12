import { bitwiseFlags } from '../AndroidSystemBarsUtil';
import AndroidSystemBarsModule from '../native-module';
import { Platform } from 'react-native';

// #region Const

const SYSTEM_UI_VISIBILITY_FLAGS = {
  SYSTEM_UI_FLAG_VISIBLE: 0x00000000,
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

// #endregion

/**
 * @deprecated Android SystemUiVisibility flags were deprecated in API 30. This module
 * exists to provide backwards compatability. Use the AndroidWindowInsets API instead.
 */
export default class AndroidSystemUIVisibility {
  private static MINIMUM_ANDROID_API_LEVEL = 11;

  public static isAPIAvailable(apiName?: string, withWarning?: boolean) {
    if (Platform.OS === 'android') {
      if (
        Platform.Version >= AndroidSystemUIVisibility.MINIMUM_ANDROID_API_LEVEL
      ) {
        return true;
      }
      if (withWarning) {
        console.warn(
          `${apiName} is not available on Android API ${Platform.Version} (API >= ${AndroidSystemUIVisibility.MINIMUM_ANDROID_API_LEVEL} required).`
        );
      }
    }
    return false;
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
   * @deprecated SystemUiVisibility flags are deprecated. Use the
   * AndroidWindowInsets API instead.
   */
  public static setSystemUIVisibility(
    ...flags: (keyof typeof SYSTEM_UI_VISIBILITY_FLAGS)[]
  ): void {
    if (
      this.isAPIAvailable(
        'AndroidSystemUIVisibility.setSystemUIVisibility',
        true
      )
    ) {
      const visibility = bitwiseFlags(SYSTEM_UI_VISIBILITY_FLAGS, ...flags);

      AndroidSystemBarsModule.setSystemUIVisibility(visibility);
    }
  }
}
