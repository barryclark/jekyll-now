import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';

import { Notifications } from '../Notifications';
import { notification } from './fixtures';

describe('Containers::Notification', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Notifications notification={notification} />, div);
  });

  it('renders correctly', () => {
    const tree = renderer
      .create(<Notifications notification={notification} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly after props change', () => {
    const notif = mount(<Notifications notification={notification} />);
    const newNotification = {
      title: 'Test Again',
      message: 'Testing notifications change',
      level: 'success',
    };
    notif.setProps({ notification: newNotification });
    expect(notif.find('.notification-message').text()).toBe(
      'Testing notifications change'
    );
  });
});
