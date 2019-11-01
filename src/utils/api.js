import axios from 'axios';

import { SERVER_URL } from '../config/server';

const POST = async (api, data, token) => {
  console.log(data, token);
  return axios.post(`${SERVER_URL}${api}`, data, {
    headers: { Authorization: 'Bearer ' + token },
  });
};

const GET = async (api, token = '') => {
  return axios.get(`${SERVER_URL}${api}`, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
};

// eslint-disable-next-line import/prefer-default-export
export { POST, GET };
