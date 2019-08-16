import React, { PureComponent } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Button } from 'react-native-material-ui';
import { connect } from 'react-redux';
import { validateEmail } from '../core/validators';
import NavigationService from '../services/navigationService';
import { registrationAction } from '../interactors/registrationInteractor'
import ErrorMessage from '../components/errorMessage';

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
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

class RegistrationScreen extends PureComponent {
  static navigationOptions = {
    title: 'Registration',
  };

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

  renderNameField = () => (
    <View style={styles.block} >
      <Text>{'Name'}</Text>
      <TextInput
        autoCompleteType={'off'}
        autoCompleteType={'off'}
        style={styles.textInput}
        editable={!this.props.registring}
        value={this.state.name}
        onChangeText={ name => this.setState({ name }) }
      />
    </View>
  );

  renderEmailField = () => (
    <View style={styles.block} >
      <Text>{'Email'}</Text>
      <TextInput
        autoCompleteType={'off'}
        style={styles.textInput}
        editable={!this.props.registring}
        value={this.state.email}
        onChangeText={ email => this.setState({ email }) }
      />
    </View>
  );

  renderPasswordField = () => (
    <View style={styles.block} >
      <Text>{'Password'}</Text>
      <TextInput
        secureTextEntry
        autoCompleteType={'off'}
        style={styles.textInput}
        editable={!this.props.registring}
        value={this.state.password}
        onChangeText={ password => this.setState({ password }) }
      />
    </View>
  );

  renderPasswordConfirmationField = () => (
    <View style={styles.block} >
      <Text>{'Retry password'}</Text>
      <TextInput
        secureTextEntry
        autoCompleteType={'off'}
        style={styles.textInput}
        editable={!this.props.registring}
        value={this.state.passwordConfirmation}
        onChangeText={ passwordConfirmation => this.setState({ passwordConfirmation }) }
      />
    </View>
  );

  renderRegistrationButton = () => (
    <Button
      style={{ container: styles.block }}
      primary
      raised
      onPress={this.onPressRegistrationButton}
      disabled={this.props.registring}
      text={'Create account'}
    />
  );

  render() {
    const { requestError } = this.props;
    const { error, errorText } = this.state;

    return (
      <View style={styles.container} >
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
  registration: (name, email, password) => dispatch(registrationAction(name, email, password))
});

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationScreen);
