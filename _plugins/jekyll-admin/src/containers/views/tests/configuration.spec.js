import React from 'react';
import { shallow } from 'enzyme';
import Errors from '../../../components/Errors';
import Editor from '../../../components/Editor';
import Button from '../../../components/Button';
import { Configuration } from '../Configuration';
import { config } from './fixtures';

const defaultProps = {
  config,
  editorChanged: false,
  fieldChanged: false,
  errors: [],
  router: {},
  route: {},
  updated: false,
};

const setup = (props = defaultProps) => {
  const actions = {
    clearErrors: jest.fn(),
    onEditorChange: jest.fn(),
    putConfig: jest.fn(),
  };

  const component = shallow(<Configuration {...props} {...actions} />);
  return {
    props,
    actions,
    component,
    editor: component.find(Editor),
    errors: component.find(Errors),
    toggleButton: component.find(Button).first(),
    saveButton: component.find(Button).last(),
  };
};

describe('Containers::Configuration', () => {
  it('should render correctly with initial props', () => {
    const { editor, saveButton } = setup();
    const { raw_content } = config;
    expect(editor.prop('content')).toEqual(raw_content);
    expect(saveButton.prop('active')).toBe(false);
    expect(saveButton.prop('triggered')).toBe(false);
  });

  it('should render correctly with updated props', () => {
    const { saveButton } = setup({
      ...defaultProps,
      editorChanged: true,
      updated: true,
    });
    expect(saveButton.prop('triggered')).toBe(true);
    expect(saveButton.prop('active')).toBe(true);
  });

  it('should not render error messages with initial props', () => {
    const { errors } = setup();
    expect(errors.node).toBeFalsy();
  });

  it('should render error messages when necessary', () => {
    const { errors } = setup({
      ...defaultProps,
      errors: ['The content is required.'],
    });
    expect(errors.node).toBeTruthy();
  });

  it('should not call clearErrors on unmount if there are no errors.', () => {
    const { component, actions } = setup();
    component.unmount();
    expect(actions.clearErrors).not.toHaveBeenCalled();
  });

  it('should clear errors on unmount.', () => {
    const { component, actions } = setup({
      ...defaultProps,
      errors: ['The content is required!'],
    });
    component.unmount();
    expect(actions.clearErrors).toHaveBeenCalled();
  });

  it('should toggle views.', () => {
    const { component, toggleButton } = setup();
    expect(component.state('guiView')).toBe(false);
    toggleButton.simulate('click');
    expect(component.state('guiView')).toBe(true);
  });

  it('should call putConfig if a field is changed.', () => {
    const { saveButton, actions } = setup({
      ...defaultProps,
      fieldChanged: true,
    });
    saveButton.simulate('click');
    expect(actions.putConfig).toHaveBeenCalled();
  });
});
