import React from 'react';
import { StyleSheet } from 'react-native';
import AppNavigator from './app/navigation/navigator';
import { Provider } from 'react-redux';
import store from './app/core/store';
import UserInfo from './app/components/userInfo';

export default function App() {
  return(
    <Provider store={store} >
      <AppNavigator />
      <UserInfo />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
