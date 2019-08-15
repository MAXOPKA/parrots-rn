import React, { PureComponent } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    height: 16,
  },
  errorText: {
    color: 'red',
  },
})

class ErrorMessage extends PureComponent {
  static defaultProps = {
    errorText: '',
    style: {},
  }

  render() {
    return (
      <View style={{ ...styles.container, ...this.props.style }} >
        <Text style={styles.errorText} >
          {this.props.errorText}
        </Text>
      </View>
    );
  }
}

export default ErrorMessage;
