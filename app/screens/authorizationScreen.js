import React, { PureComponent } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { validateEmail } from '../core/validators';
import { resetToRoute } from '../navigation/navigationHelper';
import { login as loginInteractor } from '../interactors/login'
import ErrorMessage from '../components/errorMessage';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
  },
});

class AuthorizationScreen extends PureComponent {
  static defaultProps = {
    authorizing: false,
    requestError: null,
    authToken: null,
  }

  constructor(props) {
    super(props);
    this.state = {
      error: false,
      errorText: '',
      email: '',
      password: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.authToken !== null) {
      resetToRoute(this.props.navigation, 'TransactionsList')
    }
  }

  validate = () => {
    let { name, email, password, passwordConfirmation } = this.state;

    if ([email, password].filter(fieldValue => !fieldValue).length !== 0) {
      this.setState({ error: true, errorText: 'All fields required' });
      return false
    }
    if (!validateEmail(email)) {
      this.setState({ error: true, errorText: 'Email is not valid' });
      return false
    }

    this.setState({ error: false, errorText: '' });
    return true
  }

  onPressLoginButton = () => {
    if (this.validate()) {
      this.props.login(this.state.email, this.state.password);
    }
  }

  onPressToRegistrationButton = () => {
    this.props.navigation.push('Registration')
  }

  renderTitle = () => (
    <Text>
      {'authorization'}
    </Text>
  );

  renderEmailField = () => (
    <View>
      <Text>
        {'email'}
      </Text>
      <TextInput
        editable={!this.props.authorizing}
        value={this.state.email}
        onChangeText={ email => this.setState({ email }) }
      />
    </View>
  );

  renderPasswordField = () => (
    <View>
      <Text>
        {'password'}
      </Text>
      <TextInput
        editable={!this.props.authorizing}
        value={this.state.password}
        onChangeText={ password => this.setState({ password }) }
      />
    </View>
  );

  renderLoginButton = () => (
    <Button
      disabled={this.props.authorizing}
      onPress={this.onPressLoginButton}
      title={'login'}
    />
  );

  renderToRegistrationButton = () => (
    <TouchableOpacity
      onPress={this.onPressToRegistrationButton}
    >
      <Text>{'registration'}</Text>
    </TouchableOpacity>
  );

  render() {
    const { requestError } = this.props;
    const { error, errorText } = this.state;

    return (
      <View styles={styles.container} >
        {this.renderTitle()}
        {this.renderEmailField()}
        {this.renderPasswordField()}
        {!!requestError && <ErrorMessage errorText={requestError.errorMessage} />}
        {!!error && <ErrorMessage errorText={errorText} />}
        {this.renderLoginButton()}
        {this.renderToRegistrationButton()}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  authorizing: state.authorizing,
  requestError: state.requestError,
  authToken: state.authToken,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  login: (email, password) => dispatch(loginInteractor(email, password))
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthorizationScreen);
