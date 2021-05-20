import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SimpleMDE from 'simplemde';
import hljs from '../utils/highlighter';
import FilePicker from './FilePicker';
import { getExtensionFromPath } from '../utils/helpers';

const classNames = [
  'editor-toolbar',
  'CodeMirror',
  'editor-preview-side',
  'editor-statusbar',
];

class MarkdownEditor extends Component {
  componentDidMount() {
    this.create();
    window.hljs = hljs; // TODO: fix this after the next release of SimpleMDE
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.initialValue !== this.props.initialValue;
  }

  componentDidUpdate() {
    this.destroy();
    this.create();
  }

  componentWillUnmount() {
    this.destroy();
  }

  create() {
    const { onChange, onSave } = this.props;
    let opts = Object.create(this.props);
    opts['element'] = this.refs.text;
    opts['autoDownloadFontAwesome'] = false;
    opts['spellChecker'] = false;
    opts['renderingConfig'] = {
      codeSyntaxHighlighting: true,
    };
    opts['insertTexts'] = {
      image: ['![', '](#url#)'],
    };
    let toolbarIcons = [
      'bold',
      'italic',
      'heading',
      '|',
      'code',
      'quote',
      'unordered-list',
      'ordered-list',
      '|',
      'link',
      'image',
      'table',
      {
        name: 'filepicker',
        action: () => this.refs.filepicker.refs.trigger.click(),
        className: 'fa fa-paperclip',
        title: 'Insert Static File',
      },
      '|',
      'preview',
      'side-by-side',
      'fullscreen',
      '|',
    ];
    if (onSave) {
      toolbarIcons.push({
        name: 'save',
        action: onSave,
        className: 'fa fa-floppy-o',
        title: 'Save',
      });
    }
    opts['toolbar'] = toolbarIcons;
    const editor = new SimpleMDE(opts);
    if (editor.codemirror) {
      editor.codemirror.on('change', () => {
        onChange(editor.value());
      });
    }
    this.editor = editor;
  }

  destroy() {
    for (let i in classNames) {
      let elementToRemove = this.refs.container.querySelector(
        '.' + classNames[i]
      );
      elementToRemove && elementToRemove.remove();
    }
  }

  // Adapted from an internal helper function within SimpleMDE package.
  _replaceSelectedText = (cm, headNTail, url) => {
    const startPoint = cm.getCursor('start');
    const endPoint = cm.getCursor('end');
    const text = cm.getSelection();

    let [head, tail] = headNTail;
    if (url) {
      tail = tail.replace('#url#', url);
    }

    cm.replaceSelection(`${head}${text}${tail}`);
    startPoint.ch += head.length;

    if (startPoint !== endPoint) {
      endPoint.ch += head.length;
    }

    cm.setSelection(startPoint, endPoint);
    cm.focus();
  };

  handleFilePick = path => {
    const { codemirror, options } = this.editor;
    const { image, link } = options.insertTexts;
    const url = `{{ '${path}' | relative_url }}`;
    const ext = getExtensionFromPath(path);

    const type = /png|jpg|gif|jpeg|svg|ico/i.test(ext) ? image : link;
    this._replaceSelectedText(codemirror, type, url);
  };

  render() {
    return (
      <div>
        <div style={{ display: 'none' }}>
          <FilePicker ref="filepicker" onPick={this.handleFilePick} />
        </div>
        <div ref="container">
          <textarea ref="text" />
        </div>
      </div>
    );
  }
}

MarkdownEditor.propTypes = {
  initialValue: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default MarkdownEditor;
