import _ from 'underscore';
import { filterDeleted } from './utils';
import { get, del } from '../utils/fetch';
import { computeRelativePath } from '../utils/helpers';
import { addNotification } from './notifications';
import { staticfilesAPIUrl, staticfileAPIUrl } from '../constants/api';

import translations from '../translations';
const {
  getSuccessMessage,
  getErrorMessage,
  getUploadSuccessMessage,
  getUploadErrorMessage,
} = translations;

// Action Types
export const FETCH_STATICFILES_REQUEST = 'FETCH_STATICFILES_REQUEST';
export const FETCH_STATICFILES_SUCCESS = 'FETCH_STATICFILES_SUCCESS';
export const FETCH_STATICFILES_FAILURE = 'FETCH_STATICFILES_FAILURE';
export const FETCH_STATICFILE_REQUEST = 'FETCH_STATICFILE_REQUEST';
export const FETCH_STATICFILE_SUCCESS = 'FETCH_STATICFILE_SUCCESS';
export const FETCH_STATICFILE_FAILURE = 'FETCH_STATICFILE_FAILURE';
export const PUT_STATICFILE_REQUEST = 'PUT_STATICFILE_REQUEST';
export const PUT_STATICFILE_SUCCESS = 'PUT_STATICFILE_SUCCESS';
export const PUT_STATICFILE_FAILURE = 'PUT_STATICFILE_FAILURE';
export const DELETE_STATICFILE_REQUEST = 'DELETE_STATICFILE_REQUEST';
export const DELETE_STATICFILE_SUCCESS = 'DELETE_STATICFILE_SUCCESS';
export const DELETE_STATICFILE_FAILURE = 'DELETE_STATICFILE_FAILURE';

// Actions
export const fetchStaticFiles = (directory = '') => dispatch => {
  dispatch({ type: FETCH_STATICFILES_REQUEST });
  return get(
    staticfilesAPIUrl(directory),
    { type: FETCH_STATICFILES_SUCCESS, name: 'files' },
    { type: FETCH_STATICFILES_FAILURE, name: 'error' },
    dispatch
  );
};

export const uploadStaticFiles = (directory, files) => dispatch => {
  _.each(files, file => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const payload = JSON.stringify({
        encoded_content: reader.result.split('base64,')[1],
      });
      // send the put request
      return fetch(staticfileAPIUrl(directory, file.name), {
        method: 'PUT',
        body: payload,
        credentials: 'same-origin',
      })
        .then(data => {
          dispatch({ type: PUT_STATICFILE_SUCCESS });
          dispatch(fetchStaticFiles(directory));
          dispatch(
            addNotification(
              getSuccessMessage(),
              getUploadSuccessMessage(file.name),
              'success'
            )
          );
        })
        .catch(error => {
          dispatch({ type: PUT_STATICFILE_FAILURE, error });
          dispatch(
            addNotification(getErrorMessage(), getUploadErrorMessage(), 'error')
          );
        });
    };
  });
};

export const deleteStaticFile = (directory, filename) => dispatch => {
  const relative_path = computeRelativePath(directory, filename);
  return del(
    staticfileAPIUrl(directory, filename),
    { type: DELETE_STATICFILE_SUCCESS, name: 'file', id: relative_path },
    { type: DELETE_STATICFILE_FAILURE, name: 'error' },
    dispatch
  );
};

// Reducer
export default function staticfiles(
  state = {
    files: [],
    isFetching: false,
    uploading: false, // TODO show loading gif
  },
  action
) {
  switch (action.type) {
    case FETCH_STATICFILES_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case FETCH_STATICFILES_SUCCESS:
      return {
        ...state,
        files: action.files,
        isFetching: false,
      };
    case FETCH_STATICFILES_FAILURE:
      return {
        ...state,
        isFetching: false,
      };
    case PUT_STATICFILE_REQUEST:
      return {
        ...state,
        uploading: true,
      };
    case PUT_STATICFILE_SUCCESS:
      return {
        ...state,
        uploading: false,
      };
    case PUT_STATICFILE_FAILURE:
      return {
        ...state,
        uploading: false,
      };
    case DELETE_STATICFILE_SUCCESS:
      return {
        ...state,
        files: filterDeleted(state.files, action.id),
      };
    default:
      return state;
  }
}

// Selectors
export const filterByFilename = (files, input) => {
  if (!input) {
    return files;
  }
  return files.filter(f => f.path.toLowerCase().includes(input.toLowerCase()));
};
