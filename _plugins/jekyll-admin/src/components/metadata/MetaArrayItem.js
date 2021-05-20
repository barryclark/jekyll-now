import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MetaArray from './MetaArray';
import MetaObject from './MetaObject';
import MetaSimple from './MetaSimple';
import MetaButtons from './MetaButtons';

export class MetaArrayItem extends Component {
  handleConvertClick(type) {
    const { convertField, nameAttr } = this.props;
    convertField(nameAttr, type);
  }

  handleRemoveClick() {
    const { removeField, namePrefix, index } = this.props;
    removeField(namePrefix, index);
  }

  render() {
    const {
      type,
      fieldKey,
      fieldValue,
      index,
      nameAttr,
      addField,
      removeField,
      updateFieldKey,
      updateFieldValue,
      moveArrayItem,
      convertField,
      key_prefix,
    } = this.props;
    const FieldTypes = {
      array: MetaArray,
      object: MetaObject,
      simple: MetaSimple,
    };
    const CurrentComponent = FieldTypes[type];
    return (
      <div ref="wrap" data-id={index} className="array-item-wrap">
        <div className="array">
          <div className="array-header">
            <span className="array-field-num">{index + 1}.</span>
            <MetaButtons
              currentType={type}
              parentType="array"
              onConvertClick={type => this.handleConvertClick(type)}
              onRemoveClick={() => this.handleRemoveClick()}
            />
          </div>
          <CurrentComponent
            key_prefix={key_prefix}
            parentType="array"
            fieldKey={fieldKey}
            fieldValue={fieldValue}
            addField={addField}
            removeField={removeField}
            updateFieldKey={updateFieldKey}
            updateFieldValue={updateFieldValue}
            moveArrayItem={moveArrayItem}
            convertField={convertField}
            nameAttr={nameAttr}
            namePrefix={nameAttr}
          />
        </div>
      </div>
    );
  }
}

MetaArrayItem.propTypes = {
  type: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  fieldKey: PropTypes.string.isRequired,
  fieldValue: PropTypes.any.isRequired,
  addField: PropTypes.func.isRequired,
  removeField: PropTypes.func.isRequired,
  updateFieldKey: PropTypes.func.isRequired,
  updateFieldValue: PropTypes.func.isRequired,
  moveArrayItem: PropTypes.func.isRequired,
  convertField: PropTypes.func.isRequired,
  nameAttr: PropTypes.string.isRequired,
  namePrefix: PropTypes.string.isRequired,
  key_prefix: PropTypes.string.isRequired,
};

export default MetaArrayItem;
