import android.app.Activity
import android.os.Build
import android.view.WindowInsetsController
import com.facebook.react.bridge.UiThreadUtil.runOnUiThread
import com.facebook.react.bridge.Promise

object AndroidSystemBarsImpl {
  const val NAME = "AndroidSystemBars"

  fun setSystemUIVisibility(activity: Activity?, visibility: Int) {
      runOnUiThread {
        activity?.window?.decorView?.systemUiVisibility = visibility
      }
  }

  fun setDecorFitsSystemWindows(activity: Activity?, fitsSystemWindows: Boolean) {
    runOnUiThread {
      if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
        activity?.window?.setDecorFitsSystemWindows(fitsSystemWindows)
      }
    }
  }

  fun setSystemBarsAppearance(activity: Activity?, appearance: Int, mask: Int) {
    runOnUiThread {
      if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
        activity?.window?.decorView?.windowInsetsController?.setSystemBarsAppearance(appearance, mask)
      }
    }
  }

  fun setSystemBarsBehavior(activity: Activity?, behavior: Int) {
    runOnUiThread {
      if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
        activity?.window?.decorView?.windowInsetsController?.systemBarsBehavior = behavior
      }
    }
  }

  fun hide(activity: Activity?, types: Int) {
    runOnUiThread {
      if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
        activity?.window?.decorView?.windowInsetsController?.hide(types)
      }
    }
  }

  fun show(activity: Activity?, types: Int) {
    runOnUiThread {
      if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
        activity?.window?.decorView?.windowInsetsController?.show(types)
      }
    }
  }
}
