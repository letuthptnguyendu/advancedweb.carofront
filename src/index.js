import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import thunk from 'redux-thunk';
import { CookiesProvider } from 'react-cookie';

import { App } from './components';
import { rootReducer } from './reducers';

const store = createStore(rootReducer, applyMiddleware(thunk));

// eslint-disable-next-line import/prefer-default-export
export const history = createBrowserHistory();

ReactDOM.render(
  <CookiesProvider>
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>
  </CookiesProvider>,
  document.getElementById('root'),
);
