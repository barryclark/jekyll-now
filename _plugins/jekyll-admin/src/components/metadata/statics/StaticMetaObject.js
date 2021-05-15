import React from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';
import StaticMetaObjectItem from './StaticMetaObjectItem';
import { computeFieldType } from '../../../utils/metadata';

export default function StaticMetaObject({ fieldValue }) {
  const items = _.map(fieldValue, (value, key) => {
    const type = computeFieldType(value);
    return (
      <StaticMetaObjectItem
        key={key}
        fieldKey={key}
        fieldValue={value}
        type={type}
      />
    );
  });

  return <div className="meta-value-object">{items}</div>;
}

StaticMetaObject.propTypes = {
  fieldValue: PropTypes.any.isRequired,
};
