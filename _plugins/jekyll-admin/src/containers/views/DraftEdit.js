import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory, withRouter } from 'react-router';
import { HotKeys } from 'react-hotkeys';
import _ from 'underscore';
import moment from 'moment';
import DocumentTitle from 'react-document-title';
import Button from '../../components/Button';
import Errors from '../../components/Errors';
import Splitter from '../../components/Splitter';
import Breadcrumbs from '../../components/Breadcrumbs';
import MarkdownPageBody from '../../components/MarkdownPageBody';
import {
  fetchDraft,
  deleteDraft,
  putDraft,
  publishDraft,
} from '../../ducks/drafts';
import { updateTitle, updateBody, updatePath } from '../../ducks/metadata';
import { clearErrors } from '../../ducks/utils';
import { preventDefault, getDocumentTitle } from '../../utils/helpers';
import { ADMIN_PREFIX } from '../../constants';

import translations from '../../translations';
const {
  getLeaveMessage,
  getDeleteMessage,
  getPublishDraftMessage,
} = translations;

export class DraftEdit extends Component {
  componentDidMount() {
    const { fetchDraft, params, router, route } = this.props;
    const [directory, ...rest] = params.splat;
    const filename = rest.join('.');
    fetchDraft(directory, filename);

    router.setRouteLeaveHook(route, this.routerWillLeave);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.updated !== nextProps.updated) {
      const new_path = nextProps.draft.path;
      const path = this.props.draft.path;
      // redirect if the path is changed
      if (new_path !== path) {
        browserHistory.push(
          `${ADMIN_PREFIX}/drafts/${nextProps.draft.relative_path}`
        );
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
    const { putDraft, fieldChanged, params } = this.props;
    if (fieldChanged) {
      const [directory, ...rest] = params.splat;
      const filename = rest.join('.');
      putDraft(directory, filename);
    }
  };

  handleClickPublish(path) {
    const { deleteDraft, publishDraft, params } = this.props;

    const [directory, ...rest] = params.splat;
    const filename = rest.join('.');
    const today = moment().format('YYYY-MM-DD');
    const datedfilename = `${today}-${filename}`;
    const postPath = directory
      ? `_posts/${directory}/${datedfilename}`
      : `_posts/${datedfilename}`;

    const confirm = window.confirm(getPublishDraftMessage(path, postPath));
    if (confirm) {
      const goTo = directory ? `/${directory}` : '';
      deleteDraft(directory, filename);
      publishDraft(directory, datedfilename);
      browserHistory.push(`${ADMIN_PREFIX}/drafts${goTo}`);
    }
  }

  handleClickDelete(name) {
    const { deleteDraft, params } = this.props;
    const confirm = window.confirm(getDeleteMessage(name));
    if (confirm) {
      const [directory, ...rest] = params.splat;
      const filename = rest.join('.');
      const goTo = directory ? `/${directory}` : '';
      deleteDraft(directory, filename);
      browserHistory.push(`${ADMIN_PREFIX}/drafts${goTo}`);
    }
  }

  render() {
    const {
      isFetching,
      draft,
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
    } else if (_.isEmpty(draft)) {
      return <h1>Could not find the draft.</h1>;
    }

    const keyboardHandlers = {
      save: this.handleClickSave,
    };

    const {
      name,
      path,
      raw_content,
      http_url,
      front_matter,
      front_matter_defaults,
    } = draft;
    const directory = params.splat[0];
    const title = front_matter && front_matter.title ? front_matter.title : '';
    const document_title = getDocumentTitle('drafts', directory, title || name);

    return (
      <DocumentTitle title={document_title}>
        <HotKeys handlers={keyboardHandlers} className="single">
          {errors.length > 0 && <Errors errors={errors} />}
          <div className="content-header">
            <Breadcrumbs type="drafts" splat={directory} />
          </div>

          <div className="content-wrapper">
            <MarkdownPageBody
              type="drafts"
              path={name}
              title={title}
              body={raw_content}
              updatePath={updatePath}
              updateBody={updateBody}
              updateTitle={updateTitle}
              onSave={this.handleClickSave}
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
                onClick={() => this.handleClickPublish(path)}
                type="publish"
                active
                block
              />
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

DraftEdit.propTypes = {
  draft: PropTypes.object.isRequired,
  fetchDraft: PropTypes.func.isRequired,
  deleteDraft: PropTypes.func.isRequired,
  putDraft: PropTypes.func.isRequired,
  updateTitle: PropTypes.func.isRequired,
  updateBody: PropTypes.func.isRequired,
  updatePath: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  publishDraft: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  errors: PropTypes.array.isRequired,
  fieldChanged: PropTypes.bool.isRequired,
  updated: PropTypes.bool.isRequired,
  params: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  draft: state.drafts.draft,
  isFetching: state.drafts.isFetching,
  fieldChanged: state.metadata.fieldChanged,
  updated: state.drafts.updated,
  errors: state.utils.errors,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchDraft,
      deleteDraft,
      putDraft,
      publishDraft,
      updateTitle,
      updateBody,
      updatePath,
      clearErrors,
    },
    dispatch
  );

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DraftEdit)
);
