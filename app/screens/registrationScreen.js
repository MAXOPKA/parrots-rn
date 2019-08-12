import React, { PureComponent } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { validateEmail } from '../core/validators';
import { resetToRoute } from '../navigation/navigationHelper';
import { registration as registrationInteractor } from '../interactors/registration'
import ErrorMessage from '../components/errorMessage';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center'
  },
});

class RegistrationScreen extends PureComponent {
  static defaultProps = {
    registring: false,
    requestError: null,
    authToken: null,
  }

  constructor(props) {
    super(props);
    this.state = {
      error: false,
      errorText: '',
      name: '',
      email: '',
      password: '',
      passwordConfirmation: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.authToken !== null) {
      resetToRoute(this.props.navigation, 'TransactionsList');
    }
  }

  validate = () => {
    let { name, email, password, passwordConfirmation } = this.state;

    if ([name, email, password, passwordConfirmation].filter(fieldValue => !fieldValue).length !== 0) {
      this.setState({ error: true, errorText: 'All fields required' });
      return false
    }
    if (!validateEmail(email)) {
      this.setState({ error: true, errorText: 'Email is not valid' });
      return false
    }
    if (password !== passwordConfirmation) {
      this.setState({ error: true, errorText: 'Passwords not equal' });
      return false
    }

    this.setState({ error: false, errorText: '' });
    return true
  }

  onPressRegistrationButton = () => {
    if (this.validate()) {
      this.props.registration(this.state.name, this.state.email, this.state.password);
    }
  }

  renderTitle = () => (
    <Text>
      {'registration'}
    </Text>
  );

  renderNameField = () => (
    <View>
      <Text>{'name'}</Text>
      <TextInput
        editable={!this.props.registring}
        value={this.state.name}
        onChangeText={ name => this.setState({ name }) }
      />
    </View>
  );

  renderEmailField = () => (
    <View>
      <Text>{'email'}</Text>
      <TextInput
        editable={!this.props.registring}
        value={this.state.email}
        onChangeText={ email => this.setState({ email }) }
      />
    </View>
  );

  renderPasswordField = () => (
    <View>
      <Text>{'password'}</Text>
      <TextInput
        editable={!this.props.registring}
        value={this.state.password}
        onChangeText={ password => this.setState({ password }) }
      />
    </View>
  );

  renderPasswordConfirmationField = () => (
    <View>
      <Text>{'retryPassword'}</Text>
      <TextInput
        editable={!this.props.registring}
        value={this.state.passwordConfirmation}
        onChangeText={ passwordConfirmation => this.setState({ passwordConfirmation }) }
      />
    </View>
  );

  renderRegistrationButton = () => (
    <Button
      onPress={this.onPressRegistrationButton}
      disabled={this.props.registring}
      title={'registerNow'}
    />
  );

  render() {
    const { requestError } = this.props;
    const { error, errorText } = this.state;

    return (
      <View styles={styles.container} >
        {this.renderTitle()}
        {this.renderNameField()}
        {this.renderEmailField()}
        {this.renderPasswordField()}
        {this.renderPasswordConfirmationField()}
        {!!requestError && <ErrorMessage errorText={requestError.errorMessage} />}
        {!!error && <ErrorMessage errorText={errorText} />}
        {this.renderRegistrationButton()}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  registring: state.registring,
  requestError: state.requestError,
  authToken: state.authToken,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  registration: (name, email, password) => dispatch(registrationInteractor(name, email, password))
});

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationScreen);
