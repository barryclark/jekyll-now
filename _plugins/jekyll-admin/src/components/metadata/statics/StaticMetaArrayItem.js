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

export default function StaticMetaArrayItem({ type, fieldValue, index }) {
  const CurrentComponent = FieldTypes[type];

  return (
    <div className="array-item-wrap">
      <div className="array">
        <div className="array-header">
          <span className="array-field-num">{index + 1}.</span>
        </div>
        <CurrentComponent fieldValue={fieldValue} />
      </div>
    </div>
  );
}

StaticMetaArrayItem.propTypes = {
  type: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  fieldValue: PropTypes.any.isRequired,
};
