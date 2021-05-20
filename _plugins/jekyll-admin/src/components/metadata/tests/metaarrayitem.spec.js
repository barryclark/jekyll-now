import React from 'react';
import { mount } from 'enzyme';

import MetaButtons from '../MetaButtons';
import MetaArray from '../MetaArray';
import MetaArrayItem from '../MetaArrayItem';
import MetaObject from '../MetaObject';
import MetaObjectItem from '../MetaObjectItem';
import MetaSimple from '../MetaSimple';

const FieldTypes = {
  array: MetaArray,
  object: MetaObject,
  simple: MetaSimple,
};

const defaultProps = {
  type: 'simple',
  parentType: 'array',
  fieldKey: 'mentors',
  fieldValue: 'Ben Balter',
  nameAttr: 'metadata["mentors"][1]',
  namePrefix: 'metadata["mentors"]',
  key_prefix: '',
  index: 0,
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

  let component = mount(<MetaArrayItem {...props} {...actions} />);

  return {
    component,
    index: component.find('.array-field-num'),
    metabuttons: component.find(MetaButtons),
    actions,
    props,
  };
}

describe('Components::MetaArrayItem', () => {
  it('should render MetaArrayItem correctly', () => {
    const { component, index } = setup();
    let CurrentComponent = FieldTypes[component.prop('type')];
    expect(CurrentComponent).toEqual(MetaSimple);
    expect(index.text()).toBe(`${defaultProps.index + 1}.`);
  });

  it('should render MetaArrayItem with updated props correctly', () => {
    const { component } = setup({
      ...defaultProps,
      type: 'object',
      fieldValue: {
        name: 'Ben Balter',
        username: 'benbalter',
      },
    });
    let CurrentComponent = FieldTypes[component.prop('type')];
    expect(CurrentComponent).toEqual(MetaObject);
    expect(component.find(MetaObjectItem).length).toBe(2);
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
