import NavigationService from '../services/navigationService';
import { logout } from '../redux/actions';

export function logoutAction() {
  return function(dispatch) {
    dispatch(logout());
    NavigationService.resetToRoute('Authorization');
  }
}
