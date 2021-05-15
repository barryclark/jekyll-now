import React from 'react';
import { shallow } from 'enzyme';

import { DocumentEdit } from '../DocumentEdit';
import Errors from '../../../components/Errors';
import Button from '../../../components/Button';

import { doc } from './fixtures';

const defaultProps = {
  currentDocument: doc,
  errors: [],
  fieldChanged: false,
  updated: false,
  isFetching: false,
  router: {},
  route: {},
  params: { collection_name: 'movies', splat: [null, 'inception', 'md'] },
};

const setup = (props = defaultProps) => {
  const actions = {
    fetchDocument: jest.fn(),
    putDocument: jest.fn(),
    deleteDocument: jest.fn(),
    updateTitle: jest.fn(),
    updateBody: jest.fn(),
    updatePath: jest.fn(),
    clearErrors: jest.fn(),
  };

  const component = shallow(<DocumentEdit {...actions} {...props} />);

  return {
    props,
    actions,
    component,
    saveButton: component.find(Button).first(),
    deleteButton: component.find(Button).last(),
    errors: component.find(Errors),
  };
};

describe('Containers::DocumentEdit', () => {
  it('should render correctly', () => {
    let { component } = setup({
      ...defaultProps,
      isFetching: true,
    });
    component = setup({ ...defaultProps, currentDocument: {} }).component;
    expect(component.find('h1').node).toBeTruthy();
  });

  it('should not render error messages initially', () => {
    const { errors } = setup();
    expect(errors.node).toBeFalsy();
  });

  it('should render error messages', () => {
    const { errors } = setup({
      ...defaultProps,
      errors: ['The title field is required!'],
    });
    expect(errors.node).toBeTruthy();
  });

  it('should not call putDocument if a field is not changed.', () => {
    const { saveButton, actions } = setup();
    saveButton.simulate('click');
    expect(actions.putDocument).not.toHaveBeenCalled();
  });

  it('should call putDocument if a field is changed.', () => {
    const { saveButton, actions } = setup({
      ...defaultProps,
      fieldChanged: true,
    });
    saveButton.simulate('click');
    expect(actions.putDocument).toHaveBeenCalled();
  });

  it('should call deleteDocument', () => {
    const { deleteButton, actions } = setup();
    deleteButton.simulate('click');
    expect(actions.deleteDocument.mock.calls.length).toBe(1);
  });
});
