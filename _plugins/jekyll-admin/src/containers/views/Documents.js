import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'underscore';
import moment from 'moment';
import DocumentTitle from 'react-document-title';
import InputSearch from '../../components/form/InputSearch';
import Breadcrumbs from '../../components/Breadcrumbs';
import Button from '../../components/Button';
import Icon from '../../components/Icon';
import {
  fetchCollection,
  deleteDocument,
  filterBySearchInput,
} from '../../ducks/collections';
import { search } from '../../ducks/utils';
import { getDocumentTitle } from '../../utils/helpers';
import { ADMIN_PREFIX } from '../../constants';

import translations from '../../translations';
const { getDeleteMessage, getNotFoundMessage } = translations;

export class Documents extends Component {
  componentDidMount() {
    const { fetchCollection, params } = this.props;
    fetchCollection(params.collection_name, params.splat);
  }

  componentWillReceiveProps(nextProps) {
    const { fetchCollection, params } = nextProps;
    // refetch the collection when navigating between collections or when splat is changed
    if (
      params.splat !== this.props.params.splat ||
      params.collection_name !== this.props.params.collection_name
    ) {
      fetchCollection(params.collection_name, params.splat);
    }
  }

  handleClickDelete(filename) {
    const { deleteDocument, params } = this.props;
    const confirm = window.confirm(getDeleteMessage(filename));
    confirm && deleteDocument(params.collection_name, params.splat, filename);
  }

  renderTable() {
    return (
      <div className="content-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Date</th>
              <th className="th-actions">Actions</th>
            </tr>
          </thead>
          <tbody>{this.renderRows()}</tbody>
        </table>
      </div>
    );
  }

  renderFileRow(doc) {
    const { id, name, title, http_url, collection, relative_path } = doc;
    const to = `${ADMIN_PREFIX}/collections/${collection}/${relative_path}`;
    // date w/o timezone
    let date = doc.date.substring(0, doc.date.lastIndexOf(' '));
    date =
      moment(date).format('hh:mm:ss') === '12:00:00'
        ? moment(date).format('ll')
        : moment(date).format('lll');

    return (
      <tr key={id}>
        <td className="row-title">
          <strong>
            <Link to={to}>
              <Icon name="file-text-o" />
              {title || name}
            </Link>
          </strong>
        </td>
        <td>{date}</td>
        <td>
          <div className="row-actions">
            <Button
              onClick={() => this.handleClickDelete(name)}
              type="delete"
              active
              thin
            />
            {http_url && <Button to={http_url} type="view" active thin />}
          </div>
        </td>
      </tr>
    );
  }

  renderDirectoryRow(directory) {
    const { params: { collection_name } } = this.props;
    const { name, relative_path, modified_time } = directory;
    const to = `${ADMIN_PREFIX}/collections/${collection_name}/${relative_path}`;
    // date w/o timezone
    let date = modified_time.substring(0, modified_time.lastIndexOf(' '));
    date = moment(date).format('ll');
    return (
      <tr key={name}>
        <td className="row-title">
          <strong>
            <Link to={to}>
              <Icon name="folder" />
              {name}
            </Link>
          </strong>
        </td>
        <td>{date}</td>
        <td />
      </tr>
    );
  }

  renderRows() {
    const { documents } = this.props;
    return _.map(documents, entry => {
      if (entry.type && entry.type === 'directory') {
        return this.renderDirectoryRow(entry);
      } else {
        return this.renderFileRow(entry);
      }
    });
  }

  render() {
    const { isFetching, documents, search, params } = this.props;
    const { collection_name } = params;

    if (isFetching) {
      return null;
    }

    const splat = params.splat || '';
    const to = params.splat
      ? `${ADMIN_PREFIX}/collections/${collection_name}/${splat}/new`
      : `${ADMIN_PREFIX}/collections/${collection_name}/new`;

    const document_title = getDocumentTitle(collection_name, params.splat);

    return (
      <DocumentTitle title={document_title}>
        <div>
          <div className="content-header">
            <Breadcrumbs type={collection_name} splat={splat} />
            <div className="page-buttons">
              <Link className="btn btn-active" to={to}>
                {collection_name === 'posts' ? 'New post' : 'New document'}
              </Link>
            </div>
            <div className="pull-right">
              <InputSearch searchBy="title" search={search} />
            </div>
          </div>
          {documents.length > 0 && this.renderTable()}
          {!documents.length && <h1>{getNotFoundMessage('documents')}</h1>}
        </div>
      </DocumentTitle>
    );
  }
}

Documents.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  documents: PropTypes.array.isRequired,
  fetchCollection: PropTypes.func.isRequired,
  deleteDocument: PropTypes.func.isRequired,
  search: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  documents: filterBySearchInput(state.collections.entries, state.utils.input),
  isFetching: state.collections.isFetching,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchCollection,
      deleteDocument,
      search,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Documents);
