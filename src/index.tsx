import AndroidSystemUIVisibility from './api/AndroidSystemUIVisibility';
import AndroidWindowInsets from './api/AndroidWindowInsets';

export default class AndroidSystemBars {
  /**
   * Reset all flags to their default values.
   */
  public static reset() {
    if (AndroidWindowInsets.isAPIAvailable()) {
      AndroidWindowInsets.clearLayoutFlags();
      AndroidWindowInsets.setDisplayCutoutMode(
        'LAYOUT_IN_DISPLAY_CUTOUT_MODE_DEFAULT'
      );
      AndroidWindowInsets.setSystemBarsAppearance(
        'APPEARANCE_OPAQUE_NAVIGATION_BARS',
        'APPEARANCE_OPAQUE_STATUS_BARS'
      );
      AndroidWindowInsets.setSystemBarsBehavior('BEHAVIOR_DEFAULT');
      AndroidWindowInsets.show('NAVIGATION_BARS', 'STATUS_BARS');
      AndroidWindowInsets.setDecorFitsSystemWindows(true);
    } else {
      AndroidSystemUIVisibility.setSystemUIVisibility('SYSTEM_UI_FLAG_VISIBLE');
    }
  }

  /**
   * Set your application's content to appear behind the status and navigation bar.
   */
  public static setContentBehindSystemBars() {
    if (AndroidWindowInsets.isAPIAvailable()) {
      AndroidWindowInsets.addLayoutFlags('FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS');
      AndroidWindowInsets.setDecorFitsSystemWindows(false);
    } else {
      AndroidSystemUIVisibility.setSystemUIVisibility(
        'SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN',
        'SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION',
        'SYSTEM_UI_FLAG_LAYOUT_STABLE'
      );
    }
  }

  /**
   * Hides the status bar.
   */
  public static hideStatusBar() {
    if (AndroidWindowInsets.isAPIAvailable()) {
      AndroidWindowInsets.setSystemBarsBehavior(
        'BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE'
      );
      AndroidWindowInsets.hide('STATUS_BARS');
    } else {
      AndroidSystemUIVisibility.setSystemUIVisibility(
        'SYSTEM_UI_FLAG_FULLSCREEN'
      );
    }
  }

  /**
   * Hides the navigation bar.
   */
  public static hideNavigationBar() {
    if (AndroidWindowInsets.isAPIAvailable()) {
      AndroidWindowInsets.setSystemBarsBehavior(
        'BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE'
      );
      AndroidWindowInsets.hide('NAVIGATION_BARS');
    } else {
      AndroidSystemUIVisibility.setSystemUIVisibility(
        'SYSTEM_UI_FLAG_FULLSCREEN'
      );
    }
  }

  /**
   * Hides the status bar and navigation bars.
   */
  public static hideStatusAndNavigationBars() {
    if (AndroidWindowInsets.isAPIAvailable()) {
      AndroidWindowInsets.setSystemBarsBehavior(
        'BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE'
      );
      AndroidWindowInsets.hide('STATUS_BARS', 'NAVIGATION_BARS');
    } else {
      AndroidSystemUIVisibility.setSystemUIVisibility(
        'SYSTEM_UI_FLAG_HIDE_NAVIGATION',
        'SYSTEM_UI_FLAG_FULLSCREEN'
      );
    }
  }

  /**
   * Enables fullscreen mode by hiding the status and navigation bars with
   * different behaviors (immersive or sticky immersive).
   *
   * * Immersive mode hides the status and navigation bars until a user interaction
   * (such as a downwards swipe from the top of the screen) causes them to reappear
   * and remain visible.
   *
   * * Sticky immersive mode hides the status and navigation bars until a user interaction
   * (such as a downwards swipe from the top of the screen) causes them to reappear temporarily.
   *
   * @param mode 'immersive' or 'sticky-immersive'.
   */
  public static enableFullScreenMode(mode: 'immersive' | 'sticky-immersive') {
    if (AndroidWindowInsets.isAPIAvailable()) {
      if (mode === 'immersive') {
        AndroidWindowInsets.setSystemBarsBehavior('BEHAVIOR_DEFAULT');
      } else {
        AndroidWindowInsets.setSystemBarsBehavior(
          'BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE'
        );
        AndroidWindowInsets.setDecorFitsSystemWindows(false);
      }
      AndroidWindowInsets.setDisplayCutoutMode(
        'LAYOUT_IN_DISPLAY_CUTOUT_MODE_SHORT_EDGES'
      );
      AndroidWindowInsets.addLayoutFlags('FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS');
      AndroidWindowInsets.hide('STATUS_BARS', 'NAVIGATION_BARS');
    } else {
      AndroidSystemUIVisibility.setSystemUIVisibility(
        mode === 'immersive'
          ? 'SYSTEM_UI_FLAG_IMMERSIVE'
          : 'SYSTEM_UI_FLAG_IMMERSIVE_STICKY',
        'SYSTEM_UI_FLAG_FULLSCREEN',
        'SYSTEM_UI_FLAG_HIDE_NAVIGATION'
      );
    }
  }
}

export { AndroidWindowInsets, AndroidSystemUIVisibility };
