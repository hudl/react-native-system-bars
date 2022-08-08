package com.hudl.rn.systembars

import com.facebook.react.TurboReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.model.ReactModuleInfo
import com.facebook.react.module.model.ReactModuleInfoProvider

class AndroidSystemBarsPackage : TurboReactPackage() {

  override fun getModule(name: String, reactContext: ReactApplicationContext): NativeModule? {
    return if (name == AndroidSystemBarsImpl.NAME) {
      AndroidSystemBarsModule(reactContext)
    } else null
  }

  override fun getReactModuleInfoProvider(): ReactModuleInfoProvider {
    return ReactModuleInfoProvider {
      val isTurboModule = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED

      hashMapOf(
        AndroidSystemBarsImpl.NAME to ReactModuleInfo(
          AndroidSystemBarsImpl.NAME,
          AndroidSystemBarsImpl.NAME,
          false,
          false,
          true,
          false,
          isTurboModule
        )
      )
    }
  }
}
