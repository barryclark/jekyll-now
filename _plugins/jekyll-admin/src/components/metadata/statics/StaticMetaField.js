import React from 'react';
import PropTypes from 'prop-types';
import StaticMetaArray from './StaticMetaArray';
import StaticMetaObject from './StaticMetaObject';
import StaticMetaSimple from './StaticMetaSimple';
import StaticMetaButton from '../StaticMetaButton';

const FieldTypes = {
  array: StaticMetaArray,
  object: StaticMetaObject,
  simple: StaticMetaSimple,
};

export default function StaticMetaField({
  type,
  fieldKey,
  fieldValue,
  enableField,
}) {
  const CurrentComponent = FieldTypes[type];

  return (
    <div className="metafield  default-field">
      <div className={`meta-key ${type}`}>
        <input
          value={fieldKey}
          className="field key-field"
          type="text"
          disabled
        />
        <StaticMetaButton
          onEnableField={() => {
            enableField(`metadata['${fieldKey}']`, fieldValue);
          }}
        />
      </div>
      <CurrentComponent fieldValue={fieldValue} />
    </div>
  );
}

StaticMetaField.propTypes = {
  type: PropTypes.string.isRequired,
  fieldKey: PropTypes.string.isRequired,
  fieldValue: PropTypes.any.isRequired,
  enableField: PropTypes.func.isRequired,
};
