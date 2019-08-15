import React, { PureComponent } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Button } from 'react-native-material-ui';
import { connect } from 'react-redux';
import { getUsersAction } from '../interactors/getUsersInteractor';
import { updateNewTransaction } from '../redux/actions';
import ErrorMessage from '../components/errorMessage';
import Empty from '../components/empty';
import Loader from '../components/loader';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  autocomplete: {
    position: 'absolute',
    backgroundColor: 'white',
    minHeight: 24,
    zIndex: 99,
    top: 56,
    left: 0,
    right: 0,
  },
  autocompleteContent: {
    backgroundColor: 'white',
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
  userItem: {
    paddingTop: 2,
    paddingBottom: 2,
    backgroundColor: 'white',
  },
});

class SelectTransactionRecepientScreen extends PureComponent {
  static navigationOptions = {
    title: 'Recepient',
    headerBackTitle: 'Back',
  };

  constructor(props) {
    super(props);

    this.state = {
      userName: props.newTransaction.name,
      autocompleteListIsOpen: false,
    }
  }

  onChangeUserName = userName => {
    this.setState({
      userName,
      autocompleteListIsOpen: userName ? true : false,
    });
    this.props.getUsers(userName);
  }

  onSelectUserselectedUser = user => {
    this.setState({ userName: user.name, autocompleteListIsOpen: false });
    this.props.updateNewTransaction({ name: user.name })
  }

  onPressContinueButton = () => {
    this.props.navigation.push('EnterTransactionAmount');
  }

  renderUserItem = user => (
    <TouchableOpacity
      style={styles.userItem}
      onPress={ () => this.onSelectUserselectedUser(user) }
    >
      <Text>{user.name}</Text>
    </TouchableOpacity>
  );

  renderNameField = () => (
    <View>
      <Text>{'Enter Recepient Name'}</Text>
      <TextInput
        style={styles.textInput}
        value={this.state.userName}
        onChangeText={this.onChangeUserName}
      />
      {this.state.autocompleteListIsOpen && this.renderUserAutocomplete()}
      {this.renderContinueButton()}
    </View>
  );

  renderUsersList = () => (
    <FlatList
      data={this.props.users.map(user => ({ ...user, key: `${user.id}` }))}
      renderItem={({ item }) => this.renderUserItem(item)}
    />
  );

  renderUsersFilterResult = () => {
    if (this.props.users.length === 0) {
      return(<Empty title={'Users not found'} />);
    } else {
      return(this.renderUsersList());
    }
  }

  renderUserAutocomplete = () => (
    <View style={styles.autocomplete} >
      <View style={styles.autocompleteContent} >
        {!!this.props.gettingUsers && <Loader /> }
        {!this.props.gettingUsers && this.renderUsersFilterResult() }
      </View>
    </View>
  );

  renderContinueButton = () => (
    <Button
      style={{ container: styles.block }}
      primary
      raised
      onPress={this.onPressContinueButton}
      disabled={!this.props.newTransaction.name}
      text={'continue'}
    />
  );

  render() {
    return (
      <View style={styles.container} >
        {this.renderNameField()}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users,
  gettingUsers: state.gettingUsers,
  requestError: state.requestError,
  newTransaction: state.newTransaction,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  getUsers: filterString => dispatch(getUsersAction(filterString)),
  updateNewTransaction: newTransaction => dispatch(updateNewTransaction(newTransaction)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectTransactionRecepientScreen);
