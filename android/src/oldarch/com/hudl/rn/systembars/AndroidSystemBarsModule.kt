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
}
