import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { toTitleCase } from '../utils/helpers';
import { ADMIN_PREFIX } from '../constants';

export default function Breadcrumbs({ type, splat = '' }) {
  const nonCollectionTypes = ['pages', 'datafiles', 'drafts', 'staticfiles'];
  const base = nonCollectionTypes.includes(type)
    ? `${ADMIN_PREFIX}/${type}`
    : `${ADMIN_PREFIX}/collections/${type}`;

  let label = type;
  if (type === 'datafiles') {
    label = 'data files';
  } else if (type === 'staticfiles') {
    label = 'static files';
  }

  let nodes = [];
  if (splat) {
    const paths = splat.split('/');
    nodes = paths.map((path, i) => {
      const before = i === 0 ? '' : paths.slice(0, i).join('/') + '/';
      return (
        <li key={i}>
          <Link to={`${base}/${before}${path}`}>{path}</Link>
        </li>
      );
    });
  }

  return (
    <ul className="breadcrumbs">
      <li>
        <Link to={base}>{toTitleCase(label)}</Link>
      </li>
      {nodes}
    </ul>
  );
}

Breadcrumbs.propTypes = {
  type: PropTypes.string.isRequired,
  splat: PropTypes.string,
};
