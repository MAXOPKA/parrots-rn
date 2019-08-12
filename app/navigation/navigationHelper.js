import { StackActions, NavigationActions } from 'react-navigation';

export const resetToRoute = (navigation, routeName) => {
  const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName })],
  });
  navigation.dispatch(resetAction);
}
