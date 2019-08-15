import initialState from './initialState';
import {
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL,
  REGISTRATION_REQUEST, REGISTRATION_SUCCESS, REGISTRATION_FAIL,
  GET_USER_INFO_REQUEST, GET_USER_INFO_SUCCESS, GET_USER_INFO_FAIL,
  GET_USERS_REQUEST, GET_USERS_SUCCESS, GET_USERS_FAIL,
  CREATE_TRANSACTION_REQUEST, CREATE_TRANSACTION_SUCCESS, CREATE_TRANSACTION_FAIL,
  GET_TRANSACTIONS_REQUEST, GET_TRANSACTIONS_SUCCESS, GET_TRANSACTIONS_FAIL,
  LOGOUT,
  UPDATE_NEW_TRANSACTION
} from './actionTypes';

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, authorizing: true, requestError: null };
    case LOGIN_SUCCESS:
      return { ...state, authorizing: false, authToken: action.payload };
    case LOGIN_FAIL:
      return {
        ...state,
        authToken: null,
        authorizing: false,
        requestError: action.payload,
      };

    case REGISTRATION_REQUEST:
      return { ...state, registring: true, requestError: null };
    case REGISTRATION_SUCCESS:
      return { ...state, registring: false, newUser: null, authToken: action.payload };
    case REGISTRATION_FAIL:
      return {
        ...state,
        registring: false,
        requestError: action.payload,
        authToken: null,
      };

    case GET_USER_INFO_REQUEST:
      return { ...state, gettingUserInfo: true, requestError: null };
    case GET_USER_INFO_SUCCESS:
      return { ...state, gettingUserInfo: false, userInfo: action.payload.user_info_token };
    case GET_USER_INFO_FAIL:
      return {
        ...state,
        gettingUserInfo: false,
        requestError: action.payload,
      };

    case GET_USERS_REQUEST:
      return { ...state, gettingUsers: true, requestError: null };
    case GET_USERS_SUCCESS:
      return { ...state, gettingUsers: false, users: action.payload };
    case GET_USERS_FAIL:
      return {
        ...state,
        gettingUsers: false,
        requestError: action.payload,
      };

    case CREATE_TRANSACTION_REQUEST:
      return { ...state, creatingTransaction: true, requestError: null };
    case CREATE_TRANSACTION_SUCCESS:
      return {
        ...state,
        creatingTransaction: false,
        newTransaction: initialState.newTransaction,
        createdTransaction: action.payload
      };
    case CREATE_TRANSACTION_FAIL:
      return {
        ...state,
        creatingTransaction: false,
        requestError: action.payload,
      };

    case GET_TRANSACTIONS_REQUEST:
      return { ...state, gettingTransactions: true, requestError: null };
    case GET_TRANSACTIONS_SUCCESS:
      return { ...state, gettingTransactions: false, transactions: action.payload };
    case GET_TRANSACTIONS_FAIL:
      return {
        ...state,
        gettingTransactions: false,
        requestError: action.payload,
      };

    case UPDATE_NEW_TRANSACTION:
      return { ...state, newTransaction: { ...state.newTransaction, ...action.payload }};

    case LOGOUT:
      return { ...state, authToken: null };

    default:
      return state;
  }
}
