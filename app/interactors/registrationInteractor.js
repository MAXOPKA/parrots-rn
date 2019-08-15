import { registration as registrationURL } from '../api/api';
import { registrationRequest, registrationSuccess, registrationFail } from '../redux/actions';
import request, { responseHandler } from '../network/request';
import NavigationService from '../services/navigationService';

const registrationSuccessHandler = (json, dispatch) => {
  dispatch(registrationSuccess(json.id_token));
  NavigationService.resetToRoute('TransactionsList');
}

export function registrationAction(name, email, password) {
  return function(dispatch) {
    let postData = { username: name, email, password };

    dispatch(registrationRequest())

    return request(registrationURL(), {
      method: 'POST',
      body: JSON.stringify(postData)
    })
      .then(
        response => responseHandler(response, dispatch),
      )
      .then(json => registrationSuccessHandler(json, dispatch))
      .catch(error => dispatch(registrationFail(error))
    );
  }
}
