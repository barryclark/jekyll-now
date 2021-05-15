import React from 'react';
import { mount } from 'enzyme';

import FilePreview from '../FilePreview';
import { staticfile } from './fixtures';

function setup(file = staticfile) {
  const actions = {
    onClickDelete: jest.fn(),
    onClick: jest.fn(),
  };

  let component = mount(<FilePreview file={file} splat="" {...actions} />);

  return {
    actions,
    component,
    filename: component.find('.filename'),
    image: component.find('img'),
    div: component.find('.file-preview a div'),
    indicator: component.find('.file-preview .theme-indicator'),
    delete_btn: component.find('.file-preview .delete'),
  };
}

describe('Components::FilePreview', () => {
  it('should render an image if the file has an image extension', () => {
    const { image, div } = setup();
    expect(image.node).toBeTruthy();
    expect(div.node).toBeFalsy();
  });

  it('should render a div if the file does not have an image extension', () => {
    const { image, div } = setup({ ...staticfile, extname: 'html' });
    expect(image.node).toBeFalsy();
    expect(div.node).toBeTruthy();
  });

  it('should render an indicator if file is from theme-gem', () => {
    const { indicator } = setup({ ...staticfile, from_theme: true });
    expect(indicator.node).toBeTruthy();
  });

  it('should not render a delete-button if file is from theme-gem', () => {
    const { delete_btn } = setup({ ...staticfile, from_theme: true });
    expect(delete_btn.node).toBeFalsy();
  });
});
