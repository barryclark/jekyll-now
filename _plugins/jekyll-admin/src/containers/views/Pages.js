import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DocumentTitle from 'react-document-title';
import Explorer from '../../components/Explorer';
import { search, filterBySearchInput } from '../../ducks/utils';
import { fetchPages, deletePage } from '../../ducks/pages';
import { getDocumentTitle } from '../../utils/helpers';

export class Pages extends Component {
  componentDidMount() {
    const { fetchPages, params } = this.props;
    fetchPages(params.splat);
  }

  componentWillReceiveProps(nextProps) {
    const { fetchPages } = nextProps;
    if (this.props.params.splat !== nextProps.params.splat) {
      fetchPages(nextProps.params.splat);
    }
  }

  render() {
    const { isFetching, pages, search, params, deletePage } = this.props;

    if (isFetching) {
      return null;
    }

    const title = getDocumentTitle('pages', params.splat);

    return (
      <DocumentTitle title={title}>
        <Explorer
          type="pages"
          items={pages}
          params={params}
          newBtnLabel="New page"
          search={search}
          deleteItem={deletePage}
        />
      </DocumentTitle>
    );
  }
}

Pages.propTypes = {
  pages: PropTypes.array.isRequired,
  fetchPages: PropTypes.func.isRequired,
  deletePage: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  search: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  pages: filterBySearchInput(state.pages.pages, state.utils.input),
  isFetching: state.pages.isFetching,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchPages,
      deletePage,
      search,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Pages);
