package com.hudl.rn.systembars

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.UiThreadUtil.runOnUiThread

class SystemBarsModule(reactContext: ReactApplicationContext) :
  NativeSystemBarsSpec(reactContext) {

  override fun setSystemUIVisibility(visibility: Double) {
      runOnUiThread {
        getCurrentActivity()?.window?.decorView?.systemUiVisibility = visibility.toInt()
      }
  }

  companion object {
    const val NAME = NativeSystemBarsSpec.NAME
  }
}
