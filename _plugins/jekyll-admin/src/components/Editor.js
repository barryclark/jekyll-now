import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AceEditor from 'react-ace';
import 'brace/mode/json';
import 'brace/mode/yaml';
import 'brace/theme/monokai';

class Editor extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.content !== this.props.content;
  }

  handleChange = () => {
    const { onEditorChange, editorChanged } = this.props;
    !editorChanged && onEditorChange();
  };

  getValue() {
    return this.refs.ace.editor.getValue();
  }

  render() {
    const { content, type } = this.props;
    const mode = /json/i.test(type) ? 'json' : 'yaml';
    return (
      <div>
        <AceEditor
          value={content}
          mode={mode}
          theme="monokai"
          width="100%"
          height="400px"
          showGutter={false}
          showPrintMargin={false}
          highlightActiveLine={false}
          className="config-editor"
          fontSize={14}
          scrollMargin={[15, 15, 15, 15]}
          ref="ace"
          onChange={this.handleChange}
        />
        <div className="statusbar">mode: {mode.toUpperCase()}</div>
      </div>
    );
  }
}

Editor.propTypes = {
  content: PropTypes.any.isRequired,
  onEditorChange: PropTypes.func.isRequired,
  editorChanged: PropTypes.bool.isRequired,
  type: PropTypes.string,
};

export default Editor;
