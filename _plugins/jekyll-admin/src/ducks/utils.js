// Selectors
export const filterBySearchInput = (list, input) => {
  if (!input) {
    return list;
  }
  return list.filter(p => p.name.toLowerCase().includes(input.toLowerCase()));
};

export const filterDeleted = (list, id) => {
  return list.filter(item => item.relative_path !== id);
};

// Action Types
export const SEARCH_CONTENT = 'SEARCH_CONTENT';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';
export const VALIDATION_ERROR = 'VALIDATION_ERROR';

// Actions
export const search = input => ({
  type: SEARCH_CONTENT,
  input,
});

export const clearErrors = () => ({
  type: CLEAR_ERRORS,
});

export const validationError = errors => ({
  type: VALIDATION_ERROR,
  errors,
});

// Reducer
export default function utils(
  state = {
    input: '',
    errors: [],
  },
  action
) {
  switch (action.type) {
    case SEARCH_CONTENT:
      return {
        ...state,
        input: action.input,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        errors: [],
      };
    case VALIDATION_ERROR:
      return {
        ...state,
        errors: action.errors,
      };
    default:
      return {
        ...state,
        input: '',
      };
  }
}
