import _ from 'underscore';
import cloneDeep from 'lodash/cloneDeep';

/**
 * Returns the metadata of the state with the new empty field. If the field does
 * not exist, returns the original metadata. Does not mutate the given state.
 * @param {Object} state
 * @param {String} namePrefix
 * @return {Object} metadata
 */
export const addFieldToMetadata = (state, namePrefix) => {
  let tmpState = cloneDeep(state);
  let field = eval(`tmpState.${namePrefix}`);
  if (field === undefined) return tmpState.metadata;
  if (_.isArray(field)) field.push('');
  else field[`New field ${state.new_field_count}`] = '';
  return tmpState.metadata;
};

/**
 * Returns the metadata of the state with the removed key. If the field does not
 * exist, returns the original metadata. Does not mutate the given state.
 * @param {Object} state
 * @param {String} namePrefix
 * @param {String} key
 * @return {Object} metadata
 */
export const removeFieldFromMetadata = (state, namePrefix, key) => {
  let tmpState = cloneDeep(state);
  let field = eval(`tmpState.${namePrefix}`);
  if (field === undefined) return tmpState.metadata;
  if (_.isArray(field)) {
    if (key >= field.length) {
      return tmpState.metadata;
    }
    field.splice(key, 1);
  } else {
    if (!_.has(field, key)) {
      return tmpState.metadata;
    }
    delete field[key];
  }
  return tmpState.metadata;
};

/**
 * Returns the metadata of the state with the updated key. If the field does not
 * exist or the key already exists, returns the original metadata. Does not
 * mutate the given state.
 * @param {Object} state
 * @param {String} namePrefix
 * @param {String} fieldKey
 * @param {String} newKey
 * @return {Object} metadata
 */
export const updateMetadataFieldKey = (state, namePrefix, fieldKey, newKey) => {
  let tmpState = cloneDeep(state);
  let field = eval(`tmpState.${namePrefix}`);
  if (field === undefined) return tmpState.metadata;
  if (_.has(field, newKey)) return tmpState.metadata;
  field = Object.keys(field).reduce((result, current) => {
    if (current === fieldKey) result[newKey] = field[current];
    else result[current] = field[current];
    return result;
  }, {});
  eval(`tmpState.${namePrefix} = field`);
  return tmpState.metadata;
};

/**
 * Returns the metadata of the state with the updated value of given path(nameAttr).
 * If the field does not exist, creates a new field. Does not mutate the given state.
 * @param {Object} state
 * @param {String} nameAttr
 * @param {String} value
 * @return {Object} metadata
 */
export const updateMetadataFieldValue = (state, nameAttr, value) => {
  let tmpState = cloneDeep(state);
  eval(`tmpState.${nameAttr} = value`);
  return tmpState.metadata;
};

/**
 * Returns the metadata of the state with the converted type of given path(nameAttr).
 * If the field does not exist, returns the original metadata.
 * Does not mutate the given state.
 * @param {Object} state
 * @param {String} nameAttr
 * @param {String} convertType
 * @return {Object} metadata
 */
export const convertMetadataField = (state, nameAttr, convertType) => {
  let tmpState = cloneDeep(state);
  let field = eval(`tmpState.${nameAttr}`);
  if (field === undefined) return tmpState.metadata;
  if (convertType === 'array') field = [''];
  else if (convertType === 'object') {
    let key = `New field ${state.new_field_count}`;
    field = { [key]: '' };
  } else field = '';
  eval(`tmpState.${nameAttr} = field`);
  return tmpState.metadata;
};

/**
 * Returns the metadata of the state with the sorted array. Moves the array item to
 * target index, shifts the rest of them. If the given path is not an array,
 * returns the original metadata. Does not mutate the given state.
 * @param {Object} state
 * @param {String} namePrefix
 * @param {Number} srcInd
 * @param {Number} targetInd
 * @return {Object} metadata
 */
export const moveMetadataArrayItem = (state, namePrefix, srcInd, targetInd) => {
  let tmpState = cloneDeep(state);
  let arr = eval(`tmpState.${namePrefix}`);
  if (!_.isArray(arr)) return tmpState.metadata;
  arr.splice(targetInd, 0, arr.splice(srcInd, 1)[0]);
  return tmpState.metadata;
};

/**
 * Injects the relevant default front matter fields read from the config file into
 * the provided front matter object
 * @param {Object} config
 * @param {String} path
 * @param {String} type
 * @param {Object} front_matter
 * @return {Object} metadata
 */
export const injectDefaultFields = (config, path, type, front_matter = {}) => {
  let defaults;
  try {
    defaults = config.content.defaults;
  } catch (e) {
    return {};
  }
  let metafields = {};
  _.each(defaults, field => {
    const scope = field.scope;
    if (
      (!scope.type || scope.type === type) &&
      (!scope.path || scope.path === path)
    ) {
      _.extend(metafields, field.values);
    }
  });
  return _.extend(metafields, front_matter);
};

/**
 * Given a field-value and corresponding key, this utility returns
 * metadata type for the pair.
 * @param {*} value
 * @param {String} key
 * @return {String} type
 */
export const computeFieldType = (value, key = null) => {
  let type = 'simple';
  const specialKeys = ['tags', 'categories'];
  if (specialKeys.includes(key) && _.isArray(value)) return type;

  if (_.isObject(value)) type = 'object';
  if (_.isArray(value)) type = 'array';
  return type;
};
