import * as configDuck from '../config';

const reducer = configDuck.default;

describe('Reducers::Config', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      config: {},
      updated: false,
      editorChanged: false,
      fieldChanged: false,
      isFetching: false,
    });
  });

  it('should handle fetchConfig', () => {
    expect(
      reducer(
        {},
        {
          type: configDuck.FETCH_CONFIG_REQUEST,
        }
      )
    ).toEqual({
      isFetching: true,
    });
    expect(
      reducer(
        { isFetching: true },
        {
          type: configDuck.FETCH_CONFIG_SUCCESS,
          config: { title: 'Awesome again' },
        }
      )
    ).toEqual({
      config: {
        title: 'Awesome again',
      },
      isFetching: false,
    });
    expect(
      reducer(
        { isFetching: true },
        {
          type: configDuck.FETCH_CONFIG_FAILURE,
        }
      )
    ).toEqual({
      isFetching: false,
    });
  });

  it('should handle putConfig', () => {
    expect(
      reducer(
        { updated: false },
        {
          type: configDuck.PUT_CONFIG_SUCCESS,
          config: { title: 'Awesome again' },
        }
      )
    ).toEqual({
      config: {
        title: 'Awesome again',
      },
      editorChanged: false,
      updated: true,
    });

    expect(
      reducer(
        {},
        {
          type: configDuck.PUT_CONFIG_FAILURE,
        }
      )
    ).toEqual({
      editorChanged: false,
    });
  });

  it('should handle onEditorChange', () => {
    expect(
      reducer(
        {},
        {
          type: configDuck.CONFIG_EDITOR_CHANGED,
        }
      )
    ).toEqual({
      editorChanged: true,
      updated: false,
    });
    expect(
      reducer(
        { updated: true },
        {
          type: configDuck.CONFIG_EDITOR_CHANGED,
        }
      )
    ).toEqual({
      editorChanged: true,
      updated: false,
    });
  });
});
