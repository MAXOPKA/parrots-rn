import { dispatch } from 'redux';
import { getUsers as registrationURL } from '../api/api';
import { getUsersRequest, getUsersSuccess, getUsersFail } from '../redux/actions';
import { responseHandler } from '../network/request';

export function registration() {
  return function(dispatch) {
    let postData = { username: name, email, password };

    dispatch(getUsersRequest())

    return fetch(registrationURL(), {
      method: 'POST',
      body: JSON.stringify(postData),
    })
      .then(
        response => responseHandler(response),
        error => dispatch(getUsersFail(error))
      )
      .then(json => dispatch(getUsersSuccess(json.id_token)))
      .catch(error => dispatch(getUsersFail(error))
    );
  }
}
