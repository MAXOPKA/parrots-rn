import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createAppContainer } from 'react-navigation';
import AppNavigator from './app/navigation/appNavigator';
import NavigationService from './app/services/navigationService';
import { Provider } from 'react-redux';
import store from './app/core/store';
import UserInfo from './app/components/userInfo';
import AppLoader from './app/components/appLoader';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const AppContainer = createAppContainer(AppNavigator);

export default function App() {
  return(
    <Provider store={store} >
      <AppContainer
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
      />
      <UserInfo />
      <AppLoader />
    </Provider>
  );
}
