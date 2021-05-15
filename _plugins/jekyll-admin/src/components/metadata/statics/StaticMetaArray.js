import React from 'react';
import PropTypes from 'prop-types';
import StaticMetaArrayItem from './StaticMetaArrayItem';
import { computeFieldType } from '../../../utils/metadata';

export default function StaticMetaArray({ fieldValue }) {
  const items = fieldValue.map((item, i) => {
    const type = computeFieldType(item);
    return (
      <StaticMetaArrayItem key={i} index={i} fieldValue={item} type={type} />
    );
  });
  return <div className="meta-value-array">{items}</div>;
}

StaticMetaArray.propTypes = {
  fieldValue: PropTypes.any.isRequired,
};
