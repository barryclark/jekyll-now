import React from 'react';
import { mount } from 'enzyme';

import { Drafts } from '../Drafts';
import { draft, directory } from './fixtures';

function setup(drafts = [directory, draft]) {
  const actions = {
    fetchDrafts: jest.fn(),
    deleteDraft: jest.fn(),
    search: jest.fn(),
  };

  const props = {
    drafts,
    params: { splat: 'draft-dir' },
    isFetching: false,
  };

  const component = mount(<Drafts {...props} {...actions} />);

  return {
    actions,
    component,
    h1: component.find('h1').last(),
    breadcrumbs: component.find('.breadcrumbs'),
    table: component.find('.content-table'),
    deleteButton: component.find('.btn-delete'),
  };
}

describe('Containers::Drafts', () => {
  it('should render correctly', () => {
    const { h1, breadcrumbs, table } = setup();
    expect(h1.node).toBeFalsy();
    expect(breadcrumbs.node).toBeTruthy();
    expect(table.node).toBeTruthy();
  });

  it('should render correctly when there are no drafts', () => {
    const { table, h1 } = setup([]);
    expect(table.node).toBeFalsy();
    expect(h1.text()).toBe(`No drafts found.`);
  });

  it('should not render elements when isFetching', () => {
    const { component } = setup();
    component.setProps({ isFetching: true, params: { splat: '' } });
    expect(component.find('.content-header').node).toBeFalsy();
  });

  it('should call fetchDrafts action after mounted', () => {
    const { actions } = setup();
    expect(actions.fetchDrafts).toHaveBeenCalled();
  });

  it('should call fetchDrafts action after props change', () => {
    const { component, actions } = setup();
    expect(actions.fetchDrafts.mock.calls.length).toBe(1);

    component.setProps({ params: { splat: 'draft-dir' } });
    expect(actions.fetchDrafts.mock.calls.length).toBe(1);

    component.setProps({ params: { splat: '' } });
    expect(actions.fetchDrafts.mock.calls.length).toBe(2);

    component.setProps({ params: { splat: 'draft-dir, foo' } });
    expect(actions.fetchDrafts.mock.calls.length).toBe(3);
  });

  it('should call deleteDraft', () => {
    const { deleteButton, actions } = setup();
    deleteButton.simulate('click');
    expect(actions.deleteDraft.mock.calls.length).toBe(1);
  });
});
