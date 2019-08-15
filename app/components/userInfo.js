import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Button } from 'react-native-material-ui';
import { connect } from 'react-redux';
import { getUserInfoAction } from '../interactors/getUserInfoInteractor';
import { logoutAction } from '../interactors/logoutInteractor';

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  infoText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  block: {
    marginTop: 16,
  },
  value: {
    fontWeight: 'bold',
  },
});

class UserInfo extends PureComponent {
  static defaultProps = {
    accountInfo: null,
    authToken: null,
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.authToken !== this.props.authToken && nextProps.authToken !== null) {
      this.props.getUserInfo()
    }
  }

  onPressLogoutButton = () => this.props.logout()

  renderTextInfo = () => (
    <View style={styles.infoText} >
      <Text>
        Your name: <Text style={styles.value} >{this.props.userInfo.name}</Text>
      </Text>
      <Text>
        Balance: <Text style={styles.value} >{this.props.userInfo.balance} PW</Text>
      </Text>
    </View>
  );

  renderLogoutButton = () => (
    <Button
      raised
      onPress={this.onPressLogoutButton}
      text={'Logout'}
      style={{ container: styles.block }}
    />
  );

  render() {
    if ([this.props.authToken, this.props.userInfo].includes(null)) {
      return null;
    }

    return (
      <View style={styles.container} >
        {this.renderTextInfo()}
        {this.renderLogoutButton()}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  userInfo: state.userInfo,
  authToken: state.authToken,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  getUserInfo: () => dispatch(getUserInfoAction()),
  logout: () => dispatch(logoutAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);
