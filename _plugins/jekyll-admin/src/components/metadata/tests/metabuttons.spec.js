import React from 'react';
import { mount } from 'enzyme';
import MetaButtons from '../MetaButtons';

const defaultProps = {
  currentType: 'simple',
  parentType: 'array',
};

function setup(props = defaultProps) {
  const actions = {
    onConvertClick: jest.fn(),
    onRemoveClick: jest.fn(),
  };

  let component = mount(<MetaButtons {...props} {...actions} />);

  return {
    component,
    convertButtons: component.find('.dropdown-wrap span'),
    dropdownButton: component.find('.dropdown .meta-button'),
    sortHandle: component.find('.move'),
    actions,
    props,
  };
}

describe('Components::MetaButtons', () => {
  it('should render MetaButtons correctly', () => {
    const { convertButtons, sortHandle } = setup();
    expect(sortHandle.node).toBeTruthy();
    expect(convertButtons.length).toBe(3);
  });

  it('should not render sort handle if parentType is not array', () => {
    const { sortHandle } = setup({
      currentType: 'simple',
      parentType: 'object',
    });
    expect(sortHandle.node).toBeFalsy();
  });

  it('should call onConvertClick', () => {
    const { actions, convertButtons } = setup();
    convertButtons.forEach(node => node.simulate('mousedown'));
    expect(actions.onConvertClick.mock.calls.length).toBe(2);
  });

  it('should call removeField', () => {
    const { component, actions } = setup();
    let removeFieldButton = component.find('.remove-field');
    removeFieldButton.simulate('mousedown');
    expect(actions.onRemoveClick).toHaveBeenCalled();
  });
});
