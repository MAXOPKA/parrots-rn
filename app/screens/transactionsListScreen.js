import React, { PureComponent } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { ActionButton, ListItem, Icon } from 'react-native-material-ui';
import Empty from '../components/empty';
import Loader from '../components/loader';
import { connect } from 'react-redux';
import { getTransactionsAction } from '../interactors/getTransactionsInteractor';
import { updateNewTransaction } from '../redux/actions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 16,
    paddingRight: 16,
  },
  rowBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  value: {
    fontWeight: 'bold',
  },
  listFooter: {
    height: 84,
  },
})

class TransactionsListScreen extends PureComponent {
  static navigationOptions = {
    title: 'Transactions',
    headerBackTitle: 'Back',
  };

  componentDidMount() {
    this.props.getTransactions();
  }

  onPressNewTransactionButton = () => {
    this.props.updateNewTransaction({ name: '', amount: 0 });
    this.props.navigation.push('SelectTransactionRecepient');
  }

  onPressRetryTransaction = transaction => {
    this.props.updateNewTransaction({ name: transaction.username, amount: Math.abs(transaction.amount) });
    this.props.navigation.push('EnterTransactionAmount');
  }

  renderRowContent = transaction => (
    <View>
      <Text>
        Date: <Text style={styles.value} >{transaction.date}</Text>
      </Text>
      <View style={styles.rowBottom} >
        <Text>To: <Text style={styles.value} >{transaction.username}</Text></Text>
        <Text>Amount: <Text style={styles.value} >{transaction.amount} PW</Text></Text>
      </View>
    </View>
  );

  renderRetryTransactionButton = transaction => (
    <TouchableOpacity
      onPress={() => this.onPressRetryTransaction(transaction)}
    >
      <Icon name="sync"/>
    </TouchableOpacity>
  );

  renderTransactionItem = transaction => (
    <ListItem
      divider
      centerElement={this.renderRowContent(transaction)}
      rightElement={transaction.amount > 0 ? null : this.renderRetryTransactionButton(transaction)}
    />
  );

  renderTransactionsList = () => (
    <FlatList
      ListFooterComponent={<View style={styles.listFooter} />}
      data={this.props.transactions.map(transaction => ({ ...transaction, key: `${transaction.id}` }))}
      renderItem={({ item }) => this.renderTransactionItem(item)}
    />
  );

  renderTransactions = () => {
    if (this.props.transactions.length === 0) {
      return <Empty title={'Transactions not found'} />
    } else {
      return this.renderTransactionsList();
    }
  }

  renderNewTransactionButton = () => (
    <ActionButton
      style={{container: { shadowRadius: 56 }}}
      onPress={this.onPressNewTransactionButton}
      icon={'add'}
    />
  );

  render() {
    return (
      <View style={styles.container} >
        {!this.props.gettingTransactions && this.renderTransactions()}
        {this.props.gettingTransactions && <Loader />}
        {this.renderNewTransactionButton()}
      </View>
    );
  }
}
const mapStateToProps = state => ({
  transactions: state.transactions,
  gettingTransactions: state.gettingTransactions,
  requestError: state.requestError,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  getTransactions: () => dispatch(getTransactionsAction()),
  updateNewTransaction: newTransaction => dispatch(updateNewTransaction(newTransaction)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TransactionsListScreen);
