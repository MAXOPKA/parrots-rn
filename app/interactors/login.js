import { dispatch } from 'redux';
import { login as loginURL } from '../api/api';
import { loginRequest, loginSuccess, loginFail } from '../redux/actions';
import request, { responseHandler } from '../network/request';

export function login(email, password) {
  return function(dispatch) {
    let postData = { email, password };

    dispatch(loginRequest())

    return request(loginURL(), {
      method: 'POST',
      body: JSON.stringify(postData),
    })
      .then(
        response => responseHandler(response),
        error => dispatch(loginFail(error))
      )
      .then(json => dispatch(loginSuccess(json.id_token)))
      .catch(error => dispatch(loginFail(error))
    );
  }
}
