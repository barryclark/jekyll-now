import React from 'react';
import PropTypes from 'prop-types';
import Splitter from './Splitter';
import InputPath from './form/InputPath';
import InputTitle from './form/InputTitle';
import MarkdownEditor from './MarkdownEditor';
import Metadata from '../containers/MetaFields';

export default function MarkdownPageBody({
  type,
  path,
  body,
  title,
  onSave,
  updateTitle,
  updatePath,
  updateBody,
  metafields,
  staticmetafields,
}) {
  return (
    <div className="content-body">
      <InputPath onChange={updatePath} type={type} path={path} />
      <InputTitle onChange={updateTitle} title={title} />
      <MarkdownEditor
        onChange={updateBody}
        onSave={onSave}
        placeholder="Body"
        initialValue={body}
      />
      <Splitter />
      <Metadata fields={metafields} staticFields={staticmetafields} />
    </div>
  );
}

MarkdownPageBody.defaultProps = {
  path: '',
  body: '',
  title: '',
  metafields: {},
  staticmetafields: {},
};

MarkdownPageBody.propTypes = {
  updateBody: PropTypes.func.isRequired,
  updatePath: PropTypes.func.isRequired,
  updateTitle: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  path: PropTypes.string,
  body: PropTypes.string,
  title: PropTypes.string,
  metafields: PropTypes.object,
  staticmetafields: PropTypes.object,
};
