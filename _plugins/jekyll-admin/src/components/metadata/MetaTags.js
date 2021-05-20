import React, { Component, PropTypes } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import classnames from 'classnames';

import translations from '../../translations';
const { getDeleteMessage } = translations;

export default class MetaTags extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tagInput: '',
      pageTags: props.fieldValue || [],
      autoSuggest: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { fieldValue } = nextProps;
    this.setState({ pageTags: fieldValue || [] });
  }

  componentDidUpdate() {
    const { nameAttr, updateFieldValue } = this.props;
    updateFieldValue(nameAttr, this.state.pageTags);
  }

  createTag(value) {
    const { pageTags } = this.state;
    const clone = [...pageTags];

    // create tags only if they do not exist already
    if (!clone.includes(value)) {
      clone.push(value);

      this.setState(state => {
        return {
          pageTags: clone,
          tagInput: '',
          autoSuggest: false,
        };
      });
    }
  }

  deleteTag(index) {
    const { pageTags } = this.state;
    const clone = [...pageTags];

    const tagName = index === -1 ? clone.slice(-1).pop() : clone[index];
    const confirm = window.confirm(getDeleteMessage(`tag: ${tagName}`));

    if (confirm) {
      clone.splice(index, 1);
      this.setState({ pageTags: clone });
      this.refs.taginput.focus();
    }
  }

  // keys that when pressed and released creates a new tag from the input value.
  creators = [',', ' ', 'Enter'];

  handleKeyUp = e => {
    const { pageTags } = this.state;
    const input = e.target.value;

    if (input.length && this.creators.includes(e.key)) {
      this.createTag(input);
    } else if (pageTags.length && input.length === 0 && e.key === 'Backspace') {
      this.deleteTag(-1);
    }
  };

  handleOnChange = e => {
    const value = e.target.value;
    this.setState(state => {
      return { tagInput: value };
    });
  };

  showSuggestions = () => {
    this.setState(state => {
      return { autoSuggest: true };
    });
  };

  closeSuggestions = () => {
    this.setState(state => {
      return { autoSuggest: false };
    });
  };

  rectifyTag = tag => {
    const rectified = tag.toString().split(' ');
    this.setState(state => {
      return { pageTags: rectified };
    });
  };

  render() {
    const { pageTags } = this.state;
    const tagInput = `${this.state.tagInput}`;

    const suggestions = this.props.suggestions.filter(entry => {
      return entry.startsWith(tagInput);
    });

    if (!(pageTags instanceof Array)) {
      return (
        <span className="meta-error">
          Expected an array of items. Found: <strong>{pageTags}</strong>
          <br />
          <span onClick={() => this.rectifyTag(pageTags)}>Click here</span>
          to correct.
        </span>
      );
    }

    const tagPool = pageTags.filter(Boolean); // filter out nil or empty elements
    const tags = tagPool.map((tag, i) => {
      return (
        <span key={i} className="tag">
          {tag}
          <span className="delete-tag" onClick={() => this.deleteTag(i)} />
        </span>
      );
    });

    const suggests = suggestions.map((item, i) => {
      if (!pageTags.includes(item)) {
        return (
          <li key={i} onClick={() => this.createTag(item)}>
            {item}
          </li>
        );
      }
      return null;
    }).filter(Boolean);

    const suggestionClasses = classnames('tag-suggestions', {
      visible: this.state.autoSuggest,
    });

    return (
      <div className="tags-wrap field value-field">
        {tags.length > 0 && <div className="tags-list">{tags}</div>}

        <div className="tags-input">
          <input
            type="text"
            onChange={this.handleOnChange}
            onFocus={this.showSuggestions}
            onKeyUp={this.handleKeyUp}
            value={tagInput.replace(/,|\s+/, '')}
            ref="taginput"
          />

          <TextareaAutosize
            className="field value-field"
            value={this.state.pageTags.toString()}
            hidden
          />
        </div>
        {suggests.length > 0 && (
          <div className={suggestionClasses}>
            <ul>{suggests}</ul>
            <div className="close-suggestions" onClick={this.closeSuggestions}>
              Close suggestions
            </div>
          </div>
        )}
      </div>
    );
  }
}

MetaTags.defaultProps = {
  fieldValue: [],
  suggestions: [],
};

MetaTags.propTypes = {
  updateFieldValue: PropTypes.func.isRequired,
  nameAttr: PropTypes.any.isRequired,
  suggestions: PropTypes.array,
  fieldValue: PropTypes.any,
};
