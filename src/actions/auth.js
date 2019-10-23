import axios from 'axios';

import { SERVER_URL } from '../config';

export const LOGIN = 'LOGIN';

// eslint-disable-next-line import/prefer-default-export
export const login = ({ username, password }) => dispatch => {
  axios
    .post(`${SERVER_URL}/user/login`, {
      username,
      password,
    })
    .then(res => {
      dispatch({ type: LOGIN, username: res.data.user.username });
    })
    .catch(() => {});
};
