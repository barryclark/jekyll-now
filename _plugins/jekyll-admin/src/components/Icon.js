import React from 'react';
import PropTypes from 'prop-types';

export default function Icon({ name }) {
  return <i className={`fa fa-${name}`} aria-hidden="true" />;
}

Icon.propTypes = {
  name: PropTypes.string.isRequired,
};
