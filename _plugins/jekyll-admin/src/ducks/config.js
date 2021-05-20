import { getConfigurationUrl, putConfigurationUrl } from '../constants/api';
import { get, put } from '../utils/fetch';
import { validator } from '../utils/validation';
import { clearErrors, validationError } from './utils';
import { toYAML } from '../utils/helpers';

import translations from '../translations';
const { getContentRequiredMessage } = translations;

// Action Types
export const FETCH_CONFIG_REQUEST = 'FETCH_CONFIG_REQUEST';
export const FETCH_CONFIG_SUCCESS = 'FETCH_CONFIG_SUCCESS';
export const FETCH_CONFIG_FAILURE = 'FETCH_CONFIG_FAILURE';
export const PUT_CONFIG_REQUEST = 'PUT_CONFIG_REQUEST';
export const PUT_CONFIG_SUCCESS = 'PUT_CONFIG_SUCCESS';
export const PUT_CONFIG_FAILURE = 'PUT_CONFIG_FAILURE';
export const CONFIG_EDITOR_CHANGED = 'CONFIG_EDITOR_CHANGED';

// Actions
export const fetchConfig = () => dispatch => {
  dispatch({ type: FETCH_CONFIG_REQUEST });
  return get(
    getConfigurationUrl(),
    { type: FETCH_CONFIG_SUCCESS, name: 'config' },
    { type: FETCH_CONFIG_FAILURE, name: 'error' },
    dispatch
  );
};

export const putConfig = (config, source = 'editor') => (
  dispatch,
  getState
) => {
  let payload;

  if (source === 'gui') {
    config = getState().metadata.metadata;
    payload = { raw_content: toYAML(config) };
  } else {
    payload = { raw_content: config };
  }

  // handle errors
  const errors = validateConfig(config);
  if (errors.length) {
    return dispatch(validationError(errors));
  }
  dispatch(clearErrors());

  return put(
    putConfigurationUrl(),
    JSON.stringify(payload),
    { type: PUT_CONFIG_SUCCESS, name: 'config' },
    { type: PUT_CONFIG_FAILURE, name: 'error' },
    dispatch
  );
};

const validateConfig = config =>
  validator(
    { config },
    { config: 'required' },
    {
      'config.required': getContentRequiredMessage(),
    }
  );

export const onEditorChange = () => ({
  type: CONFIG_EDITOR_CHANGED,
});

// Reducer
export default function config(
  state = {
    config: {},
    updated: false,
    editorChanged: false,
    fieldChanged: false,
    isFetching: false,
  },
  action
) {
  switch (action.type) {
    case FETCH_CONFIG_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case FETCH_CONFIG_SUCCESS:
      return {
        ...state,
        config: action.config,
        isFetching: false,
      };
    case FETCH_CONFIG_FAILURE:
      return {
        ...state,
        isFetching: false,
      };
    case PUT_CONFIG_SUCCESS:
      return {
        ...state,
        config: action.config,
        editorChanged: false,
        updated: true,
      };
    case PUT_CONFIG_FAILURE:
      return {
        ...state,
        editorChanged: false,
      };
    case CONFIG_EDITOR_CHANGED:
      return {
        ...state,
        editorChanged: true,
        updated: false,
      };
    default:
      return {
        ...state,
        updated: false,
        editorChanged: false,
      };
  }
}
