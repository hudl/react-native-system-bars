package com.hudl.rn.systembars

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class AndroidSystemBarsModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
  override fun getName() = AndroidSystemBarsImpl.NAME

  @ReactMethod
  fun setSystemUIVisibility(visibility: Int) {
    AndroidSystemBarsImpl.setSystemUIVisibility(currentActivity, visibility)
  }

  @ReactMethod
  fun addLayoutFlags(flags: Int) {
    AndroidSystemBarsImpl.addLayoutFlags(currentActivity, flags)
  }

  @ReactMethod
  fun clearLayoutFlags(flags: Int) {
    AndroidSystemBarsImpl.clearLayoutFlags(currentActivity, flags)
  }

  @ReactMethod
  fun setDecorFitsSystemWindows(fitsSystemWindows: Boolean) {
    AndroidSystemBarsImpl.setDecorFitsSystemWindows(currentActivity, fitsSystemWindows)
  }

  @ReactMethod
  fun setDisplayCutoutMode(cutoutMode: Int) {
    AndroidSystemBarsImpl.setDisplayCutoutMode(currentActivity, cutoutMode)
  }

  @ReactMethod
  fun setSystemBarsAppearance(appearance: Int, mask: Int) {
    AndroidSystemBarsImpl.setSystemBarsAppearance(currentActivity, appearance, mask)
  }

  @ReactMethod
  fun setSystemBarsBehavior(behavior: Int) {
    AndroidSystemBarsImpl.setSystemBarsBehavior(currentActivity, behavior)
  }

  @ReactMethod
  fun hide(types: Int) {
    AndroidSystemBarsImpl.hide(currentActivity, types)
  }

  @ReactMethod
  fun show(types: Int) {
    AndroidSystemBarsImpl.show(currentActivity, types)
  }
}
