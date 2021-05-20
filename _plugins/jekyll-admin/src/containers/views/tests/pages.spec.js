import React from 'react';
import { mount } from 'enzyme';

import { Pages } from '../Pages';
import { page, directory } from './fixtures';

function setup(pages = [directory, page]) {
  const actions = {
    fetchPages: jest.fn(),
    deletePage: jest.fn(),
    search: jest.fn(),
  };

  const props = {
    pages,
    params: { splat: 'page-dir' },
    isFetching: false,
  };

  const component = mount(<Pages {...props} {...actions} />);

  return {
    actions,
    component,
    h1: component.find('h1').last(),
    breadcrumbs: component.find('.breadcrumbs'),
    table: component.find('.content-table'),
    deleteButton: component.find('.btn-delete'),
  };
}

describe('Containers::Pages', () => {
  it('should render correctly', () => {
    const { h1, breadcrumbs, table } = setup();
    expect(h1.node).toBeFalsy();
    expect(breadcrumbs.node).toBeTruthy();
    expect(table.node).toBeTruthy();
  });

  it('should render correctly when there are not any pages', () => {
    const { table, h1 } = setup([]);
    expect(table.node).toBeFalsy();
    expect(h1.text()).toBe(`No pages found.`);
  });

  it('should not render elements when isFetching', () => {
    const { component } = setup();
    component.setProps({ isFetching: true, params: { splat: '' } });
    expect(component.find('.content-header').node).toBeFalsy();
  });

  it('should call fetchPages action after mounted', () => {
    const { actions } = setup();
    expect(actions.fetchPages).toHaveBeenCalled();
  });

  it('should call fetchPages action after props change', () => {
    const { component, actions } = setup();
    expect(actions.fetchPages.mock.calls.length).toBe(1);

    component.setProps({ params: { splat: 'page-dir' } });
    expect(actions.fetchPages.mock.calls.length).toBe(1);

    component.setProps({ params: { splat: '' } });
    expect(actions.fetchPages.mock.calls.length).toBe(2);

    component.setProps({ params: { splat: 'page-dir, foo' } });
    expect(actions.fetchPages.mock.calls.length).toBe(3);
  });

  it('should call deletePage', () => {
    const { deleteButton, actions } = setup();
    deleteButton.simulate('click');
    expect(actions.deletePage.mock.calls.length).toBe(1);
  });
});
