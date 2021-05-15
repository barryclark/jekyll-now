import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Icon from '../Icon';

export default class MetaButtons extends Component {
  state = {
    dropdown: false,
  };

  fieldTypes = {
    simple: {
      icon: 'pencil',
      label: 'Simple',
    },
    array: {
      icon: 'list-ol',
      label: 'List',
    },
    object: {
      icon: 'th-large',
      label: 'Object',
    },
  };

  fieldTypeKeys = Object.keys(this.fieldTypes);

  toggleDropdownState = () => {
    this.setState(state => {
      return { dropdown: !state.dropdown };
    });
  };

  renderDropdownItems(type) {
    const { onConvertClick, parentKey } = this.props;

    if (parentKey === 'tags') return null;

    return this.fieldTypeKeys
      .map((ftype, i) => {
        if (type !== ftype) {
          const { icon, label } = this.fieldTypes[ftype];
          return (
            <span key={i} onMouseDown={() => onConvertClick(ftype)}>
              <Icon name={icon} />
              Convert to {label}
            </span>
          );
        }

        return null;
      })
      .filter(Boolean);
  }

  render() {
    const {
      currentType,
      parentType,
      onRemoveClick,
      isDefaultField,
    } = this.props;
    const sortableHandle = (
      <span className="move">
        <Icon name="arrows" />
      </span>
    );

    const dropdownClasses = classnames('dropdown', {
      'showing-dropdown': this.state.dropdown,
    });

    return (
      <div className="meta-buttons">
        {parentType === 'array' && sortableHandle}
        <span className={dropdownClasses}>
          <a
            className="meta-button"
            tabIndex="1"
            onClick={this.toggleDropdownState}
            onBlur={() => this.setState({ dropdown: false })}
          >
            <Icon name="chevron-down" />
          </a>
          <div className="dropdown-wrap">
            {this.renderDropdownItems(currentType)}
            <span onMouseDown={() => onRemoveClick()} className="remove-field">
              <Icon name={isDefaultField ? 'undo' : 'trash-o'} />
              {isDefaultField ? 'Revert to default' : 'Remove field'}
            </span>
          </div>
        </span>
      </div>
    );
  }
}

MetaButtons.propTypes = {
  currentType: PropTypes.string.isRequired,
  parentType: PropTypes.string.isRequired,
  onConvertClick: PropTypes.func.isRequired,
  onRemoveClick: PropTypes.func.isRequired,
  parentKey: PropTypes.string,
  isDefaultField: PropTypes.bool,
};
