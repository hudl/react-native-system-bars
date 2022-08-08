import { TurboModule, TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  readonly getConstants: () => {};

  setSystemUIVisibility(visibility: number): void;
}

export default TurboModuleRegistry.get<Spec>('AndroidSystemBars');
