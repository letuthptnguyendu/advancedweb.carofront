import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { withCookies } from 'react-cookie';
import { connect } from 'react-redux';

import Game from './Game';
import { Register, Login, Profile } from '../pages';
import { fetchUserData } from '../actions';

function App({ cookies, ...props }) {
  const token = cookies.get('token');

  useEffect(() => {
    if (!props.user) {
      props.fetchUser(token);
    }
  }, []);

  return (
    <Switch>
      <Route path="/login" exact render={() => (!token ? <Login /> : <Redirect to="/" />)} />
      <Route path="/register" exact component={Register} />

      <Route path="/" exact render={() => (token ? <Game /> : <Redirect to="/login" />)} />
      {token && (
        <>
          <Route path="/profile" exact component={Profile} />
        </>
      )}
      <Route path="*" component={() => null} />
    </Switch>
  );
}

const mapStateToProps = state => {
  return {
    user: state.authReducer.userInfo,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUser: token => {
      dispatch(fetchUserData(token));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withCookies(App));
