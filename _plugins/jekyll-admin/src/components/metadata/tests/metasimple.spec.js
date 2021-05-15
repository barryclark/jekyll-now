import React from 'react';
import { mount } from 'enzyme';

import MetaSimple from '../MetaSimple';

const defaultProps = {
  parentType: 'top',
  fieldKey: 'layout',
  fieldValue: 'page',
  nameAttr: 'metadata["layout"]',
};

function setup(props = defaultProps) {
  const actions = {
    updateFieldValue: jest.fn(),
  };

  let component = mount(<MetaSimple {...props} {...actions} />);

  return {
    component,
    editable: component.find('.value-field'),
    datepicker: component.find('.date-field'),
    tagsinput: component.find('.tags-input'),
    actions,
    props,
  };
}

describe('Components::MetaSimple', () => {
  it('should render editable if field key is not called date', () => {
    const { editable, datepicker } = setup();
    expect(editable.node).toBeTruthy();
    expect(datepicker.node).toBeFalsy();
  });

  it('should render datepicker if field key is called date', () => {
    const { editable, datepicker } = setup({
      ...defaultProps,
      fieldKey: 'date',
    });
    expect(datepicker.node).toBeTruthy();
    expect(editable.node).toBeFalsy();
  });

  it('should render tagsinput if field key is called "tags"', () => {
    const { editable, tagsinput } = setup({
      ...defaultProps,
      fieldKey: 'tags',
      fieldValue: ['page'],
    });
    expect(tagsinput.node).toBeTruthy();
    expect(editable.node).toBeTruthy();
  });

  it('should call updateFieldValue when the input is changed', () => {
    const { actions, editable } = setup();
    editable.simulate('change');
    expect(actions.updateFieldValue).toHaveBeenCalled();
  });
});
