import React from 'react';
import { shallow } from 'enzyme';
import { DataFileNew } from '../DataFileNew';
import Button from '../../../components/Button';
import Editor from '../../../components/Editor';
import Errors from '../../../components/Errors';
import DataGUI from '../../../containers/MetaFields';

const defaultProps = {
  datafile: {},
  updated: false,
  datafileChanged: false,
  fieldChanged: false,
  router: {},
  route: {},
  params: { splat: 'books' },
  errors: [],
};

const setup = (props = defaultProps) => {
  const actions = {
    putDataFile: jest.fn(),
    onDataFileChanged: jest.fn(),
    clearErrors: jest.fn(),
  };

  const component = shallow(<DataFileNew {...actions} {...props} />);

  return {
    props,
    actions,
    component,
    saveButton: component.find(Button).first(),
    toggleButton: component.find(Button).last(),
    editor: component.find(Editor).first(),
    gui: component.find(DataGUI).first(),
    errors: component.find(Errors),
  };
};

describe('Containers::DataFileNew', () => {
  it('should render correctly', () => {
    const { component, toggleButton, saveButton, editor } = setup();
    expect(toggleButton.node.props['type']).toEqual('view-toggle');
    expect(saveButton.node.props['type']).toEqual('create');
    expect(editor.node.props['content']).toEqual('');
    expect(component.state()).toEqual({
      guiView: false,
    });
  });

  it('should not render error messages initially', () => {
    const { errors } = setup();
    expect(errors.node).toBeFalsy();
  });

  it('should render error messages', () => {
    const { errors } = setup({
      ...defaultProps,
      errors: ['The content is required!'],
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

  it('should activate save button when Editor or input field is changed.', () => {
    const { component, saveButton } = setup({
      ...defaultProps,
      datafileChanged: true,
    });
    expect(saveButton.prop('active')).toBe(true);
    component.setState({ guiPath: 'foo', guiView: true });
    expect(saveButton.prop('active')).toBe(true);
  });

  it('should not call putDataFile if a field is not changed.', () => {
    const { saveButton, actions } = setup();
    saveButton.simulate('click');
    expect(actions.putDataFile).not.toHaveBeenCalled();
  });
});
