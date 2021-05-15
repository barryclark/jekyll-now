import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DocumentTitle from 'react-document-title';
import Dropzone from '../../components/Dropzone';
import Button from '../../components/Button';
import Icon from '../../components/Icon';
import Breadcrumbs from '../../components/Breadcrumbs';
import InputSearch from '../../components/form/InputSearch';
import { search } from '../../ducks/utils';
import {
  existingUploadedFilenames,
  getDocumentTitle,
} from '../../utils/helpers';
import {
  fetchStaticFiles,
  uploadStaticFiles,
  deleteStaticFile,
  filterByFilename,
} from '../../ducks/staticfiles';
import { ADMIN_PREFIX } from '../../constants';

import translations from '../../translations';
const { getOverrideMessage } = translations;

export class StaticFiles extends Component {
  componentDidMount() {
    const { fetchStaticFiles, params } = this.props;
    fetchStaticFiles(params.splat);
  }

  componentWillReceiveProps(nextProps) {
    const { fetchStaticFiles } = nextProps;
    if (this.props.params.splat !== nextProps.params.splat) {
      fetchStaticFiles(nextProps.params.splat);
    }
  }

  onDrop(uploadedFiles) {
    const { uploadStaticFiles, files, params } = this.props;
    const existingFiles = existingUploadedFilenames(uploadedFiles, files);
    if (existingFiles.length > 0) {
      const confirm = window.confirm(
        getOverrideMessage(existingFiles.join(', '))
      );
      if (!confirm) {
        return false;
      }
    }
    uploadStaticFiles(params.splat, uploadedFiles);
  }

  openDropzone = () => {
    this.refs.dropzone.openDropzone();
  };

  renderFilePreviewRow(static_files, key) {
    const { params, onClickStaticFile, deleteStaticFile } = this.props;
    return (
      <tr key={key}>
        <td>
          <Dropzone
            ref="dropzone"
            splat={params.splat || ''}
            files={static_files}
            onClickItem={onClickStaticFile}
            onClickDelete={deleteStaticFile}
            onDrop={static_files => this.onDrop(static_files)}
          />
        </td>
      </tr>
    );
  }

  renderDirectoryRow(directory, index) {
    const { name, path } = directory;
    const to = `${ADMIN_PREFIX}/staticfiles/${path}`;
    return (
      <tr key={index}>
        <td className="row-title">
          <strong>
            <Link to={to}>
              <Icon name="folder" />
              {name}
            </Link>
          </strong>
        </td>
      </tr>
    );
  }

  renderRows() {
    const { files } = this.props;
    const dirs = files.filter(entity => entity.type === 'directory');
    const static_files = files.filter(entity => !entity.type);

    return dirs
      .map((entry, index) => this.renderDirectoryRow(entry, index))
      .concat(this.renderFilePreviewRow(static_files, dirs.length + 1));
  }

  renderTable() {
    return (
      <div className="content-table">
        <table>
          <thead>
            <tr>
              <th>Directory Contents</th>
            </tr>
          </thead>
          <tbody>{this.renderRows()}</tbody>
        </table>
      </div>
    );
  }

  render() {
    const { isFetching, params, search } = this.props;

    if (isFetching) {
      return null;
    }

    const to = `${ADMIN_PREFIX}/staticfiles/index`;
    const title = getDocumentTitle('static files', params.splat);

    return (
      <DocumentTitle title={title}>
        <div>
          <div className="content-header">
            <Breadcrumbs type="staticfiles" splat={params.splat} />
            <div className="page-buttons multiple">
              <Link className="btn btn-view" to={to}>
                Index Listing
              </Link>
              <Button
                onClick={() => this.openDropzone()}
                type="upload"
                active
              />
            </div>
            <div className="pull-right">
              <InputSearch searchBy="filename" search={search} />
            </div>
          </div>
          {this.renderTable()}
        </div>
      </DocumentTitle>
    );
  }
}

StaticFiles.propTypes = {
  files: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  fetchStaticFiles: PropTypes.func.isRequired,
  uploadStaticFiles: PropTypes.func.isRequired,
  deleteStaticFile: PropTypes.func.isRequired,
  onClickStaticFile: PropTypes.func,
  search: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  files: filterByFilename(state.staticfiles.files, state.utils.input),
  isFetching: state.staticfiles.isFetching,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchStaticFiles,
      uploadStaticFiles,
      deleteStaticFile,
      search,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(StaticFiles);
