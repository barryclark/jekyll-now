import * as notificationsDuck from '../notifications';

describe('Actions::Notifications', () => {
  it('creates ADD_NOTIFICATION', () => {
    const notification = {
      title: 'Test',
      message: 'Testing notifications',
      level: 'success',
    };
    const expectedAction = {
      type: notificationsDuck.ADD_NOTIFICATION,
      notification,
    };
    expect(
      notificationsDuck.addNotification(
        'Test',
        'Testing notifications',
        'success'
      )
    ).toEqual(expectedAction);
  });
});
