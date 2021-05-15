import React from 'react';
import { mount } from 'enzyme';

import { StaticIndex } from '../StaticIndex';
import { staticfile } from './fixtures';

function setup(files = [staticfile]) {
  const actions = {
    fetchStaticFiles: jest.fn(),
    uploadStaticFiles: jest.fn(),
    deleteStaticFile: jest.fn(),
    search: jest.fn(),
  };

  const props = {
    files,
    isFetching: false,
  };

  const component = mount(<StaticIndex {...props} {...actions} />);

  return {
    actions,
    component,
    info: component.find('.preview-info'),
    previewContainer: component.find('.preview-container'),
  };
}

describe('Containers::StaticIndex', () => {
  it('should render correctly', () => {
    const { info, previewContainer } = setup();
    expect(info.node).toBeFalsy();
    expect(previewContainer.node).toBeTruthy();
  });

  it('should render correctly when there are not any files', () => {
    const { info, previewContainer } = setup([]);
    expect(info.node).toBeTruthy();
    expect(previewContainer.node).toBeFalsy();
  });

  it('should not render elements when isFetching', () => {
    const { component } = setup();
    component.setProps({ files: [], isFetching: true });
    expect(component.find('.content-header').node).toBeFalsy();
  });

  it('should call fetchStaticFiles action after mounted', () => {
    const { actions } = setup();
    expect(actions.fetchStaticFiles).toHaveBeenCalled();
  });
});
