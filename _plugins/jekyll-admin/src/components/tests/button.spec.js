import React from 'react';
import { mount } from 'enzyme';

import Button from '../Button';
const defaultProps = { type: 'save', active: true };

function setup(props = defaultProps) {
  const actions = {
    onClick: jest.fn(),
  };

  const component = mount(<Button {...props} {...actions} />);

  return {
    component,
    btn: component.find('.btn'),
    icon: component.find('i'),
    actions,
  };
}

describe('Components::Button', () => {
  it('should render correctly', () => {
    let { btn, icon } = setup();
    expect(btn.text()).toBe('Save');
    expect(icon.node).toBeTruthy();

    btn = setup({
      ...defaultProps,
      type: 'create',
      active: false,
      block: true,
    }).btn;
    expect(btn.text()).toBe('Create');
  });

  it('should not render if both props `to` and `onClick` are falsy', () => {
    const component = mount(<Button type="create" active />);
    expect(component.find('.btn').node).toBeFalsy();
  });

  it('should have correct class names', () => {
    let { btn } = setup();
    expect(btn.prop('className')).toBe('btn btn-active btn-success');

    btn = setup({
      ...defaultProps,
      type: 'delete',
      active: false,
      block: true,
    }).btn;
    expect(btn.prop('className')).toBe('btn btn-delete btn-inactive btn-fat');
  });

  it('should render triggered text', () => {
    let { btn } = setup({ ...defaultProps, triggered: true });
    expect(btn.text()).toBe('Saved');

    btn = setup({
      ...defaultProps,
      type: 'view-toggle',
      triggered: true,
    }).btn;
    expect(btn.text()).toBe('Switch View to Raw Editor');
  });

  it('should render custom icon', () => {
    const { btn, icon } = setup({ ...defaultProps, icon: 'eye' });
    expect(btn.text()).toBe('Save');
    expect(icon.node).toBeTruthy();
  });

  it('should call onClick', () => {
    const { btn, actions } = setup();
    btn.simulate('click');
    expect(actions.onClick).toHaveBeenCalled();
  });

  it('should not call onClick if it is a link', () => {
    const { btn, actions } = setup({ ...defaultProps, to: 'some_link' });
    btn.simulate('click');
    expect(actions.onClick).not.toHaveBeenCalled();
  });
});
