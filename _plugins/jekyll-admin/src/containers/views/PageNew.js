import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory, withRouter } from 'react-router';
import DocumentTitle from 'react-document-title';
import CreateMarkdownPage from '../../components/CreateMarkdownPage';
import { updateTitle, updateBody, updatePath } from '../../ducks/metadata';
import { createPage } from '../../ducks/pages';
import { clearErrors } from '../../ducks/utils';
import { preventDefault, getDocumentTitle } from '../../utils/helpers';
import { ADMIN_PREFIX } from '../../constants';

import translations from '../../translations';
const { getLeaveMessage } = translations;

export class PageNew extends Component {
  componentDidMount() {
    const { router, route } = this.props;
    router.setRouteLeaveHook(route, this.routerWillLeave);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.updated !== nextProps.updated) {
      browserHistory.push(`${ADMIN_PREFIX}/pages/${nextProps.page.path}`);
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
    const { fieldChanged, createPage, params } = this.props;
    fieldChanged && createPage(params.splat);
  };

  render() {
    const {
      params,
      config,
      errors,
      updated,
      updateBody,
      updatePath,
      updateTitle,
      fieldChanged,
    } = this.props;

    const title = getDocumentTitle('pages', params.splat, 'New page');

    return (
      <DocumentTitle title={title}>
        <CreateMarkdownPage
          type="pages"
          params={params}
          config={config}
          errors={errors}
          updated={updated}
          updateBody={updateBody}
          updatePath={updatePath}
          updateTitle={updateTitle}
          fieldChanged={fieldChanged}
          onClickSave={this.handleClickSave}
        />
      </DocumentTitle>
    );
  }
}

PageNew.propTypes = {
  createPage: PropTypes.func.isRequired,
  updateTitle: PropTypes.func.isRequired,
  updateBody: PropTypes.func.isRequired,
  updatePath: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  errors: PropTypes.array.isRequired,
  fieldChanged: PropTypes.bool.isRequired,
  updated: PropTypes.bool.isRequired,
  router: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  config: PropTypes.object.isRequired,
  page: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  page: state.pages.page,
  fieldChanged: state.metadata.fieldChanged,
  errors: state.utils.errors,
  updated: state.pages.updated,
  config: state.config.config,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      updateTitle,
      updateBody,
      updatePath,
      createPage,
      clearErrors,
    },
    dispatch
  );

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PageNew)
);
