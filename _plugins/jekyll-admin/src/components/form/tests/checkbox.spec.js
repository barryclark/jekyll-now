import React from 'react';
import { mount } from 'enzyme';

import Checkbox from '../Checkbox';

function setup(props = {text: 'GSoC', checked: false}) {
  let actions = {
    onChange: jest.fn()
  };

  let component = mount(
    <Checkbox {...props} {...actions} />
  );

  return {
    component,
    checkbox: component.find('input'),
    label: component.find('.checkbox-container'),
    props,
    actions
  };
}

describe('Components::Checkbox', () => {
  it('should render correctly', () => {
    const { label, props } = setup();
    expect(label.text()).toBe(props.text);
  });
  it('should call onChange', () => {
    const { checkbox, actions } = setup();
    checkbox.simulate('change');
    expect(actions.onChange).toHaveBeenCalled();
  });
});
