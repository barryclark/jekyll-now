import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Sortable from 'sortablejs';
import Icon from '../Icon';
import MetaArrayItem from './MetaArrayItem';
import { computeFieldType } from '../../utils/metadata';

export class MetaArray extends Component {
  sortableGroupDecorator(component) {
    const { moveArrayItem, namePrefix } = this.props;
    if (component) {
      const options = {
        draggable: '.array-item-wrap',
        group: { name: 'meta-array-items', pull: false, put: false },
        handle: '.move',
        animation: 0,
        onEnd: e => {
          let srcInd = e.item.getAttribute('data-id');
          moveArrayItem(namePrefix, srcInd, e.newIndex);
        },
      };
      Sortable.create(component, options);
    }
  }

  render() {
    const {
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
    } = this.props;
    const items = fieldValue.map((item, i) => {
      const type = computeFieldType(item);
      return (
        <MetaArrayItem
          key={`${key_prefix}-${i}`}
          key_prefix={key_prefix}
          index={i}
          fieldKey={fieldKey}
          fieldValue={item}
          type={type}
          addField={addField}
          removeField={removeField}
          updateFieldKey={updateFieldKey}
          updateFieldValue={updateFieldValue}
          moveArrayItem={moveArrayItem}
          convertField={convertField}
          nameAttr={`${namePrefix}[${i}]`}
          namePrefix={namePrefix}
        />
      );
    });
    return (
      <div
        className="meta-value-array"
        ref={this.sortableGroupDecorator.bind(this)}
      >
        {items}
        <a
          onClick={() => addField(namePrefix)}
          className="add-field-array"
          title="Add new list item"
        >
          <Icon name="plus" />
        </a>
      </div>
    );
  }
}

MetaArray.propTypes = {
  fieldKey: PropTypes.string.isRequired,
  fieldValue: PropTypes.any.isRequired,
  nameAttr: PropTypes.string.isRequired,
  namePrefix: PropTypes.string.isRequired,
  addField: PropTypes.func.isRequired,
  removeField: PropTypes.func.isRequired,
  updateFieldKey: PropTypes.func.isRequired,
  updateFieldValue: PropTypes.func.isRequired,
  convertField: PropTypes.func.isRequired,
  moveArrayItem: PropTypes.func.isRequired,
  key_prefix: PropTypes.string.isRequired,
};

export default MetaArray;
