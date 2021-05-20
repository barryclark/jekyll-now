import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';

import { Sidebar } from '../Sidebar';
import { collections, config } from './fixtures';

const defaultProps = {
  config,
  collections,
};

const actions = {
  fetchCollections: jest.fn(),
};

describe('Containers::Sidebar', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Sidebar {...defaultProps} {...actions} />, div);
  });

  it('renders correctly', () => {
    const tree = renderer
      .create(<Sidebar {...defaultProps} {...actions} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders an accordion for collections other than posts and drafts', () => {
    const container = mount(<Sidebar {...defaultProps} {...actions} />);
    const accordion = container.find('.accordion');
    const trigger = accordion.find('.accordion-label').first();

    expect(accordion.prop('className')).toMatch('collapsed');
    expect(trigger.text()).toMatch('Collections');

    trigger.simulate('click');
    expect(accordion.prop('className')).not.toMatch('collapsed');
  });

  it('does not render hidden links', () => {
    const props = {
      ...defaultProps,
      config: {
        ...config,
        jekyll_admin: {
          hidden_links: ['posts', 'pages'],
        },
      },
    };

    const tree = renderer.create(<Sidebar {...props} {...actions} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders with zero collections', () => {
    const props = {
      ...defaultProps,
      collections: [],
      config: {
        jekyll_admin: {},
      },
    };

    const tree = renderer.create(<Sidebar {...props} {...actions} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders with custom collection labels', () => {
    const props = {
      ...defaultProps,
      collections: [
        {
          label: 'walkthroughs',
          sidebar_label: 'Tutorials',
        },
        {
          label: 'docs',
        },
      ],
    };

    const tree = renderer.create(<Sidebar {...props} {...actions} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('calls fetchCollections action after mounted', () => {
    expect(actions.fetchCollections).toHaveBeenCalled();
  });
});
