import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory, withRouter } from 'react-router';
import _ from 'underscore';
import { HotKeys } from 'react-hotkeys';
import DocumentTitle from 'react-document-title';
import DataGUI from '../../components/DataGUI';
import Breadcrumbs from '../../components/Breadcrumbs';
import InputPath from '../../components/form/InputPath';
import Splitter from '../../components/Splitter';
import Errors from '../../components/Errors';
import Editor from '../../components/Editor';
import Button from '../../components/Button';
import { clearErrors } from '../../ducks/utils';
import {
  getFilenameFromPath,
  getExtensionFromPath,
  preventDefault,
  getDocumentTitle,
} from '../../utils/helpers';
import {
  fetchDataFile,
  putDataFile,
  deleteDataFile,
  onDataFileChanged,
} from '../../ducks/datafiles';
import { ADMIN_PREFIX } from '../../constants';

import translations from '../../translations';
const { getLeaveMessage, getDeleteMessage, getNotFoundMessage } = translations;

export class DataFileEdit extends Component {
  state = {
    guiView: false,
  };

  componentDidMount() {
    const { fetchDataFile, params, router, route } = this.props;
    const [directory, ...rest] = params.splat;
    const filename = rest.join('.');
    router.setRouteLeaveHook(route, this.routerWillLeave);
    fetchDataFile(directory, filename);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.updated !== nextProps.updated) {
      const new_path = nextProps.datafile.path;
      const path = this.props.datafile.path;

      // redirect if the path is changed
      if (new_path !== path) {
        browserHistory.push(
          `${ADMIN_PREFIX}/datafiles/${nextProps.datafile.relative_path}`
        );
      }
    }
  }

  componentWillUnmount() {
    const { clearErrors, errors } = this.props;
    errors.length && clearErrors();
  }

  routerWillLeave = nextLocation => {
    const { datafileChanged, fieldChanged } = this.props;
    if (datafileChanged || fieldChanged) {
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
    const {
      datafile,
      datafileChanged,
      fieldChanged,
      putDataFile,
      params,
    } = this.props;
    const { path, relative_path } = datafile;
    const data_dir = path.replace(relative_path, '');

    let name, data, mode;
    const [directory, ...rest] = params.splat;
    const filename = rest.join('.');
    if (datafileChanged || fieldChanged) {
      if (this.state.guiView) {
        const { filepath, extname } = this.refs.gui.refs;
        name = filepath.value + extname.value;
        data = null;
        mode = 'gui';
      } else {
        const { input } = this.refs.inputpath.refs;
        name = input.value || input.props.defaultValue;
        data = this.refs.editor.getValue();
        mode = 'editor';
      }

      const data_path = directory
        ? data_dir + `${directory}/` + name
        : data_dir + name;

      const new_path = data_path !== path ? data_path : '';
      putDataFile(directory, filename, data, new_path, mode);
    }
  };

  handleClickDelete(path) {
    const { deleteDataFile, params } = this.props;
    const confirm = window.confirm(getDeleteMessage(path));

    if (confirm) {
      const directory = params.splat[0];
      const filename = getFilenameFromPath(path);
      deleteDataFile(directory, filename);
      const dir = directory ? `/${directory}` : '';
      browserHistory.push(`${ADMIN_PREFIX}/datafiles${dir}`);
    }
  }

  renderAside() {
    const { datafile, datafileChanged, fieldChanged, updated } = this.props;
    const { path } = datafile;
    const filename = getFilenameFromPath(path);
    const ext = getExtensionFromPath(path);
    const guiSupport = /ya?ml|json/i.test(ext);

    return (
      <div className="content-side">
        <Button
          onClick={this.handleClickSave}
          type="save"
          active={datafileChanged || fieldChanged}
          triggered={updated}
          block
        />
        {guiSupport && (
          <Button
            onClick={this.toggleView}
            type="view-toggle"
            triggered={this.state.guiView}
            active
            block
          />
        )}
        <Splitter />
        <Button
          onClick={() => this.handleClickDelete(filename)}
          type="delete"
          active
          block
        />
      </div>
    );
  }

  renderContentBody(filename) {
    const { datafile, datafileChanged, onDataFileChanged } = this.props;
    const { raw_content, content, slug, ext } = datafile;
    const { guiView } = this.state;

    if (guiView && content) {
      return (
        <div className="content-body">
          <DataGUI
            fields={content}
            slug={slug}
            ext={ext}
            onChange={onDataFileChanged}
            ref="gui"
          />
        </div>
      );
    } else if (!guiView && raw_content) {
      return (
        <div className="content-body">
          <InputPath
            onChange={onDataFileChanged}
            type="data files"
            path={filename}
            ref="inputpath"
          />
          <Editor
            editorChanged={datafileChanged}
            onEditorChange={onDataFileChanged}
            content={raw_content}
            type={ext}
            ref="editor"
          />
        </div>
      );
    }
  }

  render() {
    const { datafile, isFetching, params, errors } = this.props;

    if (isFetching) {
      return null;
    }

    if (_.isEmpty(datafile.content)) {
      return <h1>{getNotFoundMessage('content')}</h1>;
    }

    const directory = params.splat[0];
    const filename = getFilenameFromPath(datafile.path);

    const keyboardHandlers = {
      save: this.handleClickSave,
    };

    const document_title = getDocumentTitle('data files', directory, filename);

    return (
      <DocumentTitle title={document_title}>
        <HotKeys handlers={keyboardHandlers} className="single">
          {errors.length > 0 && <Errors errors={errors} />}

          <div className="content-header">
            <Breadcrumbs type="datafiles" splat={directory} />
          </div>

          <div className="content-wrapper">
            {this.renderContentBody(filename)}
            {this.renderAside()}
          </div>
        </HotKeys>
      </DocumentTitle>
    );
  }
}

DataFileEdit.propTypes = {
  fetchDataFile: PropTypes.func.isRequired,
  putDataFile: PropTypes.func.isRequired,
  deleteDataFile: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  datafile: PropTypes.object.isRequired,
  onDataFileChanged: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  updated: PropTypes.bool.isRequired,
  datafileChanged: PropTypes.bool.isRequired,
  fieldChanged: PropTypes.bool.isRequired,
  errors: PropTypes.array.isRequired,
  params: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  datafile: state.datafiles.currentFile,
  isFetching: state.datafiles.isFetching,
  updated: state.datafiles.updated,
  datafileChanged: state.datafiles.datafileChanged,
  fieldChanged: state.metadata.fieldChanged,
  errors: state.utils.errors,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchDataFile,
      putDataFile,
      deleteDataFile,
      onDataFileChanged,
      clearErrors,
    },
    dispatch
  );

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DataFileEdit)
);
