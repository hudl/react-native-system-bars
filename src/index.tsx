import { NativeModules, Platform } from 'react-native';

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
  private static module = NativeModules.AndroidSystemBars;

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
}
