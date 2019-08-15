import { transactions as transactionsURL } from '../api/api';
import { createTransactionRequest, createTransactionSuccess, createTransactionFail } from '../redux/actions';
import request, { responseHandler } from '../network/request';

export function createTransactionAction(name, amount) {
  return function(dispatch) {
    let postData = { name, amount };

    dispatch(createTransactionRequest())

    return request(transactionsURL(), {
      method: 'POST',
      body: JSON.stringify(postData),
    })
      .then(
        response => responseHandler(response, dispatch),
      )
      .then(json => dispatch(createTransactionSuccess(json.trans_token)))
      .catch(error => dispatch(createTransactionFail(error))
    );
  }
}
