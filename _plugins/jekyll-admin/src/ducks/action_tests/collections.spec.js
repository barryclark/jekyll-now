import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as collectionsDuck from '../collections';
import * as utilsDuck from '../utils';
import { API } from '../../constants/api';
import { getFilenameFromPath } from '../../utils/helpers';
import nock from 'nock';
import _ from 'underscore';

import {
  collections,
  collection,
  doc,
  new_doc,
  post,
  new_post_with_date,
} from './fixtures';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const filename = getFilenameFromPath(doc.path);

describe('Actions::Collections', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('fetches collections successfully', () => {
    nock(API)
      .get('/collections')
      .reply(200, collections);

    const expectedActions = [
      { type: collectionsDuck.FETCH_COLLECTIONS_REQUEST },
      { type: collectionsDuck.FETCH_COLLECTIONS_SUCCESS, collections },
    ];

    const store = mockStore({ collections: [] });

    return store.dispatch(collectionsDuck.fetchCollections()).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("fetches the collection's entries successfully", () => {
    nock(API)
      .get(`/collections/posts/entries`)
      .reply(200, [collection]);

    const expectedActions = [
      { type: collectionsDuck.FETCH_COLLECTION_REQUEST },
      { type: collectionsDuck.FETCH_COLLECTION_SUCCESS, entries: [collection] },
    ];

    const store = mockStore({ movies: {} });

    return store
      .dispatch(collectionsDuck.fetchCollection('posts', ''))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('fetches the document successfully', () => {
    nock(API)
      .get(`/collections/${doc.collection}/${filename}`)
      .reply(200, doc);

    const expectedActions = [
      { type: collectionsDuck.FETCH_DOCUMENT_REQUEST },
      { type: collectionsDuck.FETCH_DOCUMENT_SUCCESS, doc },
    ];

    const store = mockStore({ currentDocument: {} });

    return store
      .dispatch(collectionsDuck.fetchDocument(doc.collection, '', filename))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('deletes the document successfully', () => {
    nock(API)
      .intercept(`/collections/${doc.collection}/${filename}`, 'OPTIONS')
      .reply(200, null, {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application:json',
      })
      .delete(`/collections/${doc.collection}/${filename}`)
      .reply(200);

    const expectedActions = [
      { type: collectionsDuck.DELETE_DOCUMENT_SUCCESS, id: filename },
    ];

    const store = mockStore({});

    return store
      .dispatch(collectionsDuck.deleteDocument(doc.collection, '', filename))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('creates DELETE_DOCUMENT_FAILURE when deleting document failed', () => {
    nock(API)
      .delete(`/collections/${doc.collection}/${filename}`)
      .replyWithError('something awful happened');

    const expectedAction = {
      type: collectionsDuck.DELETE_DOCUMENT_FAILURE,
      error: 'something awful happened',
    };

    const store = mockStore({});

    return store
      .dispatch(collectionsDuck.deleteDocument(doc.collection, filename, ''))
      .then(() => {
        expect(store.getActions()[0].type).toEqual(expectedAction.type);
      });
  });

  it('updates the document successfully', () => {
    nock(API)
      .put(`/collections/${doc.collection}/${filename}`)
      .reply(200, doc);

    const expectedActions = [
      { type: utilsDuck.CLEAR_ERRORS },
      { type: collectionsDuck.PUT_DOCUMENT_SUCCESS, doc },
    ];

    const store = mockStore({ metadata: { metadata: doc } });

    return store
      .dispatch(collectionsDuck.putDocument(doc.collection, '', filename))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('creates PUT_DOCUMENT_FAILURE when updating document failed', () => {
    nock(API)
      .put(`/collections/${doc.collection}/${filename}`)
      .replyWithError('something awful happened');

    const expectedActions = [
      { type: utilsDuck.CLEAR_ERRORS },
      {
        type: collectionsDuck.PUT_DOCUMENT_FAILURE,
        error: 'something awful happened',
      },
    ];

    const store = mockStore({ metadata: { metadata: doc } });

    return store
      .dispatch(collectionsDuck.putDocument(doc.collection, filename))
      .then(() => {
        expect(store.getActions()[1].type).toEqual(expectedActions[1].type);
      });
  });

  it('creates the document successfully', () => {
    nock(API)
      .put(`/collections/${new_doc.collection}/${new_doc.path}`)
      .reply(200, doc);

    const expectedActions = [
      { type: utilsDuck.CLEAR_ERRORS },
      { type: collectionsDuck.PUT_DOCUMENT_SUCCESS, doc },
    ];

    const store = mockStore({ metadata: { metadata: new_doc } });

    return store
      .dispatch(collectionsDuck.createDocument(new_doc.collection, ''))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('creates the document with autogenerated filename', () => {
    nock(API)
      .put(`/collections/${new_doc.collection}/${new_doc.path}`)
      .reply(200, doc);

    const expectedActions = [
      { type: utilsDuck.CLEAR_ERRORS },
      { type: collectionsDuck.PUT_DOCUMENT_SUCCESS, doc },
    ];

    const store = mockStore({
      metadata: { metadata: { ...new_doc, path: '' } },
    });

    return store
      .dispatch(collectionsDuck.createDocument(new_doc.collection, ''))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('creates the post with autogenerated filename', () => {
    nock(API)
      .put(
        `/collections/${new_post_with_date.collection}/${new_post_with_date.path}`
      )
      .reply(200, post);

    const expectedActions = [
      { type: utilsDuck.CLEAR_ERRORS },
      { type: collectionsDuck.PUT_DOCUMENT_SUCCESS, doc: post },
    ];

    const store = mockStore({
      metadata: {
        metadata: {
          ...new_post_with_date,
          path: '',
          front_matter: { date: new_post_with_date.date },
        },
      },
    });

    return store
      .dispatch(
        collectionsDuck.createDocument(new_post_with_date.collection, '')
      )
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('creates VALIDATION_ERROR if required field is not provided.', () => {
    const expectedActions = [
      {
        type: utilsDuck.VALIDATION_ERROR,
        errors: [
          'The title is required.',
          'The filename is required.',
          'The filename is not valid.',
        ],
      },
    ];

    const store = mockStore({
      metadata: { metadata: _.omit(doc, ['title', 'path']) },
    });

    store.dispatch(collectionsDuck.putDocument(doc.collection, doc.id));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('creates VALIDATION_ERROR if the date is not valid.', () => {
    const expectedActions = [
      {
        type: utilsDuck.VALIDATION_ERROR,
        errors: ['The filename is not valid.'],
      },
    ];

    const store = mockStore({
      metadata: { metadata: { title: 'test', path: '2016-33-33-title.md' } },
    });

    store.dispatch(collectionsDuck.putDocument('posts', doc.id));
    expect(store.getActions()).toEqual(expectedActions);
  });
});
