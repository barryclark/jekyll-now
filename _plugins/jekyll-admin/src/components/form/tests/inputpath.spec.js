import React from 'react';
import { mount } from 'enzyme';
import moment from 'moment';
import InputPath from '../InputPath';

const props = {
  path: 'test.md',
  type: 'posts',
  splat: 'test/some/other',
};

function setup(defaultProps = props) {
  const actions = {
    onChange: jest.fn(),
  };

  let component = mount(<InputPath {...defaultProps} {...actions} />);

  return {
    actions,
    component,
    input: component.find('textarea'),
  };
}

describe('Components::InputPath', () => {
  it('should render correctly', () => {
    const { input } = setup();
    expect(input.node).toBeTruthy();
  });

  it('should prepend date to input value/placeholder for new post', () => {
    const { input } = setup({ ...props, type: 'posts' });
    const expectedValue = moment().format('YYYY-MM-DD') + '-your-title.md';
    expect(input.prop('placeholder')).toBe(expectedValue);
  });

  it('should call onChange', () => {
    const { input, actions } = setup();
    input.simulate('change');
    expect(actions.onChange).toHaveBeenCalled();
  });
});
