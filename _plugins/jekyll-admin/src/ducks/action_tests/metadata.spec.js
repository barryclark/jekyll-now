import * as metadataDuck from '../metadata';

import { state } from './fixtures';

describe('Actions::Metadata', () => {
  it('creates STORE_CONTENT_FIELDS', () => {
    const content = state.metadata;
    const expectedAction = {
      type: metadataDuck.STORE_CONTENT_FIELDS,
      content,
    };
    expect(metadataDuck.storeContentFields(content)).toEqual(expectedAction);
  });

  it('creates ADD_METAFIELD', () => {
    const expectedAction = {
      type: metadataDuck.ADD_METAFIELD,
      namePrefix: 'metadata["mentors"]',
    };
    expect(metadataDuck.addField('metadata["mentors"]')).toEqual(
      expectedAction
    );
  });

  it('creates REMOVE_METAFIELD', () => {
    const expectedAction = {
      type: metadataDuck.REMOVE_METAFIELD,
      namePrefix: 'metadata',
      key: 'layout',
    };
    expect(metadataDuck.removeField('metadata', 'layout')).toEqual(
      expectedAction
    );
  });

  it('creates UPDATE_FIELD_KEY', () => {
    const expectedAction = {
      type: metadataDuck.UPDATE_FIELD_KEY,
      namePrefix: 'metadata',
      fieldKey: 'layout',
      newKey: 'layout1',
    };
    expect(
      metadataDuck.updateFieldKey('metadata', 'layout', 'layout1')
    ).toEqual(expectedAction);
  });

  it('creates UPDATE_FIELD_VALUE', () => {
    const expectedAction = {
      type: metadataDuck.UPDATE_FIELD_VALUE,
      nameAttr: 'metadata["layout"]',
      value: 'post1',
    };
    expect(
      metadataDuck.updateFieldValue('metadata["layout"]', 'post1')
    ).toEqual(expectedAction);
  });

  it('creates MOVE_ARRAY_ITEM', () => {
    const expectedAction = {
      type: metadataDuck.MOVE_ARRAY_ITEM,
      namePrefix: 'metadata["mentors"]',
      srcInd: 0,
      targetInd: 1,
    };
    expect(metadataDuck.moveArrayItem('metadata["mentors"]', 0, 1)).toEqual(
      expectedAction
    );
  });

  it('creates CONVERT_FIELD', () => {
    const expectedAction = {
      type: metadataDuck.CONVERT_FIELD,
      nameAttr: 'metadata["mentors"]',
      convertType: 'simple',
    };
    expect(metadataDuck.convertField('metadata["mentors"]', 'simple')).toEqual(
      expectedAction
    );
  });

  it('creates ENABLE_FIELD', () => {
    const expectedAction = {
      type: metadataDuck.ENABLE_FIELD,
      nameAttr: 'metadata["mentors"]',
      value: 'layout',
    };
    expect(metadataDuck.enableField('metadata["mentors"]', 'layout')).toEqual(
      expectedAction
    );
  });

  it('creates UPDATE_TITLE', () => {
    const expectedAction = {
      type: metadataDuck.UPDATE_TITLE,
      title: 'Test Title',
    };
    expect(metadataDuck.updateTitle('Test Title')).toEqual(expectedAction);
  });

  it('creates UPDATE_BODY', () => {
    const expectedAction = {
      type: metadataDuck.UPDATE_BODY,
      body: 'Test Body',
    };
    expect(metadataDuck.updateBody('Test Body')).toEqual(expectedAction);
  });

  it('creates UPDATE_PATH', () => {
    const expectedAction = {
      type: metadataDuck.UPDATE_PATH,
      path: 'test.md',
    };
    expect(metadataDuck.updatePath('test.md')).toEqual(expectedAction);
  });
});
