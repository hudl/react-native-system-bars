import android.app.Activity
import android.os.Build
import android.view.WindowInsets
import com.facebook.react.bridge.UiThreadUtil.runOnUiThread

object AndroidSystemBarsImpl {
  const val NAME = "AndroidSystemBars"

  fun setSystemUIVisibility(activity: Activity?, visibility: Int) {
      runOnUiThread {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.HONEYCOMB) {
          activity?.window?.decorView?.systemUiVisibility = visibility
        }
      }
  }

  fun addLayoutFlags(activity: Activity?, flags: Int) {
    runOnUiThread {
      activity?.window?.addFlags(flags)
    }
  }

  fun clearLayoutFlags(activity: Activity?, flags: Int) {
    runOnUiThread {
      activity?.window?.clearFlags(flags)
    }
  }

  fun setDecorFitsSystemWindows(activity: Activity?, fitsSystemWindows: Boolean) {
    runOnUiThread {
      if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
        activity?.window?.setDecorFitsSystemWindows(fitsSystemWindows)
      }
    }
  }

  fun setDisplayCutoutMode(activity: Activity?, cutoutMode: Int) {
    runOnUiThread {
      if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.P) {
        activity?.window?.attributes?.layoutInDisplayCutoutMode = cutoutMode
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
        WindowInsets.Type.systemBars()

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
