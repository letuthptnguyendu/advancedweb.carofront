import { connect } from 'react-redux';

import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { Game, Login } from '../containers';
import { Register } from '../pages';

function App({ username }) {
  console.log(username);
  return (
    <Switch>
      <Route path="/login" exact component={Login} />
      <Route path="/register" exact component={Register} />
      <Route path="/" component={Game} />
      <Route path="*" component={() => null} />
    </Switch>
  );
}

const mapStateToProps = state => {
  return { ...state.authReducer };
};

export default connect(mapStateToProps)(App);
