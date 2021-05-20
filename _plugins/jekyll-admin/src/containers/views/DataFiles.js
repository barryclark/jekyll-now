import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DocumentTitle from 'react-document-title';
import Explorer from '../../components/Explorer';
import { search, filterBySearchInput } from '../../ducks/utils';
import { fetchDataFiles, deleteDataFile } from '../../ducks/datafiles';
import { getDocumentTitle } from '../../utils/helpers';

export class DataFiles extends Component {
  componentDidMount() {
    const { fetchDataFiles, params } = this.props;
    fetchDataFiles(params.splat);
  }

  componentWillReceiveProps(nextProps) {
    const { fetchDataFiles } = nextProps;
    if (this.props.params.splat !== nextProps.params.splat) {
      fetchDataFiles(nextProps.params.splat);
    }
  }

  render() {
    const { isFetching, files, search, params, deleteDataFile } = this.props;

    if (isFetching) {
      return null;
    }

    const title = getDocumentTitle('data files', params.splat);

    return (
      <DocumentTitle title={title}>
        <Explorer
          type="datafiles"
          items={files}
          params={params}
          newBtnLabel="New data file"
          search={search}
          deleteItem={deleteDataFile}
        />
      </DocumentTitle>
    );
  }
}

DataFiles.propTypes = {
  files: PropTypes.array.isRequired,
  fetchDataFiles: PropTypes.func.isRequired,
  deleteDataFile: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  search: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  files: filterBySearchInput(state.datafiles.files, state.utils.input),
  isFetching: state.datafiles.isFetching,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchDataFiles,
      deleteDataFile,
      search,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(DataFiles);
