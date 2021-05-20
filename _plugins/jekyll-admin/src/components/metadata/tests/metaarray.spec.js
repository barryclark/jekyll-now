import React from 'react';
import { mount } from 'enzyme';

import MetaArray from '../MetaArray';
import MetaArrayItem from '../MetaArrayItem';

const defaultProps = {
  fieldKey: 'students',
  fieldValue: ['Mert', 'Ankur'],
  nameAttr: 'metadata["students"]',
  namePrefix: 'metadata',
  key_prefix: ''
};

function setup(props = defaultProps) {
  const actions = {
    addField: jest.fn(),
    removeField: jest.fn(),
    updateFieldKey: jest.fn(),
    updateFieldValue: jest.fn(),
    moveArrayItem: jest.fn(),
    convertField: jest.fn()
  };

  let component = mount(
    <MetaArray {...props} {...actions} />
  );

  return {
    component,
    arrayitems: component.find(MetaArrayItem),
    addFieldButton: component.find('.add-field-array'),
    actions,
    props
  };
}

describe('Components::MetaArray', () => {
  it('should render MetaArray correctly', () => {
    const { arrayitems } = setup();
    expect(arrayitems.length).toBe(defaultProps.fieldValue.length);
  });

  it('should call addField when the button is clicked', () => {
    const { actions, addFieldButton } = setup();
    addFieldButton.simulate('click');
    expect(actions.addField).toHaveBeenCalled();
  });

  // TODO test sortable MetaArrayItem's
});
