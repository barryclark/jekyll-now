import React from 'react';
import { mount } from 'enzyme';

import Errors from '../Errors';

import { errors } from './fixtures';

function setup() {
  let component = mount(<Errors errors={errors} />);

  return {
    component,
    errorItems: component.find('.error-messages > div'),
  };
}

describe('Components::Errors', () => {
  it('should render errors correctly', () => {
    const { errorItems } = setup();
    expect(errorItems.length).toEqual(errors.length);
  });
});
