import React, { useCallback } from 'react';
import { StyleSheet, View, Button } from 'react-native';

import AndroidSystemBars from 'react-native-system-bars';

export default function App() {
  const onImmersivePress = useCallback(() => {
    AndroidSystemBars.setSystemUIVisibility(
      'SYSTEM_UI_FLAG_IMMERSIVE',
      'SYSTEM_UI_FLAG_FULLSCREEN',
      'SYSTEM_UI_FLAG_HIDE_NAVIGATION'
    );
  }, []);

  const onClearFlagsPress = useCallback(() => {
    AndroidSystemBars.setSystemUIVisibility('SYSTEM_UI_FLAG_VISIBLE');
  }, []);

  return (
    <View style={styles.container}>
      <Button title="Go immersive" onPress={onImmersivePress} />
      <Button title="Clear flags" onPress={onClearFlagsPress} />
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
