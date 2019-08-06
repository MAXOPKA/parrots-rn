import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import RegistrationScreen from 'screens/registrationScreen';
import AuthorizationScreen from 'screens/authorizationScreen';
import TransactionsListScreen from 'screens/transactionsListScreen';
import SelectTransactionRecepientScreen from 'screens/selectTransactionRecepientScreen';
import EnterTransactionAmountScreen from 'screens/enterTransactionAmountScreen';
import ConfimTransactionScreen from 'screens/confimTransactionScreen';

const AppNavigator = createStackNavigator({
  Registration: { screen: RegistrationScreen },
  Authorization: { screen: AuthorizationScreen },
  TransactionsList: { screen: TransactionsListScreen },
  SelectTransactionRecepient: { screen: SelectTransactionRecepientScreen },
  EnterTransactionAmount: { screen: EnterTransactionAmountScreen },
  ConfimTransaction: { screen: ConfimTransactionScreen }
});

export default createAppContainer(AppNavigator);
