import * as datafilesDuck from '../datafiles';
import { datafile } from './fixtures';

const reducer = datafilesDuck.default;

describe('Reducers::DataFiles', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      files: [],
      currentFile: {},
      isFetching: false,
      updated: false,
      datafileChanged: false,
      fieldChanged: false,
    });
  });

  it('should handle fetchDataFiles', () => {
    expect(
      reducer(
        {},
        {
          type: datafilesDuck.FETCH_DATAFILES_REQUEST,
        }
      )
    ).toEqual({
      isFetching: true,
    });
    expect(
      reducer(
        { isFetching: true },
        {
          type: datafilesDuck.FETCH_DATAFILES_SUCCESS,
          files: [datafile],
        }
      )
    ).toEqual({
      files: [datafile],
      isFetching: false,
      currentFile: {},
    });
    expect(
      reducer(
        { isFetching: true, files: [] },
        {
          type: datafilesDuck.FETCH_DATAFILES_FAILURE,
        }
      )
    ).toEqual({
      files: [],
      isFetching: false,
      currentFile: {},
    });
  });

  it('should handle fetchDataFile', () => {
    expect(
      reducer(
        {},
        {
          type: datafilesDuck.FETCH_DATAFILE_REQUEST,
        }
      )
    ).toEqual({
      isFetching: true,
    });
    expect(
      reducer(
        { isFetching: true },
        {
          type: datafilesDuck.FETCH_DATAFILE_SUCCESS,
          file: datafile,
        }
      )
    ).toEqual({
      currentFile: datafile,
      isFetching: false,
    });
    expect(
      reducer(
        { isFetching: true },
        {
          type: datafilesDuck.FETCH_DATAFILE_FAILURE,
        }
      )
    ).toEqual({
      isFetching: false,
      currentFile: {},
    });
  });

  it('should handle putDataFile', () => {
    expect(
      reducer(
        { updated: false },
        {
          type: datafilesDuck.PUT_DATAFILE_SUCCESS,
          file: datafile,
        }
      )
    ).toEqual({
      currentFile: datafile,
      datafileChanged: false,
      updated: true,
    });
    expect(reducer({ updated: true, datafileChanged: true }, {})).toEqual({
      updated: false,
      datafileChanged: false,
    });
    expect(
      reducer(
        { datafileChanged: true },
        {
          type: datafilesDuck.PUT_DATAFILE_FAILURE,
        }
      )
    ).toEqual({
      datafileChanged: false,
    });
  });

  it('should handle datafileChanged', () => {
    expect(
      reducer(
        { updated: true },
        {
          type: datafilesDuck.DATAFILE_CHANGED,
        }
      )
    ).toEqual({
      datafileChanged: true,
      updated: false,
    });
  });
});
