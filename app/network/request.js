import { getAuthToken } from '../core/store';
import { logoutAction } from '../interactors/logoutInteractor';

handleResponseText = (response, text, dispatch) => {
  if (response.status === 401 && text.includes('UnauthorizedError')) {
    dispatch(logoutAction());
  }
  throw { errorCode: response.status, errorMessage: text }
}

export const responseHandler = (response, dispatch) => {
  if (response.ok) {
    json = response.json();
    return json;
  } else {
    return response.text().then(text => handleResponseText(response, text, dispatch));
  }
}

export default request = (url, options) => {
  let headers = { 'Content-Type': 'application/json;charset=utf-8' };
  let authToken = getAuthToken();

  if (authToken !== null) {
    headers['Authorization'] = `Bearer ${authToken}`;
  }

  options['headers'] = headers;
  return fetch(url, options);
}
