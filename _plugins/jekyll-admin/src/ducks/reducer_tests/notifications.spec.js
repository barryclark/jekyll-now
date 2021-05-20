import * as notificationsDuck from '../notifications';
import { notification } from './fixtures';

const reducer = notificationsDuck.default;

describe('Reducers::Notifications', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      notification: {},
    });
  });

  it('should handle addNotification', () => {
    expect(
      reducer(
        {},
        {
          type: notificationsDuck.ADD_NOTIFICATION,
          notification,
        }
      )
    ).toEqual({
      notification,
    });
  });
});
