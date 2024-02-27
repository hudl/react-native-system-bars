import { TurboModule, TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  readonly getConstants: () => {};

  setSystemUIVisibility(visibility: number): void;

  setDecorFitsSystemWindows(fitsSystemWindows: boolean): void;

  setSystemBarsAppearance(appearance: number, mask: number): void;

  setSystemBarsBehavior(behavior: number): void;

  hide(types: number): void;

  show(types: number): void;
}

export default TurboModuleRegistry.get<Spec>('AndroidSystemBars');
