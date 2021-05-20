import {
  addFieldToMetadata,
  removeFieldFromMetadata,
  updateMetadataFieldKey,
  updateMetadataFieldValue,
  moveMetadataArrayItem,
  convertMetadataField,
} from '../utils/metadata';

// Action Types
export const UPDATE_TITLE = 'UPDATE_TITLE';
export const UPDATE_BODY = 'UPDATE_BODY';
export const UPDATE_PATH = 'UPDATE_PATH';
export const STORE_CONTENT_FIELDS = 'STORE_CONTENT_FIELDS';
export const ADD_METAFIELD = 'ADD_METAFIELD';
export const REMOVE_METAFIELD = 'REMOVE_METAFIELD';
export const UPDATE_FIELD_KEY = 'UPDATE_FIELD_KEY';
export const UPDATE_FIELD_VALUE = 'UPDATE_FIELD_VALUE';
export const MOVE_ARRAY_ITEM = 'MOVE_ARRAY_ITEM';
export const CONVERT_FIELD = 'CONVERT_FIELD';
export const ENABLE_FIELD = 'ENABLE_FIELD';

// Actions
export const storeContentFields = content => ({
  type: STORE_CONTENT_FIELDS,
  content,
});

export const addField = namePrefix => ({
  type: ADD_METAFIELD,
  namePrefix,
});

export const removeField = (namePrefix, key) => ({
  type: REMOVE_METAFIELD,
  namePrefix,
  key,
});

export const enableField = (nameAttr, value) => ({
  type: ENABLE_FIELD,
  nameAttr,
  value,
});

export const updateFieldKey = (namePrefix, fieldKey, newKey) => ({
  type: UPDATE_FIELD_KEY,
  namePrefix,
  fieldKey,
  newKey,
});

export const updateFieldValue = (nameAttr, value) => ({
  type: UPDATE_FIELD_VALUE,
  nameAttr,
  value,
});

export const moveArrayItem = (namePrefix, srcInd, targetInd) => ({
  type: MOVE_ARRAY_ITEM,
  namePrefix,
  srcInd,
  targetInd,
});

export const convertField = (nameAttr, convertType) => ({
  type: CONVERT_FIELD,
  nameAttr,
  convertType,
});

export const updateTitle = title => ({
  type: UPDATE_TITLE,
  title,
});

export const updateBody = body => ({
  type: UPDATE_BODY,
  body,
});

export const updatePath = path => ({
  type: UPDATE_PATH,
  path,
});

// Reducer
export default function metadata( // TODO normalize the metadata
  state = {
    metadata: {},
    new_field_count: 1,
    key_prefix: '', // force children to be rerendered on sort
    fieldChanged: false,
  },
  action
) {
  switch (action.type) {
    case UPDATE_TITLE:
      return {
        ...state,
        metadata: {
          ...state.metadata,
          title: action.title,
        },
        fieldChanged: true,
      };
    case UPDATE_BODY:
      return {
        ...state,
        metadata: {
          ...state.metadata,
          raw_content: action.body,
        },
        fieldChanged: true,
      };
    case UPDATE_PATH:
      return {
        ...state,
        metadata: {
          ...state.metadata,
          path: action.path,
        },
        fieldChanged: true,
      };
    case STORE_CONTENT_FIELDS:
      return {
        ...state,
        metadata: action.content,
      };
    case ADD_METAFIELD:
      return {
        ...state,
        metadata: addFieldToMetadata(state, action.namePrefix),
        new_field_count: state.new_field_count + 1,
      };
    case REMOVE_METAFIELD:
      return {
        ...state,
        metadata: removeFieldFromMetadata(state, action.namePrefix, action.key),
        fieldChanged: true,
        key_prefix: `${Math.random() * 100}`,
      };
    case UPDATE_FIELD_KEY:
      return {
        ...state,
        metadata: updateMetadataFieldKey(
          state,
          action.namePrefix,
          action.fieldKey,
          action.newKey.trim()
        ),
        fieldChanged: true,
      };
    case UPDATE_FIELD_VALUE:
      return {
        ...state,
        metadata: updateMetadataFieldValue(
          state,
          action.nameAttr,
          action.value
        ),
        fieldChanged: true,
      };
    case MOVE_ARRAY_ITEM:
      return {
        ...state,
        metadata: moveMetadataArrayItem(
          state,
          action.namePrefix,
          action.srcInd,
          action.targetInd
        ),
        key_prefix: `${Math.random() * 100}`,
        fieldChanged: true,
      };
    case CONVERT_FIELD:
      return {
        ...state,
        metadata: convertMetadataField(
          state,
          action.nameAttr,
          action.convertType
        ),
        new_field_count: state.new_field_count + 1,
        fieldChanged: true,
      };
    case ENABLE_FIELD:
      return {
        ...state,
        metadata: updateMetadataFieldValue(
          state,
          action.nameAttr,
          action.value
        ),
        fieldChanged: true,
      };
    default:
      return {
        ...state,
        fieldChanged: false,
      };
  }
}
