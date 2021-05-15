/* eslint-disable import/default */
import React from 'react';
import { syncHistoryWithStore } from 'react-router-redux';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory, Redirect } from 'react-router';
import routes from './routes';
import configureStore from './store';
import { ADMIN_PREFIX } from './constants';
import './styles/main.scss';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

render(
  <Provider store={store}>
    <Router history={history} routes={routes}>
      <Redirect from={`${ADMIN_PREFIX}/`} to={`${ADMIN_PREFIX}/pages/`} />
    </Router>
  </Provider>,
  document.getElementById('root')
);
