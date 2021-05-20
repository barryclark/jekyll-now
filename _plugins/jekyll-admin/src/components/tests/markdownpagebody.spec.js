import React from 'react';
import { shallow } from 'enzyme';
import MarkdownPageBody from '../MarkdownPageBody';
import Splitter from '../Splitter';
import InputPath from '../form/InputPath';
import InputTitle from '../form/InputTitle';
import MarkdownEditor from '../MarkdownEditor';
import Metadata from '../../containers/MetaFields';

function setup(props = { type: 'test' }) {
  const actions = {
    updateBody: jest.fn(),
    updatePath: jest.fn(),
    updateTitle: jest.fn(),
    onSave: jest.fn(),
  };

  const component = shallow(<MarkdownPageBody {...props} {...actions} />);
  return {
    component,
    actions,
  };
}

describe('Components::MarkdownPageBody', () => {
  it('renders correctly', () => {
    const { component } = setup();
    expect(component.find('.content-body').node).toBeTruthy();
    expect(component.find(Splitter).node).toBeTruthy();
    expect(component.find(InputPath).node).toBeTruthy();
    expect(component.find(InputTitle).node).toBeTruthy();
    expect(component.find(MarkdownEditor).node).toBeTruthy();
    expect(component.find(Metadata).node).toBeTruthy();
  });
});
