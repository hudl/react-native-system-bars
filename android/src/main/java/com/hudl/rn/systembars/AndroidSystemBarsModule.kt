package com.hudl.rn.systembars

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.UiThreadUtil.runOnUiThread

class AndroidSystemBarsModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    override fun getName() = "AndroidSystemBars"

    @ReactMethod
    fun setSystemUIVisibility(visibility: Int) {
        runOnUiThread {
            currentActivity?.window?.decorView?.systemUiVisibility = visibility
        }
    }
}
