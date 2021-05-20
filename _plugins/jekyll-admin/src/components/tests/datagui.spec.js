import React from 'react';
import { shallow } from 'enzyme';
import DataGUI from '../DataGUI';

const { defaultProps } = DataGUI;
const actions = {
  onChange: jest.fn(),
};

function setup(props = defaultProps) {
  const component = shallow(<DataGUI {...props} {...actions} />);
  return {
    component,
    pathFields: component.find('.datafile-path'),
    actions,
    props,
  };
}

describe('Components::DataGUI', () => {
  it('should render the default GUI correctly', () => {
    const { pathFields } = setup();
    expect(pathFields.node).toBeTruthy();
  });

  it('should render the restricted GUI correctly', () => {
    const { pathFields } = setup({ ...defaultProps, restricted: true });
    expect(pathFields.node).toBeFalsy();
  });

  it('should call onChange when a field is changed', () => {
    const { pathFields } = setup();
    pathFields.find('#path').simulate('change', { target: { value: 'foo' } });
    expect(actions.onChange).toHaveBeenCalled();
  });
});
