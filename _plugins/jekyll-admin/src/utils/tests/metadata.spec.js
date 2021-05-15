import {
  addFieldToMetadata,
  removeFieldFromMetadata,
  updateMetadataFieldKey,
  updateMetadataFieldValue,
  convertMetadataField,
  moveMetadataArrayItem,
  injectDefaultFields,
  computeFieldType,
} from '../metadata';

import { state, emptyState, config } from './fixtures';

describe('Metadata functions:', () => {
  describe('addFieldToMetadata', () => {
    it('should not add if nameAttr does not exists', () => {
      let actual = addFieldToMetadata(emptyState, 'metadata["notexists"]');
      let expected = {};
      expect(actual).toEqual(expected);
    });

    it('should add a field to empty metadata', () => {
      let actual = addFieldToMetadata(emptyState, 'metadata');
      let expected = { [`New field ${emptyState.new_field_count}`]: '' };
      expect(actual).toEqual(expected);
    });

    it('should add a field to object', () => {
      let metadata = addFieldToMetadata(state, 'metadata["students"][1]');
      let actual = metadata.students[1][`New field ${state.new_field_count}`];
      expect(actual).toBe('');
    });

    it('should add a field to array', () => {
      let metadata = addFieldToMetadata(state, 'metadata["mentors"]');
      let actual = metadata.mentors.slice(-1)[0];
      expect(actual).toBe('');
      expect(state.metadata.mentors.length + 1).toBe(metadata.mentors.length);
    });
  });

  describe('removeFieldFromMetadata', () => {
    it('should not remove if nameAttr does not exists', () => {
      let actual = removeFieldFromMetadata(
        emptyState,
        'metadata["notexists"]',
        'key'
      );
      let expected = {};
      expect(actual).toEqual(expected);
    });

    it('should not remove if key does not exists', () => {
      let actual = removeFieldFromMetadata(state, 'metadata', 'layout1');
      expect(actual).toEqual(state.metadata);
      actual = removeFieldFromMetadata(state, 'metadata["students"]', 3);
      expect(actual).toEqual(state.metadata);
    });

    it('should remove field', () => {
      let metadata = removeFieldFromMetadata(
        state,
        'metadata["students"][1]',
        'name'
      );
      let actual = metadata.students[1]['name'];
      expect(actual).toBeFalsy();
      metadata = removeFieldFromMetadata(state, 'metadata["students"]', 0);
      actual = metadata.students;
      let expected = state.metadata.students.slice(1);
      expect(actual).toEqual(expected);
    });
  });

  describe('updateMetadataFieldKey', () => {
    it('should not update if namePrefix does not exists', () => {
      let actual = updateMetadataFieldKey(
        emptyState,
        'metadata',
        'notexists',
        'no'
      );
      let expected = {};
      expect(actual).toEqual(expected);
    });

    it('should not update if namePrefix does not exists', () => {
      let actual = updateMetadataFieldKey(
        emptyState,
        'metadata["notexists"]',
        '',
        ''
      );
      let expected = {};
      expect(actual).toEqual(expected);
    });

    it('should not update if fieldKey does not exists', () => {
      let actual = updateMetadataFieldKey(
        state,
        'metadata',
        'layout1',
        'layout2'
      );
      let expected = state.metadata;
      expect(actual).toEqual(expected);
    });

    it('should not update if new key already exists', () => {
      let actual = updateMetadataFieldKey(
        state,
        'metadata',
        'layout',
        'categories'
      );
      let expected = state.metadata;
      expect(actual).toEqual(expected);
    });

    it('should update field key', () => {
      let metadata = updateMetadataFieldKey(
        state,
        'metadata',
        'layout',
        'layout1'
      );
      let actual = metadata.layout1;
      let expected = state.metadata.layout;
      expect(actual).toEqual(expected);
      expect(metadata.layout).toBeFalsy();
    });
  });

  describe('updateMetadataFieldValue', () => {
    it('should empty state', () => {
      let actual = updateMetadataFieldValue(state, 'metadata', {});
      expect(actual).toEqual({});
      expect(typeof actual).toBe('object');
    });

    it('should create the key if nameAttr does not exists', () => {
      let actual = updateMetadataFieldValue(
        emptyState,
        'metadata["layout"]',
        'post'
      );
      let expected = { layout: 'post' };
      expect(actual).toEqual(expected);
    });

    it('should update an existing key value', () => {
      let metadata = updateMetadataFieldValue(
        state,
        'metadata["layout"]',
        'post1'
      );
      let actual = metadata.layout;
      expect(actual).toBe('post1');
      metadata = updateMetadataFieldValue(state, 'metadata["mentors"]', 'text');
      actual = metadata.student;
      expect(typeof actual).not.toBe('array');
    });
  });

  describe('convertMetadataField', () => {
    it('should not convert if nameAttr does not exists', () => {
      let actual = convertMetadataField(
        state,
        'metadata["notexists"]',
        'simple'
      );
      expect(actual).toEqual(state.metadata);
    });

    it('should convert simple type to object', () => {
      let metadata = convertMetadataField(
        state,
        'metadata["layout"]',
        'object'
      );
      let actual = metadata.layout;
      let expected = { [`New field ${emptyState.new_field_count}`]: '' };
      expect(actual).toEqual(expected);
    });

    it('should convert simple type to array', () => {
      let metadata = convertMetadataField(state, 'metadata["layout"]', 'array');
      let actual = metadata.layout;
      let expected = [''];
      expect(actual).toEqual(expected);
    });

    it('should convert array type to object', () => {
      let metadata = convertMetadataField(
        state,
        'metadata["students"]',
        'object'
      );
      let actual = metadata.students;
      let expected = { [`New field ${emptyState.new_field_count}`]: '' };
      expect(actual).toEqual(expected);
    });

    it('should convert object type to array', () => {
      let metadata = convertMetadataField(
        state,
        'metadata["students"][1]["name"]',
        'array'
      );
      let actual = metadata.students[1].name;
      let expected = [''];
      expect(actual).toEqual(expected);
    });

    it('should convert twice', () => {
      let metadata = convertMetadataField(
        state,
        'metadata["mentors"][1]',
        'object'
      );
      metadata = convertMetadataField(
        { metadata, new_field_count: 1 },
        'metadata["mentors"][1]["New field 0"]',
        'array'
      );
      let actual = metadata.mentors[1]['New field 0'];
      let expected = [''];
      expect(actual).toEqual(expected);
    });
  });

  describe('moveMetadataArrayItem', () => {
    it('should not move item if it is not an array', () => {
      let actual = moveMetadataArrayItem(state, 'metadata["layout"]', 0, 1);
      expect(actual).toEqual(state.metadata);
    });

    it('should move item correctly', () => {
      let metadata = moveMetadataArrayItem(state, 'metadata["mentors"]', 0, 1);
      let first = metadata.mentors[0];
      expect(first).toEqual(state.metadata.mentors[1]); // first became second
      let second = metadata.mentors[1];
      expect(second).toEqual(state.metadata.mentors[0]);
      metadata = moveMetadataArrayItem(state, 'metadata["mentors"]', 2, 0);
      first = metadata.mentors[0];
      expect(first).toEqual(state.metadata.mentors[2]); // last became first
      second = metadata.mentors[1];
      expect(second).toEqual(state.metadata.mentors[0]); // first became second
    });
  });

  describe('injectDefaultFields', () => {
    it('should inject relevant fields into the front_matter', () => {
      let actual = injectDefaultFields(undefined, '', 'posts');
      let expected = {};
      expect(actual).toEqual(expected);

      actual = injectDefaultFields(config, '', 'posts');
      expected = {
        some_front_matter: 'default',
        post_field: 'default',
      };
      expect(actual).toEqual(expected);

      actual = injectDefaultFields(config, '', 'posts', { existing: 'hi' });
      expected = {
        some_front_matter: 'default',
        existing: 'hi',
        post_field: 'default',
      };
      expect(actual).toEqual(expected);

      actual = injectDefaultFields(config, 'test', 'pages');
      expected = {
        some_front_matter: 'default',
        page_field: 'default',
      };
      expect(actual).toEqual(expected);
    });
  });

  describe('computeFieldType', () => {
    expect(computeFieldType({ name: 'John Doe' })).toEqual('object');
    expect(computeFieldType({ name: 'John Doe' }, 'tags')).toEqual('object');

    expect(computeFieldType(['package.json'])).toEqual('array');
    expect(computeFieldType(['package.json'], 'tags')).toEqual('simple');

    expect(computeFieldType('Hello World')).toEqual('simple');
    expect(computeFieldType(12345)).toEqual('simple');
    expect(computeFieldType(null)).toEqual('simple');
    expect(computeFieldType(true)).toEqual('simple');
    expect(computeFieldType(false)).toEqual('simple');
  });
});
