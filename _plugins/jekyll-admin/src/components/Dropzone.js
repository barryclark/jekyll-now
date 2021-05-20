import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';
import ReactDropzone from 'react-dropzone';
import FilePreview from './FilePreview';
import Splitter from './Splitter';
import Icon from './Icon';

export class Dropzone extends Component {
  openDropzone() {
    this.refs.ReactDropzone.open();
  }

  render() {
    const { files, splat, onDrop, onClickDelete, onClickItem } = this.props;
    return (
      <ReactDropzone
        onDrop={onDrop}
        ref="ReactDropzone"
        className="dropzone"
        activeClassName="dropzone-active"
        multiple
        disableClick
      >
        {files.length ? (
          <div className="preview-container">
            {_.map(files, (file, i) => (
              <FilePreview
                key={i}
                onClick={onClickItem}
                onClickDelete={onClickDelete}
                splat={splat}
                file={file}
              />
            ))}
            <Splitter />
            <div className="preview-tip">
              <div>Drag and drop file(s) here to upload</div>
            </div>
          </div>
        ) : (
          <div className="preview-info">
            <Icon name="upload" />
            <p>Drag and drop file(s) here to upload</p>
          </div>
        )}
      </ReactDropzone>
    );
  }
}

Dropzone.propTypes = {
  files: PropTypes.array.isRequired,
  splat: PropTypes.string.isRequired,
  onDrop: PropTypes.func.isRequired,
  onClickDelete: PropTypes.func.isRequired,
  onClickItem: PropTypes.func,
};

export default Dropzone;
