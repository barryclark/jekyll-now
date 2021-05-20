import * as draftsDuck from '../drafts';
import { draft } from './fixtures';

const reducer = draftsDuck.default;

describe('Reducers::Drafts', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      drafts: [],
      draft: {},
      isFetching: false,
      updated: false,
    });
  });

  it('should handle fetchDrafts', () => {
    expect(
      reducer(
        {},
        {
          type: draftsDuck.FETCH_DRAFTS_REQUEST,
        }
      )
    ).toEqual({
      isFetching: true,
    });
    expect(
      reducer(
        { draft },
        {
          type: draftsDuck.FETCH_DRAFTS_SUCCESS,
          drafts: [draft],
        }
      )
    ).toEqual({
      drafts: [draft],
      draft: {},
      isFetching: false,
    });
    expect(
      reducer(
        {},
        {
          type: draftsDuck.FETCH_DRAFTS_FAILURE,
        }
      )
    ).toEqual({
      drafts: [],
      isFetching: false,
    });
  });

  it('should handle fetchDraft(id)', () => {
    expect(
      reducer(
        {},
        {
          type: draftsDuck.FETCH_DRAFT_REQUEST,
        }
      )
    ).toEqual({
      isFetching: true,
    });
    expect(
      reducer(
        {},
        {
          type: draftsDuck.FETCH_DRAFT_SUCCESS,
          draft,
        }
      )
    ).toEqual({
      draft,
      isFetching: false,
    });
    expect(
      reducer(
        {},
        {
          type: draftsDuck.FETCH_DRAFT_FAILURE,
        }
      )
    ).toEqual({
      draft: {},
      isFetching: false,
    });
  });

  it('should handle putDraft', () => {
    expect(
      reducer(
        {},
        {
          type: draftsDuck.PUT_DRAFT_SUCCESS,
          draft,
        }
      )
    ).toEqual({
      draft,
      updated: true,
    });
    expect(reducer({ updated: true }, {})).toEqual({
      updated: false,
    });
  });
});
