import {
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL,
  REGISTRATION_REQUEST, REGISTRATION_SUCCESS, REGISTRATION_FAIL,
  GET_USER_INFO_REQUEST, GET_USER_INFO_SUCCESS, GET_USER_INFO_FAIL,
  GET_USERS_REQUEST, GET_USERS_SUCCESS, GET_USERS_FAIL,
  CREATE_TRANSACTION_REQUEST, CREATE_TRANSACTION_SUCCESS, CREATE_TRANSACTION_FAIL,
  GET_TRANSACTIONS_REQUEST, GET_TRANSACTIONS_SUCCESS, GET_TRANSACTIONS_FAIL
} from './actionTypes';

export const loginRequest = () => ({ type: LOGIN_REQUEST });

export const loginSuccess = authToken => ({
  type: LOGIN_SUCCESS,
  payload: authToken
});

export const loginFail = error => ({
  type: LOGIN_FAIL,
  payload: error,
});

export const registrationRequest = () => ({ type: REGISTRATION_REQUEST });

export const registrationSuccess = authToken => ({
  type: REGISTRATION_SUCCESS,
  payload: authToken
});

export const registrationFail = error => ({
  type: REGISTRATION_FAIL,
  payload: error,
});

export const getUserInfoRequest = () => ({ type: GET_USER_INFO_REQUEST });

export const getUserInfoSuccess = userInfo => ({
  type: GET_USER_INFO_SUCCESS,
  payload: userInfo
});

export const getUserInfoFail = error => ({
  type: GET_USER_INFO_FAIL,
  payload: error,
});

export const createTransactionRequest = () => ({ type: CREATE_TRANSACTION_REQUEST });

export const createTransactionSuccess = userInfo => ({ type: CREATE_TRANSACTION_SUCCESS });

export const createTransactionFail = error => ({
  type: CREATE_TRANSACTION_FAIL,
  payload: error,
});

export const getTransactionsRequest = () => ({ type: GET_TRANSACTIONS_REQUEST });

export const getTransactionsSuccess = transactions => ({
  type: GET_TRANSACTIONS_SUCCESS,
  payload: transactions
});

export const getTransactionsFail = error => ({
  type: GET_TRANSACTIONS_FAIL,
  payload: error,
});

export const getUsersRequest = () => ({ type: GET_USERS_REQUEST });

export const getUsersSuccess = transactions => ({
  type: GET_USERS_SUCCESS,
  payload: transactions
});

export const getUsersFail = error => ({
  type: GET_USERS_FAIL,
  payload: error,
});
