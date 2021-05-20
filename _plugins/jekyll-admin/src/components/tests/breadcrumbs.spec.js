import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Breadcrumbs from '../Breadcrumbs';

const propsList = [
  {
    type: 'posts',
    splat: '1',
  },
  {
    type: 'pages',
    splat: '1/2',
  },
  {
    type: 'datafiles',
    splat: '1/2/3',
  },
  {
    type: 'drafts',
    splat: '1/2/3/4',
  },
  {
    type: 'collections',
    splat: '1/2/3/4/5',
  },
  {
    type: 'staticfiles',
  },
];

describe('Components::Breadcrumbs', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Breadcrumbs {...propsList[0]} />, div);
  });

  it('renders correctly', () => {
    propsList.forEach(props => {
      const tree = renderer.create(<Breadcrumbs {...props} />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
