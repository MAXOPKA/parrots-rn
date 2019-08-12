import { dispatch } from 'redux';
import { createTransaction as createTransactionURL } from '../api/api';
import { createTransactionRequest, createTransactionSuccess, createTransactionFail } from '../redux/actions';
import { responseHandler } from '../network/request';

export function createTransaction(name, amount) {
  return function(dispatch) {
    let postData = { name, amount };

    dispatch(registrationRequest())

    return fetch(transactionsURL(), {
      method: 'POST',
      body: JSON.stringify(postData),
    })
      .then(
        response => responseHandler(response),
        error => dispatch(registrationFail(error))
      )
      .then(json => dispatch(loginSuccess(json.id_token)))
      .catch(error => dispatch(loginFail(error))
    );
  }
}
