import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { browserHistory, Link } from 'react-router';
import Breadcrumbs from './Breadcrumbs';
import Button from './Button';
import Icon from './Icon';
import InputSearch from './form/InputSearch';
import { ADMIN_PREFIX } from '../constants';

import translations from '../translations';
const { getDeleteMessage, getNotFoundMessage } = translations;

export default class Explorer extends Component {
  handleClickDelete(filename) {
    const { deleteItem, params, type } = this.props;
    const confirm = window.confirm(getDeleteMessage(filename));
    const dir = params.splat ? `/${params.splat}` : '';
    if (confirm) {
      deleteItem(params.splat, filename);
      browserHistory.push(`${ADMIN_PREFIX}/${type}${dir}`);
    }
  }

  renderTitleCell(name, icon, type, path) {
    return (
      <td className="row-title">
        <strong>
          <Link to={`${ADMIN_PREFIX}/${type}/${path}`}>
            <Icon name={icon} />
            {name}
          </Link>
        </strong>
      </td>
    );
  }

  renderDirectoryRow(directory, type, index) {
    const { name, relative_path } = directory;
    return (
      <tr key={index}>
        {this.renderTitleCell(name, 'folder', type, relative_path)}
        <td />
      </tr>
    );
  }

  renderFileRow(file, type, index) {
    const { name, relative_path, http_url } = file;
    return (
      <tr key={index}>
        {this.renderTitleCell(name, 'file-text-o', type, relative_path)}
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

  renderRows() {
    const { items, type } = this.props;
    return items.map((entry, index) =>
      entry.type === 'directory'
        ? this.renderDirectoryRow(entry, type, index)
        : this.renderFileRow(entry, type, index)
    );
  }

  render() {
    const { items, type, newBtnLabel, search, params } = this.props;
    const typeLabel = type === 'datafiles' ? 'data files' : type;

    const to = params.splat
      ? `${ADMIN_PREFIX}/${type}/${params.splat}/new`
      : `${ADMIN_PREFIX}/${type}/new`;

    const content = items.length ? (
      <div className="content-table">
        <table>
          <thead>
            <tr>
              <th>Filename</th>
              <th className="th-actions">Actions</th>
            </tr>
          </thead>
          <tbody>{this.renderRows()}</tbody>
        </table>
      </div>
    ) : (
      <h1>{getNotFoundMessage(typeLabel)}</h1>
    );

    return (
      <div>
        <div className="content-header">
          <Breadcrumbs type={type} splat={params.splat} />
          <div className="page-buttons">
            <Link className="btn btn-active" to={to}>
              {newBtnLabel}
            </Link>
          </div>
          <div className="pull-right">
            <InputSearch searchBy="filename" search={search} />
          </div>
        </div>
        {content}
      </div>
    );
  }
}

Explorer.propTypes = {
  type: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  params: PropTypes.object.isRequired,
  newBtnLabel: PropTypes.string.isRequired,
  deleteItem: PropTypes.func.isRequired,
  search: PropTypes.func.isRequired,
};
