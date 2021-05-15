import React from 'react';
import { mount } from 'enzyme';

import MetaField from '../MetaField';
import MetaButtons from '../MetaButtons';
import MetaArray from '../MetaArray';
import MetaObject from '../MetaObject';
import MetaArrayItem from '../MetaArrayItem';
import MetaSimple from '../MetaSimple';

const FieldTypes = {
  array: MetaArray,
  object: MetaObject,
  simple: MetaSimple,
};

const defaultProps = {
  type: 'simple',
  parentType: 'top',
  fieldKey: 'layout',
  fieldValue: 'page',
  nameAttr: 'metadata["layout"]',
  namePrefix: 'metadata',
  key_prefix: '',
};

function setup(props = defaultProps) {
  const actions = {
    addField: jest.fn(),
    removeField: jest.fn(),
    updateFieldKey: jest.fn(),
    updateFieldValue: jest.fn(),
    moveArrayItem: jest.fn(),
    convertField: jest.fn(),
  };

  let component = mount(<MetaField {...props} {...actions} />);

  return {
    component,
    keyInput: component.find('.key-field'),
    metabuttons: component.find(MetaButtons),
    actions,
    props,
  };
}

describe('Components::MetaField', () => {
  it('should render MetaField correctly', () => {
    const { component, keyInput } = setup();
    let CurrentComponent = FieldTypes[component.prop('type')];
    expect(CurrentComponent).toEqual(MetaSimple);
    expect(keyInput.prop('defaultValue')).toBe(component.prop('fieldKey'));
  });

  it('should render MetaField with updated props correctly', () => {
    const { component, keyInput } = setup({
      ...defaultProps,
      type: 'array',
      fieldKey: 'students',
      fieldValue: ['Mert', 'Ankur'],
      nameAttr: 'metadata["students"]',
    });
    let CurrentComponent = FieldTypes[component.prop('type')];
    expect(CurrentComponent).toEqual(MetaArray);
    expect(keyInput.prop('defaultValue')).toBe(component.prop('fieldKey'));
    expect(component.find(MetaArrayItem).length).toBe(2);
  });

  it('should call updateFieldKey when the input lose focus', () => {
    const { keyInput, actions } = setup();
    keyInput.simulate('blur');
    expect(actions.updateFieldKey).not.toHaveBeenCalled();
    keyInput.node.value = 'post';
    keyInput.simulate('blur');
    expect(actions.updateFieldKey).toHaveBeenCalled();
  });

  it('should toggle `showing-dropdown` class when dropdown button is clicked', () => {
    const { component, metabuttons } = setup();
    let dropdownButton = metabuttons.find('.meta-button');
    dropdownButton.simulate('click');
    expect(component.find('.dropdown').hasClass('showing-dropdown')).toEqual(
      true
    );
    dropdownButton.simulate('click');
    expect(component.find('.dropdown').node.classList.length).toBe(1);
  });

  it('should remove `showing-dropdown` class when dropdown button loses focus', () => {
    const { component, metabuttons } = setup();
    let dropdownButton = metabuttons.find('.meta-button');
    dropdownButton.simulate('click');
    expect(component.find('.dropdown').hasClass('showing-dropdown')).toEqual(
      true
    );
    dropdownButton.simulate('blur');
    expect(component.find('.dropdown').node.classList.length).toBe(1);
  });

  it('should call removeField when the button clicked', () => {
    const { metabuttons, actions } = setup();
    let removeFieldButton = metabuttons.find('.remove-field');
    removeFieldButton.simulate('mousedown');
    expect(actions.removeField).toHaveBeenCalled();
  });
  it('should call convertField when the button clicked', () => {
    const { metabuttons, actions } = setup();
    let convertButton = metabuttons.find('.dropdown-wrap span').first();
    convertButton.simulate('mousedown');
    expect(actions.convertField).toHaveBeenCalled();
  });
});
