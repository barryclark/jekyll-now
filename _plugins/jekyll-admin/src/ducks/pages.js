import { clearErrors, validationError, filterDeleted } from './utils';
import { get, put, del } from '../utils/fetch';
import { validatePage } from '../utils/validation';
import {
  slugify,
  preparePayload,
  sanitizeFrontMatter,
  computeRelativePath,
} from '../utils/helpers';
import { pagesAPIUrl, pageAPIUrl } from '../constants/api';

// Action Types
export const FETCH_PAGES_REQUEST = 'FETCH_PAGES_REQUEST';
export const FETCH_PAGES_SUCCESS = 'FETCH_PAGES_SUCCESS';
export const FETCH_PAGES_FAILURE = 'FETCH_PAGES_FAILURE';
export const FETCH_PAGE_REQUEST = 'FETCH_PAGE_REQUEST';
export const FETCH_PAGE_SUCCESS = 'FETCH_PAGE_SUCCESS';
export const FETCH_PAGE_FAILURE = 'FETCH_PAGE_FAILURE';
export const PUT_PAGE_REQUEST = 'PUT_PAGE_REQUEST';
export const PUT_PAGE_SUCCESS = 'PUT_PAGE_SUCCESS';
export const PUT_PAGE_FAILURE = 'PUT_PAGE_FAILURE';
export const DELETE_PAGE_REQUEST = 'DELETE_PAGE_REQUEST';
export const DELETE_PAGE_SUCCESS = 'DELETE_PAGE_SUCCESS';
export const DELETE_PAGE_FAILURE = 'DELETE_PAGE_FAILURE';

// Actions
export const fetchPages = (directory = '') => dispatch => {
  dispatch({ type: FETCH_PAGES_REQUEST });
  return get(
    pagesAPIUrl(directory),
    { type: FETCH_PAGES_SUCCESS, name: 'pages' },
    { type: FETCH_PAGES_FAILURE, name: 'error' },
    dispatch
  );
};

export const fetchPage = (directory, filename) => dispatch => {
  dispatch({ type: FETCH_PAGE_REQUEST });
  return get(
    pageAPIUrl(directory, filename),
    { type: FETCH_PAGE_SUCCESS, name: 'page' },
    { type: FETCH_PAGE_FAILURE, name: 'error' },
    dispatch
  );
};

export const createPage = directory => (dispatch, getState) => {
  // get edited fields from metadata state
  const metadata = getState().metadata.metadata;
  let { path, raw_content, title } = metadata;
  // if `path` is a falsy value or if appending a slash to it equals to
  // `directory`, generate filename from `title`.
  if ((!path || `${path}/` === directory) && title) {
    path = `${slugify(title)}.md`;
  } else {
    const errors = validatePage(metadata);
    if (errors.length) {
      return dispatch(validationError(errors));
    }
  }
  // clear errors
  dispatch(clearErrors());

  const front_matter = sanitizeFrontMatter(metadata);

  // send the put request
  return put(
    pageAPIUrl(directory, path),
    preparePayload({ front_matter, raw_content }),
    { type: PUT_PAGE_SUCCESS, name: 'page' },
    { type: PUT_PAGE_FAILURE, name: 'error' },
    dispatch
  );
};

export const putPage = (directory, filename) => (dispatch, getState) => {
  // get edited fields from metadata state
  const metadata = getState().metadata.metadata;
  let { path, raw_content, title } = metadata;
  // if `path` is a falsy value or if appending a slash to it equals to
  // `directory`, generate filename from `title`.
  if ((!path || `${path}/` === directory) && title) {
    path = `${slugify(title)}.md`;
  } else {
    const errors = validatePage(metadata);
    if (errors.length) {
      return dispatch(validationError(errors));
    }
  }
  // clear errors
  dispatch(clearErrors());

  const front_matter = sanitizeFrontMatter(metadata);
  const relative_path = directory ? `${directory}/${path}` : path;

  // send the put request
  return put(
    pageAPIUrl(directory, filename),
    preparePayload({ path: relative_path, front_matter, raw_content }),
    { type: PUT_PAGE_SUCCESS, name: 'page' },
    { type: PUT_PAGE_FAILURE, name: 'error' },
    dispatch
  );
};

export const deletePage = (directory, filename) => dispatch => {
  const relative_path = computeRelativePath(directory, filename);
  return del(
    pageAPIUrl(directory, filename),
    { type: DELETE_PAGE_SUCCESS, name: 'page', id: relative_path },
    { type: DELETE_PAGE_FAILURE, name: 'error' },
    dispatch
  );
};

// Reducer
export default function pages(
  state = {
    pages: [],
    page: {},
    isFetching: false,
    updated: false,
  },
  action
) {
  switch (action.type) {
    case FETCH_PAGES_REQUEST:
    case FETCH_PAGE_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case FETCH_PAGES_SUCCESS:
      return {
        ...state,
        pages: action.pages,
        isFetching: false,
        page: {},
      };
    case FETCH_PAGES_FAILURE:
      return {
        ...state,
        isFetching: false,
        pages: [],
      };
    case FETCH_PAGE_SUCCESS:
      return {
        ...state,
        page: action.page,
        isFetching: false,
      };
    case FETCH_PAGE_FAILURE:
      return {
        ...state,
        page: {},
        isFetching: false,
      };
    case PUT_PAGE_SUCCESS:
      return {
        ...state,
        page: action.page,
        updated: true,
      };
    case DELETE_PAGE_SUCCESS:
      return {
        ...state,
        pages: filterDeleted(state.pages, action.id),
      };
    default:
      return {
        ...state,
        updated: false,
      };
  }
}
