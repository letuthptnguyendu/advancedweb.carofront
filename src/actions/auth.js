import { POST, GET } from '../utils/api';

export const LOGIN = 'LOGIN';

export function fetchUserData(token) {
  return dispatch => {
    GET('/user/me', token)
      .then(res => {
        dispatch({ type: LOGIN, payload: res.data });
      })
      .catch(err => console.log(err));
  };
}

export function updateUser(data, token) {
  return dispatch => {
    POST('/user/update', data, token)
      .then(() => {
        console.log('letu resUpdate', data);
        dispatch({ type: LOGIN, payload: data });
      })
      .catch(err => console.log(err));
  };
}
