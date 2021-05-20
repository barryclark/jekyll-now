import * as utilsDuck from '../utils';

describe('Actions::Utils', () => {
  it('creates SEARCH_CONTENT', () => {
    const input = 'Finish docs';
    const expectedAction = { type: utilsDuck.SEARCH_CONTENT, input };
    expect(utilsDuck.search(input)).toEqual(expectedAction);
  });

  it('creates VALIDATION_ERROR', () => {
    const errors = {
      title: 'Title is required.',
      draft: 'Should be boolean type.',
    };
    const expectedAction = {
      type: utilsDuck.VALIDATION_ERROR,
      errors,
    };
    expect(utilsDuck.validationError(errors)).toEqual(expectedAction);
  });
});
