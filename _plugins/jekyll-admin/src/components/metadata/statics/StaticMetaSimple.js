import React from 'react';
import PropTypes from 'prop-types';
import TextareaAutosize from 'react-textarea-autosize';

export default function StaticMetaSimple({ fieldValue }) {
  return (
    <div className="meta-value">
      <TextareaAutosize
        className="field value-field"
        value={`${fieldValue}`}
        disabled
      />
    </div>
  );
}

StaticMetaSimple.propTypes = {
  fieldValue: PropTypes.any.isRequired,
};
