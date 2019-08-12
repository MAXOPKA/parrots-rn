import React, { PureComponent } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
  },
})

class ErrorMessage extends PureComponent {
  static defaultProps = {
    errorText: '',
  }

  render() {
    return (
      <View styles={styles.container} >
        <Text styles={styles.errorText} >
          {this.props.errorText}
        </Text>
      </View>
    );
  }
}

export default ErrorMessage;
