import { clearErrors, validationError, filterDeleted } from './utils';
import { get, put, del } from '../utils/fetch';
import { datafilesAPIUrl, datafileAPIUrl } from '../constants/api';
import {
  toYAML,
  trimObject,
  computeRelativePath,
  getExtensionFromPath,
} from '../utils/helpers';
import { validator } from '../utils/validation';

import translations from '../translations';
const { getContentRequiredMessage, getFilenameRequiredMessage } = translations;

// Action Types
export const FETCH_DATAFILES_REQUEST = 'FETCH_DATAFILES_REQUEST';
export const FETCH_DATAFILES_SUCCESS = 'FETCH_DATAFILES_SUCCESS';
export const FETCH_DATAFILES_FAILURE = 'FETCH_DATAFILES_FAILURE';
export const FETCH_DATAFILE_REQUEST = 'FETCH_DATAFILE_REQUEST';
export const FETCH_DATAFILE_SUCCESS = 'FETCH_DATAFILE_SUCCESS';
export const FETCH_DATAFILE_FAILURE = 'FETCH_DATAFILE_FAILURE';
export const PUT_DATAFILE_REQUEST = 'PUT_DATAFILE_REQUEST';
export const PUT_DATAFILE_SUCCESS = 'PUT_DATAFILE_SUCCESS';
export const PUT_DATAFILE_FAILURE = 'PUT_DATAFILE_FAILURE';
export const DELETE_DATAFILE_REQUEST = 'DELETE_DATAFILE_REQUEST';
export const DELETE_DATAFILE_SUCCESS = 'DELETE_DATAFILE_SUCCESS';
export const DELETE_DATAFILE_FAILURE = 'DELETE_DATAFILE_FAILURE';
export const DATAFILE_CHANGED = 'DATAFILE_CHANGED';

// Actions
export const fetchDataFiles = (directory = '') => dispatch => {
  dispatch({ type: FETCH_DATAFILES_REQUEST });
  return get(
    datafilesAPIUrl(directory),
    { type: FETCH_DATAFILES_SUCCESS, name: 'files' },
    { type: FETCH_DATAFILES_FAILURE, name: 'error' },
    dispatch
  );
};

export const fetchDataFile = (directory, filename) => dispatch => {
  dispatch({ type: FETCH_DATAFILE_REQUEST });
  return get(
    datafileAPIUrl(directory, filename),
    { type: FETCH_DATAFILE_SUCCESS, name: 'file' },
    { type: FETCH_DATAFILE_FAILURE, name: 'error' },
    dispatch
  );
};

/**
 * Creates and updates a data file.
 * @param {String} directory : Dirname of data file
 * @param {String} filename  : The data file
 * @param {Object} data      : Content to be written to data file
 * @param {String} new_path  : File path relative to config['source']
 * @param {String} source    : Point of origin of file-content data.
 *                             Either the default `#brace-editor`, or `<DataGUI/>`
 */
export const putDataFile = (
  directory,
  filename,
  data,
  new_path = '',
  source = 'editor'
) => (dispatch, getState) => {
  const ext = getExtensionFromPath(new_path || filename);

  if (source === 'gui') {
    const json = /json/i.test(ext);
    let metadata = getState().metadata.metadata;
    metadata = trimObject(metadata);
    data = json ? JSON.stringify(metadata, null, 2) : toYAML(metadata);
  }

  const payload = new_path
    ? { path: new_path, raw_content: data }
    : { raw_content: data };

  // handle errors
  const errors = validateDatafile(filename, data);
  if (errors.length) {
    return dispatch(validationError(errors));
  }
  dispatch(clearErrors());

  return put(
    datafileAPIUrl(directory, filename),
    JSON.stringify(payload),
    { type: PUT_DATAFILE_SUCCESS, name: 'file' },
    { type: PUT_DATAFILE_FAILURE, name: 'error' },
    dispatch
  );
};

export const deleteDataFile = (directory, filename) => dispatch => {
  const relative_path = computeRelativePath(directory, filename);
  return del(
    datafileAPIUrl(directory, filename),
    { type: DELETE_DATAFILE_SUCCESS, name: 'file', id: relative_path },
    { type: DELETE_DATAFILE_FAILURE, name: 'error' },
    dispatch
  );
};

export const onDataFileChanged = () => ({
  type: DATAFILE_CHANGED,
});

const validateDatafile = (filename, data) =>
  validator(
    { filename, data },
    { filename: 'required', data: 'required' },
    {
      'filename.required': getFilenameRequiredMessage(),
      'data.required': getContentRequiredMessage(),
    }
  );

// Reducer
export default function datafiles(
  state = {
    files: [],
    currentFile: {},
    isFetching: false,
    updated: false,
    datafileChanged: false,
    fieldChanged: false,
  },
  action
) {
  switch (action.type) {
    case FETCH_DATAFILES_REQUEST:
    case FETCH_DATAFILE_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case FETCH_DATAFILES_SUCCESS:
      return {
        ...state,
        files: action.files,
        isFetching: false,
        currentFile: {},
      };
    case FETCH_DATAFILES_FAILURE:
      return {
        ...state,
        isFetching: false,
        currentFile: {},
      };
    case FETCH_DATAFILE_SUCCESS:
      return {
        ...state,
        currentFile: action.file,
        isFetching: false,
      };
    case FETCH_DATAFILE_FAILURE:
      return {
        ...state,
        currentFile: {},
        isFetching: false,
      };
    case PUT_DATAFILE_SUCCESS:
      return {
        ...state,
        currentFile: action.file,
        updated: true,
        datafileChanged: false,
      };
    case PUT_DATAFILE_FAILURE:
      return {
        ...state,
        datafileChanged: false,
      };
    case DELETE_DATAFILE_SUCCESS:
      return {
        ...state,
        files: filterDeleted(state.files, action.id),
      };
    case DATAFILE_CHANGED:
      return {
        ...state,
        datafileChanged: true,
        updated: false,
      };
    default:
      return {
        ...state,
        updated: false,
        datafileChanged: false,
      };
  }
}
