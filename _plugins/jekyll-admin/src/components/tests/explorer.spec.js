import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import Explorer from '../Explorer';
import { resources } from './fixtures';

const defaultProps = {
  type: 'resources',
  items: resources,
  params: {},
  newBtnLabel: 'New resource',
};

const actions = {
  deleteItem: jest.fn(),
  search: jest.fn(),
};

function setup(overrides = {}) {
  const component = mount(
    <Explorer {...defaultProps} {...actions} {...overrides} />
  );

  return {
    component,
    actions,
    header: component.find('.content-header'),
  };
}

describe('Components::Explorer', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<Explorer {...defaultProps} {...actions} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders breadcrumbs correctly', () => {
    const { header } = setup({
      type: 'datafiles',
      params: { splat: 'movies' },
    });
    const crumbs = header.find('li');
    expect(crumbs.map(c => c.text()).join(' / ')).toBe('Data Files / movies');
  });
});
