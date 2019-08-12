import { dispatch } from 'redux';
import { userInfo as userInfoURL } from '../api/api';
import { getUserInfoRequest, getUserInfoSuccess, getUserInfoFail } from '../redux/actions';
import { responseHandler } from '../network/request';

export function getUserInfo(name, email, password) {
  return function(dispatch) {
    let postData = { username: name, email, password };

    dispatch(getUserInfoRequest())

    return fetch(registrationURL(), { method: 'GET' })
      .then(
        response => responseHandler(response),
        error => dispatch(getUserInfoFail(error))
      )
      .then(json => dispatch(getUserInfoSuccess(json)))
      .catch(error => dispatch(getUserInfoFail(error))
    );
  }
}
