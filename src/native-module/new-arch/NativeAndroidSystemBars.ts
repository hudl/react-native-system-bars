import { TurboModule, TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  setSystemUIVisibility(visibility: number): void;

  addLayoutFlags(flags: number): void;

  clearLayoutFlags(flags: number): void;

  setDecorFitsSystemWindows(fitsSystemWindows: boolean): void;

  setDisplayCutoutMode(cutoutMode: number): void;

  setSystemBarsAppearance(appearance: number, mask: number): void;

  setSystemBarsBehavior(behavior: number): void;

  hide(types: number): void;

  show(types: number): void;
}

export default TurboModuleRegistry.get<Spec>('AndroidSystemBars');
