import { LOGIN } from '../actions';

const initState = {
  username: '',
};

// eslint-disable-next-line import/prefer-default-export
export const authReducer = (state = initState, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, username: action.username };
    default:
      return state;
  }
};
