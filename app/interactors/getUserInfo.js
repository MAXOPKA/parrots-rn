import { dispatch } from 'redux';
import { userInfo as userInfoURL } from '../api/api';
import { getUserInfoRequest, getUserInfoSuccess, getUserInfoFail } from '../redux/actions';
import request, { responseHandler } from '../network/request';

export function getUserInfo() {
  return function(dispatch) {
    dispatch(getUserInfoRequest())

    return request(userInfoURL(), { method: 'GET' })
      .then(
        response => responseHandler(response),
        error => dispatch(getUserInfoFail(error))
      )
      .then(json => dispatch(getUserInfoSuccess(json)))
      .catch(error => dispatch(getUserInfoFail(error))
    );
  }
}
