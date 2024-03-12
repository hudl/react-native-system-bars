package com.hudl.rn.systembars

import com.facebook.react.bridge.ReactApplicationContext
import com.hudl.rn.systembars.generated.NativeAndroidSystemBarsSpec

class AndroidSystemBarsModule(reactContext: ReactApplicationContext) :
  NativeAndroidSystemBarsSpec(reactContext) {
  override fun getName() = AndroidSystemBarsImpl.NAME

  override fun setSystemUIVisibility(visibility: Double) {
    AndroidSystemBarsImpl.setSystemUIVisibility(currentActivity, visibility.toInt())
  }

  override fun addLayoutFlags(flags: Double) {
    AndroidSystemBarsImpl.addLayoutFlags(currentActivity, flags.toInt())
  }

  override fun clearLayoutFlags(flags: Double) {
    AndroidSystemBarsImpl.clearLayoutFlags(currentActivity, flags.toInt())
  }

  override fun setDecorFitsSystemWindows(fitsSystemWindows: Boolean) {
    AndroidSystemBarsImpl.setDecorFitsSystemWindows(currentActivity, fitsSystemWindows)
  }

  override fun setDisplayCutoutMode(cutoutMode: Double) {
    AndroidSystemBarsImpl.setDisplayCutoutMode(currentActivity, cutoutMode.toInt())
  }

  override fun setSystemBarsAppearance(appearance: Double, mask: Double) {
    AndroidSystemBarsImpl.setSystemBarsAppearance(currentActivity, appearance.toInt(), mask.toInt())
  }

  override fun setSystemBarsBehavior(behavior: Double) {
    AndroidSystemBarsImpl.setSystemBarsBehavior(currentActivity, behavior.toInt())
  }

  override fun hide(types: Double) {
    AndroidSystemBarsImpl.hide(currentActivity, types.toInt())
  }

  override fun show(types: Double) {
    AndroidSystemBarsImpl.hide(currentActivity, types.toInt())
  }
}
