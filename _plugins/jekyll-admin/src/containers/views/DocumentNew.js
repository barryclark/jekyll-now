import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory, withRouter } from 'react-router';
import DocumentTitle from 'react-document-title';
import CreateMarkdownPage from '../../components/CreateMarkdownPage';
import { updateTitle, updateBody, updatePath } from '../../ducks/metadata';
import { createDocument } from '../../ducks/collections';
import { clearErrors } from '../../ducks/utils';
import { preventDefault, getDocumentTitle } from '../../utils/helpers';
import { ADMIN_PREFIX } from '../../constants';

import translations from '../../translations';
const { getLeaveMessage } = translations;

export class DocumentNew extends Component {
  componentDidMount() {
    const { router, route } = this.props;
    router.setRouteLeaveHook(route, this.routerWillLeave);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.updated !== nextProps.updated) {
      const path = nextProps.currentDocument.path;
      const splat = path.substr(path.indexOf('/') + 1, path.length);
      browserHistory.push(
        `${ADMIN_PREFIX}/collections/${nextProps.currentDocument.collection}/${splat}`
      );
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
    const { fieldChanged, createDocument, params } = this.props;
    fieldChanged && createDocument(params.collection_name, params.splat);
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

    const collection = params.collection_name;
    const title = getDocumentTitle(collection, params.splat, 'New document');

    return (
      <DocumentTitle title={title}>
        <CreateMarkdownPage
          type={collection}
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

DocumentNew.propTypes = {
  createDocument: PropTypes.func.isRequired,
  updateTitle: PropTypes.func.isRequired,
  updateBody: PropTypes.func.isRequired,
  updatePath: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  errors: PropTypes.array.isRequired,
  fieldChanged: PropTypes.bool.isRequired,
  updated: PropTypes.bool.isRequired,
  params: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
  config: PropTypes.object.isRequired,
  currentDocument: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  currentDocument: state.collections.currentDocument,
  fieldChanged: state.metadata.fieldChanged,
  errors: state.utils.errors,
  updated: state.collections.updated,
  config: state.config.config,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      updateTitle,
      updateBody,
      updatePath,
      createDocument,
      clearErrors,
    },
    dispatch
  );

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DocumentNew)
);
