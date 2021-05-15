import fetch from 'isomorphic-fetch';
import { addNotification } from '../ducks/notifications';
import { BadInputError } from './apiErrors';

import translations from '../translations';
const {
  getErrorMessage,
  getFetchErrorMessage,
  getUpdateErrorMessage,
  getDeleteErrorMessage,
} = translations;

/**
 * Fetch wrapper for GET request that dispatches actions according to the
 * request status
 * @param {String} url
 * @param {Object} action_success
 * @param {Object} action_failure
 * @return {Function} dispatch
 */
export const get = (url, action_success, action_failure, dispatch) => {
  return fetch(url, { credentials: 'same-origin' })
    .then(res => res.json())
    .then(data =>
      dispatch({
        type: action_success.type,
        [action_success.name]: data,
      })
    )
    .catch(error => {
      dispatch({
        type: action_failure.type,
        [action_failure.name]: error,
      });
      dispatch(
        addNotification(
          getErrorMessage(),
          getFetchErrorMessage(action_success.name),
          'error'
        )
      );
    });
};

/**
 * Fetch wrapper for PUT request that dispatches actions according to the
 * request status
 * @param {String} url
 * @param {Object} body
 * @param {Object} action_success
 * @param {Object} action_failure
 * @return {Function} dispatch
 */
export const put = (url, body, action_success, action_failure, dispatch) => {
  return fetch(url, {
    method: 'PUT',
    credentials: 'same-origin',
    body,
  })
    .then(res => res.json())
    .then(data => {
      if (data.error_message) {
        throw new BadInputError(data.error_message);
      }
      dispatch({
        type: action_success.type,
        [action_success.name]: data,
      });
    })
    .catch(error => {
      dispatch({
        type: action_failure.type,
        [action_failure.name]: error,
      });
      let error_message =
        error.name === 'BadInputError'
          ? error.message
          : getUpdateErrorMessage(action_success.name);
      dispatch(addNotification(getErrorMessage(), error_message, 'error'));
    });
};

/**
 * Fetch wrapper for DELETE request that dispatches actions according to the
 * request status
 * @param {String} url
 * @param {Object} action_success
 * @param {Object} action_failure
 * @return {Function} dispatch
 */
export const del = (url, action_success, action_failure, dispatch) => {
  return fetch(url, {
    method: 'DELETE',
    credentials: 'same-origin',
  })
    .then(data =>
      dispatch({
        type: action_success.type,
        id: action_success.id,
      })
    )
    .catch(error => {
      dispatch({
        type: action_failure.type,
        [action_failure.name]: error,
      });
      dispatch(
        addNotification(
          getErrorMessage(),
          getDeleteErrorMessage(action_success.name),
          'error'
        )
      );
    });
};
