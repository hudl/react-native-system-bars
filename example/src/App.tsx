import React from 'react';
import { StyleSheet, View, Button } from 'react-native';

import AndroidSystemBars from 'react-native-system-bars';

export default function App() {
  return (
    <View style={styles.container}>
      <Button
        title="Clear flags"
        onPress={() => {
          AndroidSystemBars.clearFlags();
        }}
      />
      <Button
        title="Set content behind system bars"
        onPress={() => {
          AndroidSystemBars.setContentBehindSystemBars();
        }}
      />
      <Button
        title="Fullscreen mode - Immersive"
        onPress={() =>
          AndroidSystemBars.enableFullScreenMode('immersive', true)
        }
      />
      <Button
        title="Fullscreen mode - immersive sticky"
        onPress={() =>
          AndroidSystemBars.enableFullScreenMode('sticky-immersive', true)
        }
      />
      <Button
        title="Fullscreen mode - Lean back"
        onPress={() =>
          AndroidSystemBars.enableFullScreenMode('lean-back', true)
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
