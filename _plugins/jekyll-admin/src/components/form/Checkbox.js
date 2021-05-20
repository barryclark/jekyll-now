import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Checkbox extends Component {
  handleChange = e => {
    const { onChange } = this.props;
    onChange(e.target.checked);
  };

  render() {
    const { text, checked } = this.props;
    return (
      <div className="checkbox-container">
        {text}
        <label className="switch">
          <input
            onChange={this.handleChange}
            type="checkbox"
            defaultChecked={checked}
            ref="checkbox"
          />
          <div className="slider round" />
        </label>
      </div>
    );
  }
}

Checkbox.propTypes = {
  text: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};
