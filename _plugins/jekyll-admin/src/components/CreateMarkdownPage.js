import React from 'react';
import PropTypes from 'prop-types';
import { HotKeys } from 'react-hotkeys';
import Button from './Button';
import Errors from './Errors';
import Breadcrumbs from './Breadcrumbs';
import MarkdownPageBody from './MarkdownPageBody';
import { injectDefaultFields as defaultFields } from '../utils/metadata';

export default function CreateMarkdownPage({
  type,
  config,
  errors,
  updated,
  updateBody,
  updatePath,
  updateTitle,
  fieldChanged,
  onClickSave,
  params: { splat },
}) {
  const metaType = type === 'drafts' ? 'posts' : type;

  return (
    <HotKeys handlers={{ save: onClickSave }}>
      {errors.length > 0 && <Errors errors={errors} />}

      <div className="content-header">
        <Breadcrumbs type={type} splat={splat} />
      </div>

      <div className="content-wrapper">
        <MarkdownPageBody
          type={type}
          updatePath={updatePath}
          updateTitle={updateTitle}
          updateBody={updateBody}
          onSave={onClickSave}
          staticmetafields={defaultFields(config, splat, metaType)}
        />
        <div className="content-side">
          <Button
            onClick={onClickSave}
            type="create"
            active={fieldChanged}
            triggered={updated}
            block
          />
        </div>
      </div>
    </HotKeys>
  );
}

CreateMarkdownPage.propTypes = {
  type: PropTypes.string.isRequired,
  config: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  errors: PropTypes.array.isRequired,
  updated: PropTypes.bool.isRequired,
  fieldChanged: PropTypes.bool.isRequired,
  updateBody: PropTypes.func.isRequired,
  updatePath: PropTypes.func.isRequired,
  updateTitle: PropTypes.func.isRequired,
  onClickSave: PropTypes.func.isRequired,
};
