import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon';
import classnames from 'classnames';

export default class StaticMetaButton extends Component {
  state = {
    dropdown: false,
  };

  toggleDropdownState = () => {
    this.setState(state => ({ dropdown: !state.dropdown }));
  };

  render() {
    const { onEnableField } = this.props;

    const dropdownClasses = classnames('dropdown', {
      'showing-dropdown': this.state.dropdown,
    });

    return (
      <div className="meta-buttons">
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
            <span onMouseDown={() => onEnableField()}>
              <Icon name="pencil" /> Override default
            </span>
          </div>
        </span>
      </div>
    );
  }
}

StaticMetaButton.propTypes = {
  onEnableField: PropTypes.func.isRequired,
};
