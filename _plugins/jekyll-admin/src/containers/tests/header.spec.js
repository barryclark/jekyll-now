import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { Header } from '../Header';
import { config } from './fixtures';

const defaultProps = { config: config.content };

describe('Containers::Header', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Header {...defaultProps} />, div);
  });

  it('renders correctly', () => {
    const tree = renderer.create(<Header {...defaultProps} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders placeholder title', () => {
    const props = { ...defaultProps, config: {} };
    const tree = renderer.create(<Header {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
