import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { getUserInfo as getUserInfoInteractor } from '../interactors/getUserInfo'

class UserInfo extends PureComponent {
  static defaultProps = {
    accountInfo: null,
    authToken: null,
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.authToken !== this.props.authToken) {
      this.props.getUserInfo()
    }
  }

  render() {
    if ([this.props.authToken, this.props.userInfo].includes(null)) {
      return null;
    }
    let { name, balance } = this.props.userInfo;

    return (
      <View>
        <Text>{name}</Text>
        <Text>{balance} PW</Text>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  userInfo: state.userInfo,
  authToken: state.authToken,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  getUserInfo: () => dispatch(getUserInfoInteractor())
});

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);
