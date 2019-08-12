import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducer from '../redux/reducer';
import initialState from '../redux/initialState';

const loggerMiddleware = createLogger()
const store = createStore(
  reducer,
  initialState,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  ));

function selectAuthToken(state) {
  return state.authToken;
}

let authToken = null;
export const getAuthToken = () => authToken

function handleChange() {
  authToken = selectAuthToken(store.getState());
  console.log(authToken);
}

const unsubscribe = store.subscribe(handleChange);

export default store;
