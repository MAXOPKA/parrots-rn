import React, { PureComponent } from 'react';
import { View, Text, TextField, Button, StyleSheet } from 'react-native';

const styles = StyleSheet.create({

});

class SelectTransactionRecepientScreen extends PureComponent {
  renderNameField = () => ([
    <Text>{'enterRecepientName'}</Text>,
    <TextField />
  ]);

  renderContinueButton = () => (
    <Button
      title={'continue'}
    />
  );

  render() {
    return (
      <View styles={styles.container} >
        {this.renderNameField()}
        {this.renderContinueButton()}
      </View>
    );
  }
}

export default SelectTransactionRecepientScreen;
