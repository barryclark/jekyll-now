import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import config from './config';
import pages from './pages';
import collections from './collections';
import metadata from './metadata';
import drafts from './drafts';
import datafiles from './datafiles';
import staticfiles from './staticfiles';
import utils from './utils';
import siteMeta from './siteMeta';
import notifications from './notifications';

export default combineReducers({
  routing: routerReducer,
  meta: siteMeta,
  config,
  pages,
  collections,
  metadata,
  drafts,
  datafiles,
  staticfiles,
  utils,
  notifications,
});
