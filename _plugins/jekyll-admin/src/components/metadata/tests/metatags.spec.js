import React from 'react';
import { mount } from 'enzyme';

import MetaTags from '../MetaTags';

const defaultProps = {
  fieldValue: [],
  nameAttr: 'metadata["tags"]',
};

function setup(props = defaultProps) {
  const actions = {
    updateFieldValue: jest.fn(),
  };

  let component = mount(<MetaTags {...props} {...actions} />);

  return {
    component,
    editable: component.find('.value-field input'),
    actions,
    props,
  };
}

describe('Components::MetaTags', () => {
  it('should render an editable', () => {
    const { editable } = setup();
    expect(editable.node).toBeTruthy();
  });

  it('should render an editable with "null" fieldValue prop', () => {
    const { editable } = setup({
      ...defaultProps,
      fieldValue: null,
    });
    expect(editable.node).toBeTruthy();
  });

  it('should render an error if fieldValue prop is a String', () => {
    const { component, editable } = setup({
      ...defaultProps,
      fieldValue: 'foo',
    });
    const error = 'Expected an array of items. Found: fooClick hereto correct.';
    const error_element = component.find('.meta-error');
    const rectifier = error_element.find('span').last();

    expect(component.state('pageTags')).toEqual('foo');
    expect(error_element.text()).toEqual(error);
    expect(editable.node).toBeFalsy();

    expect(rectifier.text()).toEqual('Click here');
    rectifier.simulate('click');
    expect(component.state('pageTags')).toEqual(['foo']);
  });

  it('should create tags on certain keypresses', () => {
    const { component, editable } = setup();
    editable.node.value = 'foo';
    editable.simulate('change', editable);
    expect(component.state('tagInput')).toEqual('foo');
    editable.simulate('keyUp', { key: 'Enter', keyCode: 13 });
    expect(component.state('pageTags')).toEqual(['foo']);

    editable.node.value = 'bar';
    editable.simulate('change', editable);
    editable.simulate('keyUp', { key: ',', keyCode: 188 });
    expect(component.state('pageTags')).toEqual(['foo', 'bar']);

    editable.node.value = 'ignored';
    editable.simulate('change', editable);
    editable.simulate('keyUp', { key: 'Tab', keyCode: 9 });
    expect(component.state('pageTags')).not.toEqual(['foo', 'bar', 'ignored']);
  });

  it('should not create duplicate tags', () => {
    const { component, editable } = setup({
      ...defaultProps,
      fieldValue: ['foo', 'bar'],
    });
    editable.node.value = 'foo';
    editable.simulate('change', editable);
    editable.simulate('keyUp', { key: ' ', keyCode: 32 });
    expect(component.state('pageTags')).not.toEqual(['foo', 'bar', 'foo']);
  });

  it('should delete tags on clicking "(x)"', () => {
    const { component, editable } = setup();
    editable.node.value = 'foo';
    editable.simulate('change', editable);
    editable.simulate('keyUp', { key: ' ', keyCode: 32 });

    component.find('.delete-tag').simulate('click');
    expect(component.state('pageTags')).toEqual([]);
  });

  it('should delete tags on pressing "backspace"', () => {
    const { component, editable } = setup();
    editable.node.value = 'foo';
    editable.simulate('change', editable);
    editable.simulate('keyUp', { key: ' ', keyCode: 32 });
    editable.simulate('keyUp', { key: 'Backspace', keyCode: 8 });
    expect(component.state('pageTags')).toEqual([]);
  });

  it('should call updateFieldValue when the input is changed', () => {
    const { actions, editable } = setup();
    editable.simulate('change');
    expect(actions.updateFieldValue).toHaveBeenCalled();
  });

  it('should render a dropdown list of all tags in site payload', () => {
    const { component, editable } = setup({
      ...defaultProps,
      suggestions: ['foo', 'bar', 'baz'],
    });
    editable.simulate('focus');
    const suggestedTags = component.find('.tag-suggestions li');
    expect(suggestedTags.map(item => item.text())).toEqual([
      'foo',
      'bar',
      'baz',
    ]);
    editable.simulate('blur');
  });

  it('should render a dropdown list of tags not already used in current document', () => {
    const { component } = setup({
      ...defaultProps,
      fieldValue: ['foo'],
      suggestions: ['foo', 'bar', 'baz'],
    });
    component.setState({ autoSuggest: true });
    const suggestedTags = component.find('.tag-suggestions li');
    expect(suggestedTags.map(item => item.text())).toEqual(['bar', 'baz']);
  });

  it('should create a tag from the dropdown list of suggested tags', () => {
    const { component } = setup({
      ...defaultProps,
      fieldValue: ['foo'],
      suggestions: ['foo', 'bar', 'baz'],
    });
    component.setState({ autoSuggest: true });
    const suggestedTags = component.find('.tag-suggestions li');
    suggestedTags.first().simulate('click');
    expect(component.state('pageTags')).toEqual(['foo', 'bar']);
  });

  it('should update with new props', () => {
    const { component } = setup({
      ...defaultProps,
      fieldValue: ['foo'],
    });
    expect(component.state('pageTags')).toEqual(['foo']);

    component.setProps({ fieldValue: ['lorem', 'ipsum'] });
    expect(component.state('pageTags')).toEqual(['lorem', 'ipsum']);

    component.setProps({ fieldValue: '' });
    expect(component.state('pageTags')).toEqual([]);
  });
});
