import { connect } from 'react-redux';
import { login } from '../actions';

import { LoginComp } from '../pages';

const mapDispatchToProps = dispatch => {
  return {
    login: (username, password) => {
      dispatch(login({ username, password }));
    },
  };
};

const Login = connect(
  null,
  mapDispatchToProps,
)(LoginComp);

export default Login;
