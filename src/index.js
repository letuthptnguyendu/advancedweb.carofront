import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import thunk from 'redux-thunk';

import { Game, Login, App } from './containers';
import { gameReducer, authReducer } from './reducers';
import { Register } from './pages';

const rootReducer = combineReducers({ gameReducer, authReducer });
const store = createStore(rootReducer, applyMiddleware(thunk));

// eslint-disable-next-line import/prefer-default-export
export const history = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root'),
);
