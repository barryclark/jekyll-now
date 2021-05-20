import React from 'react';
import { shallow } from 'enzyme';
import Editor from '../Editor';
import { json } from './fixtures';

const content = JSON.stringify(json);

function setup(props = { content, editorChanged: false }) {
  const actions = {
    onEditorChange: jest.fn(),
  };

  let component = shallow(<Editor {...props} {...actions} />);

  return {
    actions,
    component,
    editor: component.find('.config-editor'),
  };
}

describe('Components::Editor', () => {
  it('should render correctly', () => {
    const { editor } = setup();
    expect(editor.prop('value')).toEqual(content);
  });

  it('should call onEditorChange if editor is not changed', () => {
    const { actions, editor } = setup();
    editor.simulate('change');
    expect(actions.onEditorChange).toHaveBeenCalled();
  });

  it('should not call onEditorChange again if editor is already changed', () => {
    const { actions, editor } = setup({ content, editorChanged: true });
    editor.simulate('change');
    expect(actions.onEditorChange).not.toHaveBeenCalled();
  });
});
