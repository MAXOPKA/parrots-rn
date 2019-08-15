import React, { PureComponent } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

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

class AppLoader extends PureComponent {
  render() {
    if (this.props.loaderFlags.filter(flag => !!flag).length === 0) {
      return null;
    }

    return (
      <View style={styles.container} >
        <ActivityIndicator size={'large'} />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  loaderFlags: [state.registring, state.authorizing, state.creatingTransaction],
});

export default connect(mapStateToProps)(AppLoader);
