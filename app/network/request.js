import { getAuthToken } from '../core/store';

export const responseHandler = response => {
  if (response.ok) {
    json = response.json();
    return json;
  } else {
    return response.text().then(text => { throw { errorCode: response.status, errorMessage: text } });
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
