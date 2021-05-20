import * as utilsDuck from '../utils';
import { page_entries, draft_entries, data_files } from './fixtures';

const reducer = utilsDuck.default;

describe('Reducers::Utils', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      input: '',
      errors: [],
    });
  });

  it('should handle search', () => {
    expect(
      reducer(
        {},
        {
          type: utilsDuck.SEARCH_CONTENT,
          input: 'Some post',
        }
      )
    ).toEqual({
      input: 'Some post',
    });
  });

  it('should validate form', () => {
    expect(
      reducer(
        { errors: ['The title is required'] },
        {
          type: utilsDuck.CLEAR_ERRORS,
        }
      )
    ).toEqual({
      errors: [],
    });
  });

  it('should return error messages', () => {
    expect(
      reducer(
        {},
        {
          type: utilsDuck.VALIDATION_ERROR,
          errors: ['The title is required'],
        }
      )
    ).toEqual({
      errors: ['The title is required'],
    });
  });

  it('should filter files and directories by input', () => {
    expect(utilsDuck.filterBySearchInput(page_entries, 'gsoc').length).toBe(1);

    expect(utilsDuck.filterBySearchInput(draft_entries, '').length).toBe(2);
    expect(utilsDuck.filterBySearchInput(draft_entries, 'post').length).toBe(1);

    expect(utilsDuck.filterBySearchInput(data_files, '').length).toBe(2);
    expect(utilsDuck.filterBySearchInput(data_files, '.yml').length).toBe(1);
  });
});
