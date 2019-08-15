import { usersList as usersListURL } from '../api/api';
import { getUsersRequest, getUsersSuccess, getUsersFail } from '../redux/actions';
import request, { responseHandler } from '../network/request';

export function getUsersAction(filterString) {
  return function(dispatch) {
    let postData = { filter: filterString };

    dispatch(getUsersRequest())

    return request(usersListURL(), {
      method: 'POST',
      body: JSON.stringify(postData),
    })
      .then(
        response => responseHandler(response, dispatch),
      )
      .then(json => dispatch(getUsersSuccess(json)))
      .catch(error => dispatch(getUsersFail(error))
    );
  }
}
