import { LOGIN } from '../actions';

const initState = {
  userInfo: '',
};

// eslint-disable-next-line import/prefer-default-export
export const authReducer = (state = initState, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, userInfo: { ...state.userInfo, ...action.payload } };
    default:
      return state;
  }
};
