import moment from 'moment';
import { clearErrors, validationError, filterDeleted } from './utils';
import { get, put, del } from '../utils/fetch';
import { validator } from '../utils/validation';
import {
  slugify,
  preparePayload,
  sanitizeFrontMatter,
  computeRelativePath,
} from '../utils/helpers';
import {
  collectionsAPIUrl,
  collectionAPIUrl,
  documentAPIUrl,
} from '../constants/api';

import translations from '../translations';
const {
  getTitleRequiredMessage,
  getFilenameRequiredMessage,
  getFilenameNotValidMessage,
} = translations;

// Action Types
export const FETCH_COLLECTIONS_REQUEST = 'FETCH_COLLECTIONS_REQUEST';
export const FETCH_COLLECTIONS_SUCCESS = 'FETCH_COLLECTIONS_SUCCESS';
export const FETCH_COLLECTIONS_FAILURE = 'FETCH_COLLECTIONS_FAILURE';
export const FETCH_COLLECTION_REQUEST = 'FETCH_COLLECTION_REQUEST';
export const FETCH_COLLECTION_SUCCESS = 'FETCH_COLLECTION_SUCCESS';
export const FETCH_COLLECTION_FAILURE = 'FETCH_COLLECTION_FAILURE';
export const FETCH_DOCUMENT_REQUEST = 'FETCH_DOCUMENT_REQUEST';
export const FETCH_DOCUMENT_SUCCESS = 'FETCH_DOCUMENT_SUCCESS';
export const FETCH_DOCUMENT_FAILURE = 'FETCH_DOCUMENT_FAILURE';
export const PUT_DOCUMENT_REQUEST = 'PUT_DOCUMENT_REQUEST';
export const PUT_DOCUMENT_SUCCESS = 'PUT_DOCUMENT_SUCCESS';
export const PUT_DOCUMENT_FAILURE = 'PUT_DOCUMENT_FAILURE';
export const DELETE_DOCUMENT_REQUEST = 'DELETE_DOCUMENT_REQUEST';
export const DELETE_DOCUMENT_SUCCESS = 'DELETE_DOCUMENT_SUCCESS';
export const DELETE_DOCUMENT_FAILURE = 'DELETE_DOCUMENT_FAILURE';

// Actions
export const fetchCollections = () => dispatch => {
  dispatch({ type: FETCH_COLLECTIONS_REQUEST });
  return get(
    collectionsAPIUrl(),
    { type: FETCH_COLLECTIONS_SUCCESS, name: 'collections' },
    { type: FETCH_COLLECTIONS_FAILURE, name: 'error' },
    dispatch
  );
};

export const fetchCollection = (collection, directory = '') => dispatch => {
  dispatch({ type: FETCH_COLLECTION_REQUEST });
  return get(
    collectionAPIUrl(collection, directory),
    { type: FETCH_COLLECTION_SUCCESS, name: 'entries' },
    { type: FETCH_COLLECTION_FAILURE, name: 'error' },
    dispatch
  );
};

export const fetchDocument = (collection, directory, filename) => dispatch => {
  dispatch({ type: FETCH_DOCUMENT_REQUEST });
  return get(
    documentAPIUrl(collection, directory, filename),
    { type: FETCH_DOCUMENT_SUCCESS, name: 'doc' },
    { type: FETCH_DOCUMENT_FAILURE, name: 'error' },
    dispatch
  );
};

export const createDocument = (collection, directory) => (
  dispatch,
  getState
) => {
  // get edited fields from metadata state
  const metadata = getState().metadata.metadata;
  let { path, raw_content, title, date } = metadata;
  // if `path` is a falsy value or if appending a slash to it equals to
  // `directory`, generate filename from `title`.
  if ((!path || `${path}/` === directory) && title) {
    path = generateFilenameFromTitle(title, collection, date);
  } else {
    // validate otherwise
    const errors = validateDocument(metadata, collection);
    if (errors.length) {
      return dispatch(validationError(errors));
    }
  }
  // clear errors
  dispatch(clearErrors());

  const front_matter = sanitizeFrontMatter(metadata);

  // send the put request
  return put(
    documentAPIUrl(collection, directory, path),
    preparePayload({ raw_content, front_matter }),
    { type: PUT_DOCUMENT_SUCCESS, name: 'doc' },
    { type: PUT_DOCUMENT_FAILURE, name: 'error' },
    dispatch
  );
};

export const putDocument = (collection, directory, filename) => (
  dispatch,
  getState
) => {
  // get edited fields from metadata state
  const metadata = getState().metadata.metadata;
  let { path, raw_content, title, date } = metadata;
  // if `path` is a falsy value or if appending a slash to it equals to
  // `directory`, generate filename from `title`.
  if ((!path || `${path}/` === directory) && title) {
    path = generateFilenameFromTitle(title, collection, date);
  } else {
    // validate otherwise
    const errors = validateDocument(metadata, collection);
    if (errors.length) {
      return dispatch(validationError(errors));
    }
  }
  // clear errors
  dispatch(clearErrors());

  const front_matter = sanitizeFrontMatter(metadata);

  // add collection type prefix to relative path
  const relative_path = directory
    ? `_${collection}/${directory}/${path}`
    : `_${collection}/${path}`;

  // send the put request
  return put(
    documentAPIUrl(collection, directory, filename),
    preparePayload({ path: relative_path, raw_content, front_matter }),
    { type: PUT_DOCUMENT_SUCCESS, name: 'doc' },
    { type: PUT_DOCUMENT_FAILURE, name: 'error' },
    dispatch
  );
};

export const deleteDocument = (collection, directory, filename) => dispatch => {
  const relative_path = computeRelativePath(directory, filename);
  return del(
    documentAPIUrl(collection, directory, filename),
    { type: DELETE_DOCUMENT_SUCCESS, name: 'doc', id: relative_path },
    { type: DELETE_DOCUMENT_FAILURE, name: 'error' },
    dispatch
  );
};

const generateFilenameFromTitle = (title, collection, date) => {
  const slugifiedTitle = slugify(title);
  if (collection === 'posts') {
    // if date is provided, use it, otherwise generate it with today's date
    const docDate = date ? date.split(' ')[0] : moment().format('YYYY-MM-DD');
    return `${docDate}-${slugifiedTitle}.md`;
  }
  return `${slugifiedTitle}.md`;
};

const validateDocument = (metadata, collection) => {
  let validations = { title: 'required' }; // base validations
  // base messages
  let messages = {
    'title.required': getTitleRequiredMessage(),
    'path.required': getFilenameRequiredMessage(),
  };

  if (collection === 'posts') {
    validations['path'] = 'required|date';
    messages['path.date'] = getFilenameNotValidMessage();
  } else {
    validations['path'] = 'required|filename';
    messages['path.filename'] = getFilenameNotValidMessage();
  }
  return validator(metadata, validations, messages);
};

// Reducer
export default function collections(
  state = {
    collections: [],
    entries: [],
    currentDocument: {},
    isFetching: false,
    updated: false,
  },
  action
) {
  switch (action.type) {
    case FETCH_COLLECTIONS_REQUEST:
    case FETCH_COLLECTION_REQUEST:
    case FETCH_DOCUMENT_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case FETCH_COLLECTIONS_SUCCESS:
      return {
        ...state,
        collections: action.collections,
        isFetching: false,
      };
    case FETCH_COLLECTION_SUCCESS:
      return {
        ...state,
        entries: action.entries,
        isFetching: false,
      };
    case FETCH_DOCUMENT_SUCCESS:
      return {
        ...state,
        currentDocument: action.doc,
        isFetching: false,
      };
    case FETCH_COLLECTIONS_FAILURE:
      return {
        ...state,
        collections: [],
        isFetching: false,
      };
    case FETCH_COLLECTION_FAILURE:
      return {
        ...state,
        entries: [],
        isFetching: false,
      };
    case FETCH_DOCUMENT_FAILURE:
      return {
        ...state,
        currentDocument: {},
        isFetching: false,
      };
    case PUT_DOCUMENT_SUCCESS:
      return {
        ...state,
        currentDocument: action.doc,
        updated: true,
      };
    case DELETE_DOCUMENT_SUCCESS:
      return {
        ...state,
        entries: filterDeleted(state.entries, action.id),
      };
    default:
      return {
        ...state,
        updated: false,
      };
  }
}

// Selectors
export const filterBySearchInput = (list, input) => {
  if (!input) {
    return list;
  }
  return list.filter(f =>
    (f.title || f.name).toLowerCase().includes(input.toLowerCase())
  );
};
