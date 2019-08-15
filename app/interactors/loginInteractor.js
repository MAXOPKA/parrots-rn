import { login as loginURL } from '../api/api';
import { loginRequest, loginSuccess, loginFail } from '../redux/actions';
import request, { responseHandler } from '../network/request';
import NavigationService from '../services/navigationService';

const loginSuccessHandler = (json, dispatch) => {
  dispatch(loginSuccess(json.id_token));
  NavigationService.resetToRoute('TransactionsList');
}

export function loginAction(email, password) {
  return function(dispatch) {
    let postData = { email, password };

    dispatch(loginRequest())

    return request(loginURL(), {
      method: 'POST',
      body: JSON.stringify(postData),
    })
      .then(
        response => responseHandler(response, dispatch),
      )
      .then(json => loginSuccessHandler(json, dispatch))
      .catch(error => dispatch(loginFail(error))
    );
  }
}
