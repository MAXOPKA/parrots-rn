import React, { PureComponent } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
});

class Loader extends PureComponent {
  render() {
    return (
      <View style={styles.container} >
        <ActivityIndicator />
      </View>
    );
  }
}

export default Loader;
