import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import MetaArray from './MetaArray';
import MetaObject from './MetaObject';
import MetaSimple from './MetaSimple';
import MetaButtons from './MetaButtons';

export class MetaField extends Component {
  componentDidMount() {
    const isNewField = /New field/.test(this.props.fieldKey);
    isNewField && this.refs.field_key.select();
  }

  handleConvertClick(type) {
    const { convertField, nameAttr } = this.props;
    convertField(nameAttr, type);
  }

  handleKeyBlur() {
    const { namePrefix, fieldKey, updateFieldKey } = this.props;
    let currentValue = findDOMNode(this.refs.field_key).value;
    if (fieldKey !== currentValue && currentValue !== '') {
      updateFieldKey(namePrefix, fieldKey, currentValue);
    }
  }

  handleRemoveClick() {
    const { removeField, namePrefix, fieldKey } = this.props;
    removeField(namePrefix, fieldKey);
  }

  render() {
    const {
      type,
      parentType,
      fieldKey,
      fieldValue,
      namePrefix,
      addField,
      removeField,
      updateFieldKey,
      updateFieldValue,
      moveArrayItem,
      convertField,
      key_prefix,
      siteMeta,
      isInDefaultState,
      isDefaultField,
    } = this.props;

    const FieldTypes = {
      array: MetaArray,
      object: MetaObject,
      simple: MetaSimple,
    };
    const CurrentComponent = FieldTypes[type];
    return (
      <div ref="wrap" className="metafield">
        <div className={`meta-key ${type}`}>
          <input
            ref="field_key"
            onBlur={() => this.handleKeyBlur()}
            defaultValue={fieldKey}
            className="field key-field"
            type="text"
            placeholder="Key"
            disabled={isInDefaultState}
          />
          <MetaButtons
            currentType={type}
            isDefaultField={isDefaultField}
            parentType="top"
            parentKey={fieldKey}
            onConvertClick={type => this.handleConvertClick(type)}
            onRemoveClick={() => this.handleRemoveClick()}
          />
        </div>
        <CurrentComponent
          key_prefix={key_prefix}
          fieldKey={fieldKey}
          parentType={parentType}
          fieldValue={fieldValue}
          addField={addField}
          removeField={removeField}
          updateFieldKey={updateFieldKey}
          updateFieldValue={updateFieldValue}
          moveArrayItem={moveArrayItem}
          convertField={convertField}
          nameAttr={`${namePrefix}['${fieldKey}']`}
          namePrefix={`${namePrefix}['${fieldKey}']`}
          siteMeta={siteMeta}
          isInDefaultState={isInDefaultState}
        />
      </div>
    );
  }
}

MetaField.propTypes = {
  type: PropTypes.string.isRequired,
  parentType: PropTypes.string.isRequired,
  addField: PropTypes.func.isRequired,
  removeField: PropTypes.func.isRequired,
  updateFieldKey: PropTypes.func.isRequired,
  updateFieldValue: PropTypes.func.isRequired,
  moveArrayItem: PropTypes.func.isRequired,
  convertField: PropTypes.func.isRequired,
  fieldKey: PropTypes.string.isRequired,
  fieldValue: PropTypes.any,
  nameAttr: PropTypes.string.isRequired,
  namePrefix: PropTypes.string.isRequired,
  key_prefix: PropTypes.string.isRequired,
  siteMeta: PropTypes.object,
  isInDefaultState: PropTypes.bool,
  isDefaultField: PropTypes.bool,
};

export default MetaField;
