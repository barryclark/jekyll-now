import React from 'react';
import PropTypes from 'prop-types';
import StaticMetaArray from './StaticMetaArray';
import StaticMetaObject from './StaticMetaObject';
import StaticMetaSimple from './StaticMetaSimple';

const FieldTypes = {
  array: StaticMetaArray,
  object: StaticMetaObject,
  simple: StaticMetaSimple,
};

export default function StaticMetaObjectItem({ type, fieldKey, fieldValue }) {
  const CurrentComponent = FieldTypes[type];

  return (
    <div className="object-item-wrap">
      <div className={`object-key ${type}`}>
        <input
          value={fieldKey}
          className="field key-field"
          type="text"
          disabled
        />
      </div>
      <div className="object-value">
        <CurrentComponent fieldValue={fieldValue} />
      </div>
    </div>
  );
}

StaticMetaObjectItem.propTypes = {
  type: PropTypes.string.isRequired,
  fieldKey: PropTypes.string.isRequired,
  fieldValue: PropTypes.any.isRequired,
};
