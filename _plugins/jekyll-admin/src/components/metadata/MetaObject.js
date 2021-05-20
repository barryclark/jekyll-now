import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';
import MetaObjectItem from './MetaObjectItem';
import { computeFieldType } from '../../utils/metadata';

export class MetaObject extends Component {
  render() {
    const {
      fieldKey,
      fieldValue,
      namePrefix,
      addField,
      removeField,
      updateFieldKey,
      updateFieldValue,
      convertField,
      key_prefix,
      moveArrayItem,
    } = this.props;
    const items = _.map(fieldValue, (value, key) => {
      const type = computeFieldType(value, key);
      return (
        <MetaObjectItem
          key={key}
          key_prefix={key_prefix}
          fieldKey={key}
          fieldValue={value}
          type={type}
          addField={addField}
          removeField={removeField}
          updateFieldKey={updateFieldKey}
          updateFieldValue={updateFieldValue}
          moveArrayItem={moveArrayItem}
          convertField={convertField}
          nameAttr={`${namePrefix}['${key}']`}
          namePrefix={namePrefix}
        />
      );
    });
    return (
      <div className="meta-value-object">
        {items}
        <a
          onClick={() => addField(namePrefix)}
          className="add-field-object"
          title="Add new key/value pair"
        >
          New key/value pair under <strong>{fieldKey}</strong>
        </a>
      </div>
    );
  }
}

MetaObject.propTypes = {
  fieldKey: PropTypes.string.isRequired,
  fieldValue: PropTypes.any.isRequired,
  nameAttr: PropTypes.string.isRequired,
  namePrefix: PropTypes.string.isRequired,
  addField: PropTypes.func.isRequired,
  removeField: PropTypes.func.isRequired,
  convertField: PropTypes.func.isRequired,
  updateFieldKey: PropTypes.func.isRequired,
  updateFieldValue: PropTypes.func.isRequired,
  moveArrayItem: PropTypes.func.isRequired,
  key_prefix: PropTypes.string.isRequired,
};

export default MetaObject;
