import React from 'react';
import { mount } from 'enzyme';

import { DataFiles } from '../DataFiles';
import { datafile, directory } from './fixtures';

function setup(datafiles = [directory, datafile]) {
  const actions = {
    fetchDataFiles: jest.fn(),
    deleteDataFile: jest.fn(),
    search: jest.fn(),
  };

  const props = {
    files: datafiles,
    params: { splat: 'movies' },
    isFetching: false,
  };

  const component = mount(<DataFiles {...props} {...actions} />);

  return {
    actions,
    component,
    h1: component.find('h1').last(),
    breadcrumbs: component.find('.breadcrumbs'),
    table: component.find('.content-table'),
    deleteButton: component.find('.btn-delete'),
  };
}

describe('Containers::DataFiles', () => {
  it('should render correctly', () => {
    const { h1, breadcrumbs, table } = setup();
    expect(h1.node).toBeFalsy();
    expect(breadcrumbs.node).toBeTruthy();
    expect(table.node).toBeTruthy();
  });

  it('should render correctly when there are not any data files', () => {
    const { table, h1 } = setup([]);
    expect(table.node).toBeFalsy();
    expect(h1.text()).toBe(`No data files found.`);
  });

  it('should not render elements when isFetching', () => {
    const { component } = setup();
    component.setProps({ isFetching: true, params: { splat: '' } });
    expect(component.find('.content-header').node).toBeFalsy();
  });

  it('should call fetchDataFiles action after mounted', () => {
    const { actions } = setup();
    expect(actions.fetchDataFiles).toHaveBeenCalled();
  });

  it('should call fetchDataFiles action after props change', () => {
    const { component, actions } = setup();
    expect(actions.fetchDataFiles.mock.calls.length).toBe(1);

    component.setProps({ params: { splat: 'movies' } });
    expect(actions.fetchDataFiles.mock.calls.length).toBe(1);

    component.setProps({ params: { splat: '' } });
    expect(actions.fetchDataFiles.mock.calls.length).toBe(2);

    component.setProps({ params: { splat: 'draft-dir, foo' } });
    expect(actions.fetchDataFiles.mock.calls.length).toBe(3);
  });

  it('should call deleteDataFile', () => {
    const { deleteButton, actions } = setup();
    deleteButton.simulate('click');
    expect(actions.deleteDataFile.mock.calls.length).toBe(1);
  });
});
