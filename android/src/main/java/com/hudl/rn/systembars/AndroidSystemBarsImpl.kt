import android.app.Activity
import com.facebook.react.bridge.UiThreadUtil.runOnUiThread

object AndroidSystemBarsImpl {
  const val NAME = "AndroidSystemBars"

  fun setSystemUIVisibility(activity: Activity?, visibility: Int) {
      runOnUiThread {
        activity?.window?.decorView?.systemUiVisibility = visibility
      }
  }
}
