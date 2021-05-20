import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import MarkdownEditor from '../MarkdownEditor';
import FilePicker from '../FilePicker';

const props = {
  onChange: f => f,
  onSave: f => f,
  placeholder: 'Test',
  initialValue: '',
};

function setup() {
  const component = mount(<MarkdownEditor {...props} />);
  const { editor } = component.nodes[0];
  return {
    component,
    editor,
    cm: editor.codemirror,
  };
}

describe('Components::MarkdownEditor', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MarkdownEditor {...props} />, div);
  });

  it('allows selecting static-file', () => {
    const { component, cm } = setup();

    component.node._replaceSelectedText = jest.fn();
    cm.replaceSelection = jest.fn();
    cm.setSelection = jest.fn();
    cm.focus = jest.fn();

    const { _replaceSelectedText } = component.node;

    component.find(FilePicker).prop('onPick')('foo.png');
    expect(_replaceSelectedText).lastCalledWith(
      cm,
      ['![', '](#url#)', '![](', '#url#)'],
      "{{ 'foo.png' | relative_url }}"
    );

    component.find(FilePicker).prop('onPick')('bar.txt');
    expect(_replaceSelectedText).lastCalledWith(
      cm,
      ['[', '](#url#)'],
      "{{ 'bar.txt' | relative_url }}"
    );
  });

  it('renders correctly', () => {
    const tree = renderer.create(<MarkdownEditor {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
