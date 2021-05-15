import * as pagesDuck from '../pages';
import { page } from './fixtures';

const reducer = pagesDuck.default;

describe('Reducers::Pages', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      pages: [],
      page: {},
      isFetching: false,
      updated: false,
    });
  });

  it('should handle fetchPages', () => {
    expect(
      reducer(
        {},
        {
          type: pagesDuck.FETCH_PAGES_REQUEST,
        }
      )
    ).toEqual({
      isFetching: true,
    });
    expect(
      reducer(
        { page },
        {
          type: pagesDuck.FETCH_PAGES_SUCCESS,
          pages: [page],
        }
      )
    ).toEqual({
      pages: [page],
      page: {},
      isFetching: false,
    });
    expect(
      reducer(
        {},
        {
          type: pagesDuck.FETCH_PAGES_FAILURE,
        }
      )
    ).toEqual({
      pages: [],
      isFetching: false,
    });
  });

  it('should handle fetchPage(id)', () => {
    expect(
      reducer(
        {},
        {
          type: pagesDuck.FETCH_PAGE_REQUEST,
        }
      )
    ).toEqual({
      isFetching: true,
    });
    expect(
      reducer(
        {},
        {
          type: pagesDuck.FETCH_PAGE_SUCCESS,
          page,
        }
      )
    ).toEqual({
      page,
      isFetching: false,
    });
    expect(
      reducer(
        {},
        {
          type: pagesDuck.FETCH_PAGE_FAILURE,
        }
      )
    ).toEqual({
      page: {},
      isFetching: false,
    });
  });

  it('should handle putPage', () => {
    expect(
      reducer(
        {},
        {
          type: pagesDuck.PUT_PAGE_SUCCESS,
          page,
        }
      )
    ).toEqual({
      page,
      updated: true,
    });
    expect(reducer({ updated: true }, {})).toEqual({
      updated: false,
    });
  });
});
