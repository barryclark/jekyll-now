import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { HotKeys } from 'react-hotkeys';
import DocumentTitle from 'react-document-title';
import DataGUI from '../../components/DataGUI';
import Editor from '../../components/Editor';
import Errors from '../../components/Errors';
import Button from '../../components/Button';
import { putConfig, onEditorChange } from '../../ducks/config';
import { clearErrors } from '../../ducks/utils';
import { preventDefault } from '../../utils/helpers';

import translations from '../../translations';
const { getLeaveMessage } = translations;

export class Configuration extends Component {
  state = {
    guiView: false,
  };

  componentDidMount() {
    const { router, route } = this.props;
    router.setRouteLeaveHook(route, this.routerWillLeave);
  }

  componentWillUnmount() {
    const { clearErrors, errors } = this.props;
    errors.length && clearErrors();
  }

  routerWillLeave = nextLocation => {
    const { editorChanged, fieldChanged } = this.props;
    if (editorChanged || fieldChanged) {
      return getLeaveMessage();
    }
  };

  toggleView = () => {
    this.setState(state => {
      return { guiView: !state.guiView };
    });
  };

  handleClickSave = e => {
    preventDefault(e);
    const { editorChanged, fieldChanged, putConfig } = this.props;
    if (editorChanged) {
      const value = this.refs.editor.getValue();
      putConfig(value);
    } else if (fieldChanged) {
      putConfig(null, 'gui');
    }
  };

  renderContentBody() {
    const { config, editorChanged, onEditorChange } = this.props;
    const { raw_content, content } = config;

    if (this.state.guiView && content) {
      return <DataGUI fields={content} onChange={onEditorChange} restricted />;
    }

    return (
      <Editor
        editorChanged={editorChanged}
        onEditorChange={onEditorChange}
        content={raw_content}
        ref="editor"
      />
    );
  }

  render() {
    const { editorChanged, fieldChanged, updated, errors } = this.props;

    const keyboardHandlers = {
      save: this.handleClickSave,
    };

    return (
      <DocumentTitle title="Configuration">
        <HotKeys handlers={keyboardHandlers} className="single">
          {errors && errors.length > 0 && <Errors errors={errors} />}
          <div className="content-header">
            <h1>Configuration</h1>
            <div className="page-buttons multiple">
              <Button
                onClick={this.toggleView}
                type="view-toggle"
                triggered={this.state.guiView}
                active
                block
              />
              <Button
                onClick={this.handleClickSave}
                type="save"
                active={editorChanged || fieldChanged}
                triggered={updated}
                block
              />
            </div>
          </div>
          <div className="content-body">{this.renderContentBody()}</div>
        </HotKeys>
      </DocumentTitle>
    );
  }
}

Configuration.propTypes = {
  config: PropTypes.object.isRequired,
  onEditorChange: PropTypes.func.isRequired,
  putConfig: PropTypes.func.isRequired,
  updated: PropTypes.bool.isRequired,
  editorChanged: PropTypes.bool.isRequired,
  fieldChanged: PropTypes.bool.isRequired,
  errors: PropTypes.array.isRequired,
  clearErrors: PropTypes.func.isRequired,
  router: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  config: state.config.config,
  updated: state.config.updated,
  editorChanged: state.config.editorChanged,
  fieldChanged: state.metadata.fieldChanged,
  errors: state.utils.errors,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ putConfig, onEditorChange, clearErrors }, dispatch);

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Configuration)
);
