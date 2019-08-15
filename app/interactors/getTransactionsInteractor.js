import { transactions as transactionsURL } from '../api/api';
import { getTransactionsRequest, getTransactionsSuccess, getTransactionsFail } from '../redux/actions';
import request, { responseHandler } from '../network/request';

export function getTransactionsAction() {
  return function(dispatch) {
    dispatch(getTransactionsRequest())

    return request(transactionsURL(), { method: 'GET' })
      .then(
        response => responseHandler(response, dispatch),
      )
      .then(json => dispatch(getTransactionsSuccess(json.trans_token)))
      .catch(error => dispatch(getTransactionsFail(error))
    );
  }
}
