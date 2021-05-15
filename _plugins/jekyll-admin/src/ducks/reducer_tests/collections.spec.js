import * as collectionsDuck from '../collections';
import { doc, collection, collections, collection_entries } from './fixtures';

const reducer = collectionsDuck.default;

describe('Reducers::Collections', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      entries: [],
      currentDocument: {},
      collections: [],
      isFetching: false,
      updated: false,
    });
  });

  it('should handle fetchCollections', () => {
    expect(
      reducer(
        {},
        {
          type: collectionsDuck.FETCH_COLLECTIONS_REQUEST,
        }
      )
    ).toEqual({
      isFetching: true,
    });
    expect(
      reducer(
        { isFetching: true },
        {
          type: collectionsDuck.FETCH_COLLECTIONS_SUCCESS,
          collections,
        }
      )
    ).toEqual({
      collections,
      isFetching: false,
    });
    expect(
      reducer(
        { isFetching: true },
        {
          type: collectionsDuck.FETCH_COLLECTIONS_FAILURE,
        }
      )
    ).toEqual({
      isFetching: false,
      collections: [],
    });
  });

  it('should handle fetchCollection', () => {
    expect(
      reducer(
        {},
        {
          type: collectionsDuck.FETCH_COLLECTION_REQUEST,
        }
      )
    ).toEqual({
      isFetching: true,
    });
    expect(
      reducer(
        {},
        {
          type: collectionsDuck.FETCH_COLLECTION_SUCCESS,
          entries: [collection],
        }
      )
    ).toEqual({
      entries: [collection],
      isFetching: false,
    });
    expect(
      reducer(
        { isFetching: true },
        {
          type: collectionsDuck.FETCH_COLLECTION_FAILURE,
        }
      )
    ).toEqual({
      entries: [],
      isFetching: false,
    });
  });

  it('should handle putDocument', () => {
    expect(
      reducer(
        {},
        {
          type: collectionsDuck.PUT_DOCUMENT_SUCCESS,
          doc,
        }
      )
    ).toEqual({
      currentDocument: doc,
      updated: true,
    });
    expect(reducer({ updated: true }, {})).toEqual({
      updated: false,
    });
  });

  it('should filter documents and directories', () => {
    expect(
      collectionsDuck.filterBySearchInput(collection_entries, 'dir').length
    ).toBe(1);
    expect(
      collectionsDuck.filterBySearchInput(collection_entries, null).length
    ).toBe(2);
  });
});
