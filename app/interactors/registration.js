import { dispatch } from 'redux';
import { registration as registrationURL } from '../api/api';
import { registrationRequest, registrationSuccess, registrationFail } from '../redux/actions';
import { responseHandler } from '../network/request';

export function registration(name, email, password) {
  return function(dispatch) {
    let postData = { username: name, email, password };

    dispatch(registrationRequest())

    return fetch(registrationURL(), {
      method: 'POST',
      body: JSON.stringify(postData)
    })
      .then(
        response => responseHandler(response),
        error => dispatch(registrationFail(error))
      )
      .then(json => dispatch(registrationSuccess(json.id_token)))
      .catch(error => dispatch(registrationFail(error))
    );
  }
}
