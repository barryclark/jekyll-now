import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Icon from './Icon';

import translations from '../translations';
const { labels } = translations;

const iconMap = {
  create: 'plus-square',
  delete: 'trash',
  publish: 'send-o',
  save: 'save',
  upload: 'upload',
  view: 'eye',
};

export default function Button({
  type,
  active,
  triggered,
  onClick,
  block,
  thin,
  icon,
  to,
}) {
  const btnClass = classnames('btn', {
    'btn-active': active,
    'btn-success': active && (type === 'save' || type === 'create'),
    'btn-delete': type === 'delete',
    'btn-view': type === 'view' || type === 'publish',
    'btn-inactive': !active,
    'btn-fat': block,
    'btn-thin': thin,
  });

  let label, triggeredLabel;
  switch (type) {
    case 'save':
    case 'create':
      label = labels[type].label;
      triggeredLabel = labels[type].triggeredLabel;
      break;
    case 'view-toggle':
      label = labels.viewToggle.label;
      triggeredLabel = labels.viewToggle.triggeredLabel;
      break;
    case 'view':
    case 'delete':
    case 'upload':
    case 'publish':
      label = labels[type].label;
      break;
    default:
      label = '<LABEL>';
      triggeredLabel = '<NEXT LABEL>';
  }

  const iconName = icon || iconMap[type];
  const iconNode = iconName && <Icon name={iconName} />;

  if (to) {
    return (
      <a href={to} target="_blank" rel="noopener noreferrer" className={btnClass}>
        {iconNode}
        {label}
      </a>
    );
  } else if (onClick) {
    return (
      <button onClick={onClick} className={btnClass}>
        {iconNode}
        {triggered ? triggeredLabel : label}
      </button>
    );
  }

  return null;
}

Button.propTypes = {
  type: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
  triggered: PropTypes.bool,
  block: PropTypes.bool,
  thin: PropTypes.bool,
  icon: PropTypes.string,
  to: PropTypes.string,
};
