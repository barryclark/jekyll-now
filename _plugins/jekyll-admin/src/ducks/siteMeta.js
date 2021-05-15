import { getSiteMetaUrl } from '../constants/api';
import { get } from '../utils/fetch';

// Action Types
export const FETCH_SITE_META_REQUEST = 'FETCH_SITE_META_REQUEST';
export const FETCH_SITE_META_SUCCESS = 'FETCH_SITE_META_SUCCESS';
export const FETCH_SITE_META_FAILURE = 'FETCH_SITE_META_FAILURE';

// Actions
export const fetchSiteMeta = () => dispatch => {
  dispatch({ type: FETCH_SITE_META_REQUEST });
  return get(
    getSiteMetaUrl(),
    { type: FETCH_SITE_META_SUCCESS, name: 'site' },
    { type: FETCH_SITE_META_FAILURE, name: 'error' },
    dispatch
  );
};

// Reducer
export default function siteMeta(
  state = {
    site: {},
    isFetching: false,
  },
  action
) {
  switch (action.type) {
    case FETCH_SITE_META_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case FETCH_SITE_META_SUCCESS:
      return {
        ...state,
        site: action.site,
        isFetching: false,
      };
    case FETCH_SITE_META_FAILURE:
      return {
        ...state,
        isFetching: false,
      };
    default:
      return state;
  }
}
