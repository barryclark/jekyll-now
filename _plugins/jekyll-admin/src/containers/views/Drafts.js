import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DocumentTitle from 'react-document-title';
import Explorer from '../../components/Explorer';
import { search, filterBySearchInput } from '../../ducks/utils';
import { fetchDrafts, deleteDraft } from '../../ducks/drafts';
import { getDocumentTitle } from '../../utils/helpers';

export class Drafts extends Component {
  componentDidMount() {
    const { fetchDrafts, params } = this.props;
    fetchDrafts(params.splat);
  }

  componentWillReceiveProps(nextProps) {
    const { fetchDrafts } = nextProps;
    if (this.props.params.splat !== nextProps.params.splat) {
      fetchDrafts(nextProps.params.splat);
    }
  }

  render() {
    const { isFetching, drafts, search, params, deleteDraft } = this.props;

    if (isFetching) {
      return null;
    }

    const title = getDocumentTitle('drafts', params.splat);

    return (
      <DocumentTitle title={title}>
        <Explorer
          type="drafts"
          items={drafts}
          params={params}
          newBtnLabel="New draft"
          search={search}
          deleteItem={deleteDraft}
        />
      </DocumentTitle>
    );
  }
}

Drafts.propTypes = {
  drafts: PropTypes.array.isRequired,
  fetchDrafts: PropTypes.func.isRequired,
  deleteDraft: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  search: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  drafts: filterBySearchInput(state.drafts.drafts, state.utils.input),
  isFetching: state.drafts.isFetching,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchDrafts,
      deleteDraft,
      search,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Drafts);
