import React, { PureComponent } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#a5a5a5',
  },
});

class Loader extends PureComponent {
static defaultProps = {
  title: 'not found',
};

  render() {
    return (
      <View style={styles.container} >
        <Text style={styles.text} >
          {this.props.title}
        </Text>
      </View>
    );
  }
}

export default Loader;
