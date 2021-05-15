import { clearErrors, validationError, filterDeleted } from './utils';
import { PUT_DOCUMENT_SUCCESS, PUT_DOCUMENT_FAILURE } from './collections';
import { get, put, del } from '../utils/fetch';
import { validatePage } from '../utils/validation';
import {
  slugify,
  preparePayload,
  sanitizeFrontMatter,
  computeRelativePath,
} from '../utils/helpers';
import { draftsAPIUrl, draftAPIUrl, documentAPIUrl } from '../constants/api';

// Action Types
export const FETCH_DRAFTS_REQUEST = 'FETCH_DRAFTS_REQUEST';
export const FETCH_DRAFTS_SUCCESS = 'FETCH_DRAFTS_SUCCESS';
export const FETCH_DRAFTS_FAILURE = 'FETCH_DRAFTS_FAILURE';
export const FETCH_DRAFT_REQUEST = 'FETCH_DRAFT_REQUEST';
export const FETCH_DRAFT_SUCCESS = 'FETCH_DRAFT_SUCCESS';
export const FETCH_DRAFT_FAILURE = 'FETCH_DRAFT_FAILURE';
export const PUT_DRAFT_REQUEST = 'PUT_DRAFT_REQUEST';
export const PUT_DRAFT_SUCCESS = 'PUT_DRAFT_SUCCESS';
export const PUT_DRAFT_FAILURE = 'PUT_DRAFT_FAILURE';
export const DELETE_DRAFT_REQUEST = 'DELETE_DRAFT_REQUEST';
export const DELETE_DRAFT_SUCCESS = 'DELETE_DRAFT_SUCCESS';
export const DELETE_DRAFT_FAILURE = 'DELETE_DRAFT_FAILURE';

// Actions
export const fetchDrafts = (directory = '') => dispatch => {
  dispatch({ type: FETCH_DRAFTS_REQUEST });
  return get(
    draftsAPIUrl(directory),
    { type: FETCH_DRAFTS_SUCCESS, name: 'drafts' },
    { type: FETCH_DRAFTS_FAILURE, name: 'error' },
    dispatch
  );
};

export const fetchDraft = (directory, filename) => dispatch => {
  dispatch({ type: FETCH_DRAFT_REQUEST });
  return get(
    draftAPIUrl(directory, filename),
    { type: FETCH_DRAFT_SUCCESS, name: 'draft' },
    { type: FETCH_DRAFT_FAILURE, name: 'error' },
    dispatch
  );
};

export const createDraft = directory => (dispatch, getState) => {
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

  // strip '_drafts/' from path when provided
  const filename = path.replace('_drafts/', '');

  // send the put request
  return put(
    draftAPIUrl(directory, filename),
    preparePayload({ front_matter, raw_content }),
    { type: PUT_DRAFT_SUCCESS, name: 'draft' },
    { type: PUT_DRAFT_FAILURE, name: 'error' },
    dispatch
  );
};

export const putDraft = (directory, filename) => (dispatch, getState) => {
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
  const relative_path = directory
    ? `_drafts/${directory}/${path}`
    : `_drafts/${path}`;

  // send the put request
  return put(
    draftAPIUrl(directory, filename),
    preparePayload({ path: relative_path, front_matter, raw_content }),
    { type: PUT_DRAFT_SUCCESS, name: 'draft' },
    { type: PUT_DRAFT_FAILURE, name: 'error' },
    dispatch
  );
};

export const deleteDraft = (directory, filename) => dispatch => {
  const relative_path = computeRelativePath(directory, filename);
  return del(
    draftAPIUrl(directory, filename),
    { type: DELETE_DRAFT_SUCCESS, name: 'draft', id: relative_path },
    { type: DELETE_DRAFT_FAILURE, name: 'error' },
    dispatch
  );
};

export const publishDraft = (directory, filename) => (dispatch, getState) => {
  const metadata = getState().metadata.metadata;
  let { path, raw_content, title } = metadata;
  // if path is not given or equals to directory, generate filename from the title
  if (!path && title) {
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

  return put(
    documentAPIUrl('posts', directory, filename),
    preparePayload({ raw_content, front_matter }),
    { type: PUT_DOCUMENT_SUCCESS, name: 'doc' },
    { type: PUT_DOCUMENT_FAILURE, name: 'error' },
    dispatch
  );
};

// Reducer
export default function drafts(
  state = {
    drafts: [],
    draft: {},
    isFetching: false,
    updated: false,
  },
  action
) {
  switch (action.type) {
    case FETCH_DRAFTS_REQUEST:
    case FETCH_DRAFT_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case FETCH_DRAFTS_SUCCESS:
      return {
        ...state,
        drafts: action.drafts,
        isFetching: false,
        draft: {},
      };
    case FETCH_DRAFTS_FAILURE:
      return {
        ...state,
        isFetching: false,
        drafts: [],
      };
    case FETCH_DRAFT_SUCCESS:
      return {
        ...state,
        draft: action.draft,
        isFetching: false,
      };
    case FETCH_DRAFT_FAILURE:
      return {
        ...state,
        draft: {},
        isFetching: false,
      };
    case PUT_DRAFT_SUCCESS:
      return {
        ...state,
        draft: action.draft,
        updated: true,
      };
    case DELETE_DRAFT_SUCCESS:
      return {
        ...state,
        drafts: filterDeleted(state.drafts, action.id),
      };
    default:
      return {
        ...state,
        updated: false,
      };
  }
}
