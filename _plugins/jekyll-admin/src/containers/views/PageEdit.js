import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory, withRouter } from 'react-router';
import { HotKeys } from 'react-hotkeys';
import _ from 'underscore';
import DocumentTitle from 'react-document-title';
import Button from '../../components/Button';
import Errors from '../../components/Errors';
import Splitter from '../../components/Splitter';
import Breadcrumbs from '../../components/Breadcrumbs';
import MarkdownPageBody from '../../components/MarkdownPageBody';
import { fetchPage, deletePage, putPage } from '../../ducks/pages';
import { updateTitle, updateBody, updatePath } from '../../ducks/metadata';
import { clearErrors } from '../../ducks/utils';
import { preventDefault, getDocumentTitle } from '../../utils/helpers';
import { ADMIN_PREFIX } from '../../constants';

import translations from '../../translations';
const { getLeaveMessage, getDeleteMessage } = translations;

export class PageEdit extends Component {
  componentDidMount() {
    const { fetchPage, params, router, route } = this.props;
    const [directory, ...rest] = params.splat;
    const filename = rest.join('.');
    fetchPage(directory, filename);

    router.setRouteLeaveHook(route, this.routerWillLeave);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.updated !== nextProps.updated) {
      const new_path = nextProps.page.path;
      const path = this.props.page.path;
      // redirect if the path is changed
      if (new_path !== path) {
        browserHistory.push(`${ADMIN_PREFIX}/pages/${new_path}`);
      }
    }
  }

  componentWillUnmount() {
    const { clearErrors, errors } = this.props;
    errors.length && clearErrors();
  }

  routerWillLeave = nextLocation => {
    if (this.props.fieldChanged) {
      return getLeaveMessage();
    }
  };

  handleClickSave = e => {
    preventDefault(e);
    const { putPage, fieldChanged, params } = this.props;
    if (fieldChanged) {
      const [directory, ...rest] = params.splat;
      const filename = rest.join('.');
      putPage(directory, filename);
    }
  };

  handleClickDelete(name) {
    const { deletePage, params } = this.props;
    const confirm = window.confirm(getDeleteMessage(name));
    if (confirm) {
      const [directory, ...rest] = params.splat;
      const filename = rest.join('.');
      deletePage(directory, filename);
      browserHistory.push(`${ADMIN_PREFIX}/pages/${directory || ''}`);
    }
  }

  render() {
    const {
      isFetching,
      page,
      errors,
      updateTitle,
      updateBody,
      updatePath,
      updated,
      fieldChanged,
      params,
    } = this.props;

    if (isFetching) {
      return null;
    }

    if (_.isEmpty(page)) {
      return <h1>{`Could not find the page.`}</h1>;
    }

    const keyboardHandlers = {
      save: this.handleClickSave,
    };

    const {
      name,
      raw_content,
      http_url,
      front_matter,
      front_matter_defaults,
    } = page;
    const directory = params.splat[0];

    const title = front_matter && front_matter.title ? front_matter.title : '';
    const document_title = getDocumentTitle('pages', directory, title || name);

    return (
      <DocumentTitle title={document_title}>
        <HotKeys handlers={keyboardHandlers} className="single">
          {errors.length > 0 && <Errors errors={errors} />}

          <div className="content-header">
            <Breadcrumbs type="pages" splat={directory} />
          </div>

          <div className="content-wrapper">
            <MarkdownPageBody
              type="pages"
              updateTitle={updateTitle}
              updatePath={updatePath}
              updateBody={updateBody}
              onSave={this.handleClickSave}
              path={name}
              title={title}
              body={raw_content}
              metafields={{ title, raw_content, path: name, ...front_matter }}
              staticmetafields={front_matter_defaults}
            />
            <div className="content-side">
              <Button
                onClick={this.handleClickSave}
                type="save"
                active={fieldChanged}
                triggered={updated}
                block
              />
              <Button to={http_url} type="view" active block />
              <Splitter />
              <Button
                onClick={() => this.handleClickDelete(name)}
                type="delete"
                active
                block
              />
            </div>
          </div>
        </HotKeys>
      </DocumentTitle>
    );
  }
}

PageEdit.propTypes = {
  page: PropTypes.object.isRequired,
  fetchPage: PropTypes.func.isRequired,
  deletePage: PropTypes.func.isRequired,
  putPage: PropTypes.func.isRequired,
  updateTitle: PropTypes.func.isRequired,
  updateBody: PropTypes.func.isRequired,
  updatePath: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  errors: PropTypes.array.isRequired,
  fieldChanged: PropTypes.bool.isRequired,
  updated: PropTypes.bool.isRequired,
  params: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  page: state.pages.page,
  isFetching: state.pages.isFetching,
  fieldChanged: state.metadata.fieldChanged,
  updated: state.pages.updated,
  errors: state.utils.errors,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchPage,
      deletePage,
      putPage,
      updateTitle,
      updateBody,
      updatePath,
      clearErrors,
    },
    dispatch
  );

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PageEdit)
);
