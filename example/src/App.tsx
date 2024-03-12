import React from 'react';
import { StyleSheet, View, Button } from 'react-native';

import AndroidSystemBars from 'react-native-system-bars';

export default function App() {
  return (
    <View style={styles.container}>
      <Button
        title="Reset"
        onPress={() => {
          AndroidSystemBars.reset();
        }}
      />
      <Button
        title="Set content behind system bars"
        onPress={() => {
          AndroidSystemBars.setContentBehindSystemBars();
        }}
      />
      <Button
        title="Hide status bar"
        onPress={() => {
          AndroidSystemBars.hideStatusBar();
        }}
      />
      <Button
        title="Hide navigation bar"
        onPress={() => {
          AndroidSystemBars.hideNavigationBar();
        }}
      />
      <Button
        title="Hide status and navigation bars"
        onPress={() => {
          AndroidSystemBars.hideStatusAndNavigationBars();
        }}
      />
      <Button
        title="Fullscreen mode - Immersive"
        onPress={() => AndroidSystemBars.enableFullScreenMode('immersive')}
      />
      <Button
        title="Fullscreen mode - immersive sticky"
        onPress={() =>
          AndroidSystemBars.enableFullScreenMode('sticky-immersive')
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
