import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class InputSearch extends Component {
  handleKeyPress = event => {
    const { search } = this.props;
    search(event.target.value);
  };

  render() {
    const { searchBy } = this.props;
    return (
      <input
        onKeyPress={this.handleKeyPress}
        type="text"
        className="field"
        placeholder={`Search by ${searchBy}`}
      />
    );
  }
}

InputSearch.propTypes = {
  search: PropTypes.func.isRequired,
  searchBy: PropTypes.string.isRequired,
};
