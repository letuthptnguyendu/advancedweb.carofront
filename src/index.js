import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import { gameReducer } from './reducers';
import Game from './containers/Game';

const rootReducer = combineReducers({ gameReducer });
const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <Game />
  </Provider>,
  document.getElementById('root'),
);
