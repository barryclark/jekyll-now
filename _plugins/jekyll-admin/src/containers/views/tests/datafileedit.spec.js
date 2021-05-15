import React from 'react';
import { shallow } from 'enzyme';

import { DataFileEdit } from '../DataFileEdit';
import Errors from '../../../components/Errors';
import Button from '../../../components/Button';
import { datafile } from './fixtures';

const defaultProps = {
  datafile,
  updated: false,
  datafileChanged: false,
  fieldChanged: false,
  router: {},
  route: {},
  params: { splat: ['movies', 'actors', 'yml'] },
  errors: [],
  isFetching: false,
};

const setup = (props = defaultProps) => {
  const actions = {
    fetchDataFile: jest.fn(),
    putDataFile: jest.fn(),
    deleteDataFile: jest.fn(),
    onDataFileChanged: jest.fn(),
    clearErrors: jest.fn(),
  };

  const component = shallow(<DataFileEdit {...actions} {...props} />);

  return {
    props,
    actions,
    component,
    saveButton: component.find(Button).first(),
    toggleButton: component.find(Button).at(1),
    deleteButton: component.find(Button).last(),
    errors: component.find(Errors),
  };
};

describe('Containers::DataFileEdit', () => {
  it('should render correctly', () => {
    let { component } = setup({ ...defaultProps, isFetching: true });
    component = setup({ ...defaultProps, datafile: {} }).component;
    expect(component.find('h1').node).toBeTruthy();
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

  it('should call deleteDataFile', () => {
    const { deleteButton, actions } = setup();
    deleteButton.simulate('click');
    expect(actions.deleteDataFile.mock.calls.length).toBe(1);
  });

  it('should recieve updated props', () => {
    const { component } = setup();
    component.setProps({
      params: { splat: ['books', 'authors', 'yml'] },
      updated: true,
    });
    expect(component.instance().props['datafile']['path']).toEqual(
      '_data/books/authors.yml'
    );
  });
});
