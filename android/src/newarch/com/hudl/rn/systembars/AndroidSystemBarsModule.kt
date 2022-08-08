package com.hudl.rn.systembars

import com.facebook.react.bridge.ReactApplicationContext
import com.hudl.rn.systembars.generated.NativeAndroidSystemBarsSpec

class AndroidSystemBarsModule(reactContext: ReactApplicationContext) :
  NativeAndroidSystemBarsSpec(reactContext) {
  override fun getName() = AndroidSystemBarsImpl.NAME

  override fun setSystemUIVisibility(visibility: Double) {
    AndroidSystemBarsImpl.setSystemUIVisibility(currentActivity, visibility.toInt())
  }
}
