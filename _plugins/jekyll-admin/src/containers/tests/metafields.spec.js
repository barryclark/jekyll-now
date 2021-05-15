import React from 'react';
import { mount } from 'enzyme';

import { MetaFields } from '../MetaFields';
import MetaField from '../../components/metadata/MetaField';
import { content } from './fixtures';

const defaultProps = {
  fields: content,
  metadata: content,
  key_prefix: '',
  staticFields: {},
};

const actions = {
  storeContentFields: jest.fn(),
  fetchSiteMeta: jest.fn(),
  addField: jest.fn(),
  removeField: jest.fn(),
  updateFieldKey: jest.fn(),
  updateFieldValue: jest.fn(),
  moveArrayItem: jest.fn(),
  convertField: jest.fn(),
  enableField: jest.fn(),
};

function setup(props = defaultProps) {
  const component = mount(<MetaFields {...props} {...actions} />);

  return {
    actions,
    component,
    addFieldButton: component.find('.meta-new a'),
    addDataFieldButton: component.find('.data-new a'),
    metafields: component.find(MetaField),
  };
}

describe('Containers::MetaFields', () => {
  it('does not call fetchSiteMeta before mount in dataview', () => {
    const { actions } = setup({ ...defaultProps, dataview: true });
    expect(actions.fetchSiteMeta).not.toHaveBeenCalled();
  });

  it('calls fetchSiteMeta before mount', () => {
    const { actions } = setup();
    expect(actions.fetchSiteMeta).toHaveBeenCalled();
  });

  it('calls storeContentFields before mount', () => {
    const { actions } = setup();
    expect(actions.storeContentFields).toHaveBeenCalled();
  });

  it('renders MetaFields correctly', () => {
    let { component, addFieldButton, addDataFieldButton } = setup();

    expect(
      component
        .find('div')
        .first()
        .hasClass('metafields')
    ).toEqual(true);
    expect(addFieldButton.node).toBeTruthy();
    expect(addDataFieldButton.node).not.toBeTruthy();

    const updatedSetup = setup({
      ...defaultProps,
      dataview: true,
    });
    expect(
      updatedSetup.component
        .find('div')
        .first()
        .hasClass('datafields')
    ).toEqual(true);
    expect(updatedSetup.addFieldButton.node).not.toBeTruthy();
    expect(updatedSetup.addDataFieldButton.node).toBeTruthy();

    expect(component.prop('key_prefix')).toBe('');
    expect(component.prop('metadata')).toEqual(content);
  });

  it('calls addField when the button is clicked', () => {
    const { actions, addFieldButton } = setup();
    addFieldButton.simulate('click');
    expect(actions.addField).toHaveBeenCalled();
  });
});
