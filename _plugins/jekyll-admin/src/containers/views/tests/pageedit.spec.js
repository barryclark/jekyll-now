import React from 'react';
import { shallow } from 'enzyme';

import { PageEdit } from '../PageEdit';
import Errors from '../../../components/Errors';
import Button from '../../../components/Button';

import { page } from './fixtures';

const defaultProps = {
  page,
  errors: [],
  fieldChanged: false,
  updated: false,
  isFetching: false,
  router: {},
  route: {},
  params: { splat: [null, 'page', 'md'] },
};

const setup = (props = defaultProps) => {
  const actions = {
    fetchPage: jest.fn(),
    putPage: jest.fn(),
    deletePage: jest.fn(),
    updateTitle: jest.fn(),
    updateBody: jest.fn(),
    updatePath: jest.fn(),
    clearErrors: jest.fn(),
  };

  const component = shallow(<PageEdit {...actions} {...props} />);

  return {
    props,
    actions,
    component,
    saveButton: component.find(Button).first(),
    deleteButton: component.find(Button).last(),
    errors: component.find(Errors),
  };
};

describe('Containers::PageEdit', () => {
  it('should render correctly', () => {
    let { component } = setup({ ...defaultProps, isFetching: true });
    component = setup({ ...defaultProps, page: {} }).component;
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

  it('should not call putPage if a field is not changed.', () => {
    const { saveButton, actions } = setup();
    saveButton.simulate('click');
    expect(actions.putPage).not.toHaveBeenCalled();
  });

  it('should call putPage if a field is changed.', () => {
    const { saveButton, actions } = setup({
      ...defaultProps,
      fieldChanged: true,
    });
    saveButton.simulate('click');
    expect(actions.putPage).toHaveBeenCalled();
  });

  it('should call deletePage', () => {
    const { deleteButton, actions } = setup();
    deleteButton.simulate('click');
    expect(actions.deletePage.mock.calls.length).toBe(1);
  });
});
