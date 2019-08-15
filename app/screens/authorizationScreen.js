import React, { PureComponent } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Button } from 'react-native-material-ui';
import { connect } from 'react-redux';
import { validateEmail } from '../core/validators';
import NavigationService from '../services/navigationService';
import { loginAction } from '../interactors/loginInteractor';
import ErrorMessage from '../components/errorMessage';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  block: {
    marginTop: 16,
  },
  textInput: {
    marginTop: 4,
    paddingTop: 8,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderColor: '#e5e5e5',
  },
});

class AuthorizationScreen extends PureComponent {
  static navigationOptions = {
    title: 'Login',
    headerBackTitle: 'Back',
  };

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

  renderEmailField = () => (
    <View style={styles.block} >
      <Text>
        {'Email'}
      </Text>
      <TextInput
        style={styles.textInput}
        editable={!this.props.authorizing}
        value={this.state.email}
        onChangeText={ email => this.setState({ email }) }
      />
    </View>
  );

  renderPasswordField = () => (
    <View style={styles.block} >
      <Text>
        {'Password'}
      </Text>
      <TextInput
        style={styles.textInput}
        editable={!this.props.authorizing}
        value={this.state.password}
        onChangeText={ password => this.setState({ password }) }
      />
    </View>
  );

  renderLoginButton = () => (
    <Button
      style={{ container: styles.block }}
      raised
      primary
      disabled={this.props.authorizing}
      onPress={this.onPressLoginButton}
      text={'login'}
    />
  );

  renderToRegistrationButton = () => (
    <Button
      style={{ container: styles.block }}
      raised
      text={'registration'}
      onPress={this.onPressToRegistrationButton}
    />
  );

  render() {
    const { requestError } = this.props;
    const { error, errorText } = this.state;

    return (
      <View style={styles.container} >
        {this.renderEmailField()}
        {this.renderPasswordField()}
        {!!requestError && <ErrorMessage style={styles.block} errorText={requestError.errorMessage} />}
        {!!error && <ErrorMessage style={styles.block} errorText={errorText} />}
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
  login: (email, password) => dispatch(loginAction(email, password))
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthorizationScreen);
