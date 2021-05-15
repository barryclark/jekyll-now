import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'underscore';
import StaticMetaField from '../components/metadata/statics/StaticMetaField';
import MetaField from '../components/metadata/MetaField';
import Icon from '../components/Icon';
import {
  storeContentFields,
  addField,
  removeField,
  updateFieldKey,
  updateFieldValue,
  moveArrayItem,
  convertField,
  enableField,
} from '../ducks/metadata';
import { fetchSiteMeta } from '../ducks/siteMeta';
import { computeFieldType } from '../utils/metadata';

export class MetaFields extends Component {
  componentDidMount() {
    const { storeContentFields, fields, fetchSiteMeta, dataview } = this.props;
    if (!dataview) fetchSiteMeta();
    storeContentFields(fields);
  }

  shouldComponentUpdate(nextProps) {
    return !_.isEqual(nextProps.metadata, this.props.metadata);
  }

  render() {
    const {
      metadata,
      addField,
      enableField,
      removeField,
      updateFieldKey,
      updateFieldValue,
      moveArrayItem,
      convertField,
      key_prefix,
      dataview,
      site,
      staticFields,
    } = this.props;

    let visibleKeys = { ...staticFields, ...metadata };

    if (!dataview) {
      visibleKeys = _.omit(visibleKeys, ['title', 'path', 'raw_content']);
    }

    const metafieldsClass = classnames({
      datafields: dataview,
      metafields: !dataview,
    });

    const defaultFieldsNotOverwritten = _.omit(
      staticFields,
      Object.keys(metadata)
    );

    const metafields = _.map(visibleKeys, (field, key) => {
      const type = computeFieldType(field, key);
      if (defaultFieldsNotOverwritten.hasOwnProperty(key)) {
        return (
          <StaticMetaField
            key={key}
            type={type}
            fieldKey={key}
            fieldValue={field}
            enableField={enableField}
          />
        );
      }

      return (
        <MetaField
          key={key}
          key_prefix={key_prefix}
          type={type}
          parentType="top"
          fieldKey={key}
          fieldValue={field}
          addField={addField}
          removeField={removeField}
          updateFieldKey={updateFieldKey}
          updateFieldValue={updateFieldValue}
          moveArrayItem={moveArrayItem}
          convertField={convertField}
          nameAttr={`metadata['${key}']`}
          namePrefix={`metadata`}
          siteMeta={dataview ? null : site}
          isInDefaultState={defaultFieldsNotOverwritten.hasOwnProperty(key)}
          isDefaultField={staticFields && staticFields.hasOwnProperty(key)}
        />
      );
    });

    const newWrapper = dataview ? (
      <div className="data-new">
        <a onClick={() => addField('metadata')}>
          <Icon name="plus-circle" /> New data field
        </a>
      </div>
    ) : (
      <div className="meta-new">
        <a onClick={() => addField('metadata')} className="tooltip">
          <Icon name="plus-circle" /> New metadata field
          <span className="tooltip-text">
            Metadata will be stored as the <b>YAML front matter</b> within the
            document.
          </span>
        </a>
        <small className="tooltip pull-right">
          <Icon name="info-circle" />
          Special Keys
          <span className="tooltip-text">
            You can use special keys like <b>date</b>, <b>file</b>, <b>image</b>
            , <b>layout</b> or <b>tags</b> for user-friendly functionalities.
          </span>
        </small>
      </div>
    );

    return (
      <div className={metafieldsClass}>
        {metafields}
        {newWrapper}
      </div>
    );
  }
}

MetaFields.propTypes = {
  fields: PropTypes.object.isRequired,
  metadata: PropTypes.object.isRequired,
  key_prefix: PropTypes.string.isRequired,
  storeContentFields: PropTypes.func.isRequired,
  addField: PropTypes.func.isRequired,
  removeField: PropTypes.func.isRequired,
  updateFieldKey: PropTypes.func.isRequired,
  updateFieldValue: PropTypes.func.isRequired,
  moveArrayItem: PropTypes.func.isRequired,
  convertField: PropTypes.func.isRequired,
  fetchSiteMeta: PropTypes.func.isRequired,
  dataview: PropTypes.bool,
  site: PropTypes.object,
  staticFields: PropTypes.object.isRequired,
  enableField: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  metadata: state.metadata.metadata,
  key_prefix: state.metadata.key_prefix,
  site: state.meta.site,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      storeContentFields,
      fetchSiteMeta,
      addField,
      enableField,
      removeField,
      updateFieldKey,
      updateFieldValue,
      moveArrayItem,
      convertField,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(MetaFields);
