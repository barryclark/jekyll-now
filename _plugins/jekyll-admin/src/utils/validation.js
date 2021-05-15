import _ from 'underscore';

import translations from '../translations';
const { getTitleRequiredMessage, getFilenameNotValidMessage } = translations;

const DATE_FILENAME_MATCHER = /^(?:.+\/)*(\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]))-(.*)(\.[^.]+)$/;
const FILENAME_MATCHER = /^(.*)(\.[^.]+)$/;

const validated = (field, single) => {
  switch (single) {
    case 'required':
      return !!field;
    case 'date':
      return DATE_FILENAME_MATCHER.test(field);
    case 'filename':
      return FILENAME_MATCHER.test(field);
    default:
      return false;
  }
};

export const validatePage = metadata => {
  return validator(
    metadata,
    { path: 'required|filename' },
    {
      'path.required': getTitleRequiredMessage(),
      'path.filename': getFilenameNotValidMessage(),
    }
  );
};

/**
 * Returns error messages if the given values does not pass the provided validations.
 * @param {Object} values
 * @param {Object} validations
 * @param {Object} messages
 * @return {Array} errorMessages
 */
export const validator = (values, validations, messages) => {
  let errorMessages = [];
  _.each(validations, (validationStr, field, list) => {
    const validationArr = validationStr.split('|');
    _.each(validationArr, single => {
      if (!validated(values[field], single)) {
        errorMessages.push(messages[`${field}.${single}`]);
      }
    });
  });
  return errorMessages;
};
