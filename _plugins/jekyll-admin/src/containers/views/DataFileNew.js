import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory, withRouter } from 'react-router';
import { HotKeys } from 'react-hotkeys';
import DocumentTitle from 'react-document-title';
import DataGUI from '../../components/DataGUI';
import Errors from '../../components/Errors';
import Editor from '../../components/Editor';
import Button from '../../components/Button';
import Breadcrumbs from '../../components/Breadcrumbs';
import InputPath from '../../components/form/InputPath';
import { clearErrors } from '../../ducks/utils';
import { putDataFile, onDataFileChanged } from '../../ducks/datafiles';
import { preventDefault, getDocumentTitle } from '../../utils/helpers';
import { ADMIN_PREFIX } from '../../constants';

import translations from '../../translations';
const { getLeaveMessage } = translations;

export class DataFileNew extends Component {
  state = {
    guiView: false,
  };

  componentDidMount() {
    const { router, route } = this.props;
    router.setRouteLeaveHook(route, this.routerWillLeave);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.updated !== nextProps.updated) {
      browserHistory.push(
        `${ADMIN_PREFIX}/datafiles/${nextProps.datafile.relative_path}`
      );
    }
  }

  componentWillUnmount() {
    const { clearErrors, errors } = this.props;
    errors.length && clearErrors();
  }

  routerWillLeave = nextLocation => {
    if (!this.state.guiView && this.props.datafileChanged) {
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
    const { datafileChanged, fieldChanged, putDataFile, params } = this.props;
    let filename;

    if (datafileChanged || fieldChanged) {
      if (this.state.guiView) {
        const { filepath, extname } = this.refs.gui.refs;
        filename = filepath.value + extname.value;
        putDataFile(params.splat, filename, null, null, 'gui');
      } else {
        filename = this.refs.inputpath.refs.input.value;
        putDataFile(params.splat, filename, this.refs.editor.getValue());
      }
    }
  };

  renderAside() {
    const { datafileChanged, fieldChanged, updated } = this.props;

    return (
      <div className="content-side">
        <Button
          onClick={this.handleClickSave}
          type="create"
          active={datafileChanged || fieldChanged}
          triggered={updated}
          block
        />
        <Button
          onClick={this.toggleView}
          type="view-toggle"
          triggered={this.state.guiView}
          active
          block
        />
      </div>
    );
  }

  renderContentBody() {
    const { datafileChanged, onDataFileChanged } = this.props;

    if (this.state.guiView) {
      return (
        <div className="content-body">
          <DataGUI onChange={onDataFileChanged} ref="gui" />
        </div>
      );
    }

    return (
      <div className="content-body">
        <InputPath
          onChange={onDataFileChanged}
          type="data files"
          path=""
          ref="inputpath"
        />
        <Editor
          editorChanged={datafileChanged}
          onEditorChange={onDataFileChanged}
          content=""
          ref="editor"
        />
      </div>
    );
  }

  render() {
    const { errors, params } = this.props;

    const keyboardHandlers = {
      save: this.handleClickSave,
    };

    const title = getDocumentTitle('data files', params.splat, 'New data file');

    return (
      <DocumentTitle title={title}>
        <HotKeys handlers={keyboardHandlers}>
          {errors.length > 0 && <Errors errors={errors} />}

          <div className="content-header">
            <Breadcrumbs type="datafiles" splat={params.splat} />
          </div>

          <div className="content-wrapper">
            {this.renderContentBody()}
            {this.renderAside()}
          </div>
        </HotKeys>
      </DocumentTitle>
    );
  }
}

DataFileNew.propTypes = {
  putDataFile: PropTypes.func.isRequired,
  datafile: PropTypes.object.isRequired,
  onDataFileChanged: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  errors: PropTypes.array.isRequired,
  updated: PropTypes.bool.isRequired,
  datafileChanged: PropTypes.bool.isRequired,
  router: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  fieldChanged: PropTypes.bool,
};

const mapStateToProps = state => ({
  datafile: state.datafiles.currentFile,
  updated: state.datafiles.updated,
  datafileChanged: state.datafiles.datafileChanged,
  fieldChanged: state.metadata.fieldChanged,
  errors: state.utils.errors,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      putDataFile,
      onDataFileChanged,
      clearErrors,
    },
    dispatch
  );

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DataFileNew)
);
