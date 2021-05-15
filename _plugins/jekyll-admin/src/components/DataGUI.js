import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MetaFields from '../containers/MetaFields';

class DataGUI extends Component {
  handleChange = e => this.props.onChange(e.target.value);

  renderPathFields(slug, ext) {
    return (
      <form className="datafile-path">
        <fieldset className="filename">
          <legend>Path (without extension)</legend>
          <input
            type="text"
            id="path"
            defaultValue={slug}
            placeholder="filename"
            onChange={this.handleChange}
            ref="filepath"
          />
        </fieldset>
        <fieldset className="file-type">
          <legend>File Type</legend>
          <select
            id="extn"
            defaultValue={ext}
            onChange={this.handleChange}
            ref="extname"
          >
            <option value=".yml">YAML</option>
            <option value=".json">JSON</option>
          </select>
        </fieldset>
      </form>
    );
  }

  render() {
    const { fields, slug, ext, restricted } = this.props;
    return (
      <div>
        <div className="warning">
          CAUTION! Any existing comments will be lost when editing via this
          view. Switch to the <strong>Raw Editor</strong> to preserve them.
        </div>
        {!restricted && this.renderPathFields(slug, ext)}
        <MetaFields fields={fields} dataview />
      </div>
    );
  }
}

DataGUI.defaultProps = {
  fields: {},
  slug: '',
  ext: '',
  restricted: false,
};

DataGUI.propTypes = {
  onChange: PropTypes.func.isRequired,
  fields: PropTypes.object,
  slug: PropTypes.string,
  ext: PropTypes.string,
  restricted: PropTypes.bool,
};

export default DataGUI;
