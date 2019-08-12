import React, { PureComponent } from 'react';
import { View, Text, FlatList } from 'react-native';

class TransactionsListScreen extends PureComponent {
  limit = 15

  constructor(props) {
    super(props)
    this.state = {
      offset: 0,
    }
  }

  nextPage = () => {
    offset += limit
  }

  renderTitle = () => (
    <Text>{'transactions'}</Text>
  )

  renderTransactionsList = () => (
    <FlatList />
  );

  render() {
    return (
      <View>
        <Text>TransactionsListScreen</Text>
      </View>
    );
  }
}

export default TransactionsListScreen;
