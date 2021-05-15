import React from 'react';
import { shallow } from 'enzyme';
import Modal from 'react-modal';

import FilePicker from '../FilePicker';

function setup() {
  const actions = {
    onPick: jest.fn(),
  };

  let component = shallow(<FilePicker {...actions} />);

  return {
    component,
    trigger: component.find('.images-wrapper > button'),
    modal: component.find(Modal).first(),
    actions,
  };
}

describe('Components::FilePicker', () => {
  it('should render correctly', () => {
    const { component, trigger, modal } = setup();
    expect(trigger.node).toBeTruthy();
    expect(component.state('showModal')).toBe(false);
    expect(modal.prop('isOpen')).toBe(false);
  });

  it('should render a modal on clicking the trigger', () => {
    const { component, trigger } = setup();
    trigger.simulate('click');
    expect(component.state('showModal')).toBe(true);
    const modal = component.find(Modal).first();
    expect(modal.prop('isOpen')).toBe(true);
  });

  it('should exit the modal on requesting to close', () => {
    const { component, trigger } = setup();
    trigger.simulate('click');
    expect(component.state('showModal')).toBe(true);
    let modal = component.find(Modal).first();
    expect(modal.prop('isOpen')).toBe(true);

    component.setState({ showModal: false });
    modal = component.find(Modal).first();
    expect(modal.prop('isOpen')).toBe(false);
  });
});
