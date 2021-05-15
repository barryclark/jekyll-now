import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextareaAutosize from 'react-textarea-autosize';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import DropdownList from 'react-widgets/lib/DropdownList';
import moment from 'moment';
import momentLocalizer from 'react-widgets-moment';
import FilePicker from '../FilePicker';
import MetaTags from './MetaTags';
import 'react-widgets/dist/css/react-widgets.css';

momentLocalizer(moment);

export class MetaSimple extends Component {
  handleEditableChange = e => {
    const { nameAttr, updateFieldValue } = this.props;
    updateFieldValue(nameAttr, e.target.value);
  };

  handleDatepickerChange = (date, dateStr) => {
    const { nameAttr, updateFieldValue } = this.props;
    let formatted = moment(date).format('YYYY-MM-DD HH:mm:ss');
    updateFieldValue(nameAttr, formatted);
  };

  handleEditableBlur = e => {
    const { nameAttr, updateFieldValue } = this.props;
    updateFieldValue(nameAttr, e.target.value.trim());
  };

  renderEditable() {
    const { fieldValue } = this.props;
    return (
      <TextareaAutosize
        onChange={this.handleEditableChange}
        onBlur={this.handleEditableBlur}
        className="field value-field"
        value={`${fieldValue}`}
      />
    );
  }

  renderDatepicker() {
    const { fieldValue } = this.props;
    let dateValue = new Date(fieldValue);
    if (`${dateValue}` === 'Invalid Date') dateValue = null;
    return (
      <DateTimePicker
        onChange={this.handleDatepickerChange}
        className="date-field"
        value={dateValue}
      />
    );
  }

  onPickItem = path => {
    const { nameAttr, updateFieldValue } = this.props;
    this.refs.imagepicker.value = path;
    updateFieldValue(nameAttr, path);
  };

  renderStaticFilePicker() {
    const { fieldValue } = this.props;
    return (
      <div className="imagepicker">
        <TextareaAutosize
          onChange={this.handleEditableChange}
          className="field value-field"
          value={fieldValue}
          ref="imagepicker"
        />
        <FilePicker onPick={this.onPickItem} />
      </div>
    );
  }

  handleLayoutChange = value => {
    const { nameAttr, updateFieldValue } = this.props;
    updateFieldValue(nameAttr, value);
  };

  renderLayoutPicker() {
    const { fieldValue, siteMeta } = this.props;

    if (!siteMeta) return this.renderEditable();
    const layouts = siteMeta.layouts || [];

    return (
      <DropdownList
        className="layout-field"
        data={['none', ...layouts]}
        defaultValue={fieldValue}
        onChange={this.handleLayoutChange}
      />
    );
  }

  renderTagsInput(key) {
    const { fieldValue, nameAttr, updateFieldValue, siteMeta } = this.props;
    const suggestions = (siteMeta && siteMeta[key]) || [];

    return (
      <MetaTags
        fieldValue={fieldValue}
        nameAttr={nameAttr}
        updateFieldValue={updateFieldValue}
        suggestions={suggestions}
      />
    );
  }

  render() {
    const { fieldKey, nameAttr } = this.props;

    let node;
    switch (fieldKey) {
      case 'date':
        node = this.renderDatepicker();
        break;
      case 'image':
      case 'file':
        node = this.renderStaticFilePicker();
        break;
      case 'tags':
      case 'categories':
        node = this.renderTagsInput(fieldKey);
        break;
      default:
        node = this.renderEditable();
    }

    if (nameAttr === "metadata['layout']") {
      node = this.renderLayoutPicker();
    }

    return <div className="meta-value">{node}</div>;
  }
}

MetaSimple.propTypes = {
  parentType: PropTypes.string.isRequired,
  fieldKey: PropTypes.string.isRequired,
  fieldValue: PropTypes.any,
  updateFieldValue: PropTypes.func.isRequired,
  nameAttr: PropTypes.any.isRequired,
  siteMeta: PropTypes.object,
};

export default MetaSimple;
