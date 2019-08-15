import React from 'react';
import { createStackNavigator } from 'react-navigation';
import RegistrationScreen from '../screens/registrationScreen';
import AuthorizationScreen from '../screens/authorizationScreen';
import TransactionsListScreen from '../screens/transactionsListScreen';
import SelectTransactionRecepientScreen from '../screens/selectTransactionRecepientScreen';
import EnterTransactionAmountScreen from '../screens/enterTransactionAmountScreen';

const AppNavigator = createStackNavigator({
  Authorization: { screen: AuthorizationScreen },
  Registration: { screen: RegistrationScreen },
  TransactionsList: { screen: TransactionsListScreen },
  SelectTransactionRecepient: { screen: SelectTransactionRecepientScreen },
  EnterTransactionAmount: { screen: EnterTransactionAmountScreen },
});

export default AppNavigator;
