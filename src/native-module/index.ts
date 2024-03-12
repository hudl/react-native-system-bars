import { NativeModules } from 'react-native';
import type { Spec } from './new-arch/NativeAndroidSystemBars';

export interface AndroidSystemBarsModuleSpec
  extends Omit<Spec, 'getConstants'> {}

// @ts-ignore-error
const isTurboModuleEnabled = global.__turboModuleProxy != null;

const AndroidSystemBarsModule: AndroidSystemBarsModuleSpec =
  isTurboModuleEnabled
    ? require('./new-arch/NativeAndroidSystemBars').default
    : NativeModules.AndroidSystemBars;

export default AndroidSystemBarsModule;
