import React, { PureComponent } from 'react';
import { View, Text, TextInput, Alert, StyleSheet } from 'react-native';
import { Button, ListItem } from 'react-native-material-ui';
import { connect } from 'react-redux';
import { createTransactionAction } from '../interactors/createTransactionInteractor';
import { getUserInfoAction } from '../interactors/getUserInfoInteractor';
import { updateNewTransaction } from '../redux/actions';
import NavigationService from '../services/navigationService';
import ErrorMessage from '../components/errorMessage';

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  block: {
    marginTop: 16,
  },
  recepientName: {
    fontStyle: 'italic',
  },
  textInput: {
    marginTop: 4,
    paddingTop: 8,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderColor: '#e5e5e5',
  },
});

class EnterTransactionAmountScreen extends PureComponent {
  static navigationOptions = {
    title: 'Amount',
  };

  constructor(props) {
    super(props);

    this.state = {
      error: false,
      errorText: null,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.creatingTransaction === true && nextProps.creatingTransaction === false) {
      if (!nextProps.requestError) {
        this.props.getUserInfo();
        this.showSuccessAlert(nextProps.createdTransaction.balance);
        NavigationService.resetToRoute('TransactionsList');
      }
    }
  }

  onChangeAmount = amount => {
    this.props.updateNewTransaction({ amount });
    this.amountIsValid(amount);
  }

  onPressSendButton = () => {
    this.showConfirmationDialog();
  };

  onConfirmTransaction = () => {
    let { name, amount } = this.props.newTransaction;

    this.props.createTransaction(name, amount);
  }

  amountIsValid = amount => {
    let { balance } = this.props.userInfo;

    if (amount < 0) {
      this.setState({ error: true, errorText: 'Invalid amount' });
      return;
    }

    if (amount > balance) {
      this.setState({ error: true, errorText: 'Not enough PW' });
      return;
    }

    this.setState({ error: false, errorText: null });
  }

  showConfirmationDialog = () => {
    let { amount, name } = this.props.newTransaction;

    Alert.alert(
      'You are shure?',
      `Recepient: ${name}, Amount: ${amount} PW`,
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        { text: 'OK', onPress: () => this.onConfirmTransaction() }
      ],
    );
  }

  showSuccessAlert = balance => {
    Alert.alert(
      'Success!',
      `Current balance ${balance} PW`,
      [
        { text: 'OK', onPress: () => {} }
      ],
      {cancelable: false},
    );
  }

  renderAmountTextInput = () => (
    <View>
      <Text>
        Amount PW for
        <Text style={styles.recepientName} > {this.props.newTransaction.name}</Text>
      </Text>
      <TextInput
        style={styles.textInput}
        value={this.props.newTransaction.amount ? this.props.newTransaction.amount.toString() : ''}
        onChangeText={amount => this.onChangeAmount(parseInt(amount, 10) || 0 )}
      />
    </View>
  );

  renderSendButton = () => (
    <Button
      style={{ container: styles.block }}
      raised
      primary
      text={'Send PW'}
      onPress={this.onPressSendButton}
      disabled={this.state.error || !this.props.newTransaction.amount}
    />
  );

  render() {
    const { requestError } = this.props;
    const { error, errorText } = this.state;

    return (
      <View style={styles.container} >
        {this.renderAmountTextInput()}
        {!!error && <ErrorMessage errorText={errorText} />}
        {!!requestError && <ErrorMessage errorText={requestError.errorMessage} />}
        {this.renderSendButton()}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  newTransaction: state.newTransaction,
  createdTransaction: state.createdTransaction,
  userInfo: state.userInfo,
  creatingTransaction: state.creatingTransaction,
  requestError: state.requestError,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  updateNewTransaction: newTransaction => dispatch(updateNewTransaction(newTransaction)),
  createTransaction: (name, amount) => dispatch(createTransactionAction(name, amount)),
  getUserInfo: () => dispatch(getUserInfoAction())
});

export default connect(mapStateToProps, mapDispatchToProps)(EnterTransactionAmountScreen);
