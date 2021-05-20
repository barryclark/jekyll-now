import {
  toYAML,
  toJSON,
  capitalize,
  toTitleCase,
  slugify,
  existingUploadedFilenames,
  getDocumentTitle,
  getFilenameFromPath,
  getExtensionFromPath,
  trimObject,
} from '../helpers';

describe('Helper functions', () => {
  it('should convert object to YAML string correctly', () => {
    let obj = { title: 'Not an awesome title' };
    let expectedString = 'title: Not an awesome title\n';
    expect(toYAML(obj)).toBe(expectedString);

    obj = {};
    expectedString = '';
    expect(toYAML(obj)).toBe(expectedString);
  });

  it('should convert YAML string to object correctly', () => {
    let yaml = 'title: Not an awesome title';
    let expectedObj = { title: 'Not an awesome title' };
    expect(toJSON(yaml)).toEqual(expectedObj);

    yaml = '';
    expectedObj = {};
    expect(toJSON(yaml)).toEqual(expectedObj);
  });

  it('should capitalize the string correctly', () => {
    let str = 'awesome';
    let expected = 'Awesome';
    let actual = capitalize(str);
    expect(actual).toEqual(expected);

    str = 'Awesome';
    actual = capitalize(str);
    expect(actual).toEqual(expected);

    str = undefined;
    actual = capitalize(str);
    expect(actual).toEqual('');
  });

  it('should titlecase the string correctly', () => {
    let str = 'awesome jekyll';
    let expected = 'Awesome Jekyll';
    let actual = toTitleCase(str);
    expect(actual).toEqual(expected);

    str = 'awesome Jekyll';
    actual = toTitleCase(str);
    expect(actual).toEqual(expected);

    str = undefined;
    actual = toTitleCase(str);
    expect(actual).toEqual('');
  });

  it('should slugify the string correctly', () => {
    let str = 'Awesome Jekyll';
    let expected = 'awesome-jekyll';
    let actual = slugify(str);
    expect(actual).toEqual(expected);

    str = '-This is a test title 1!-';
    expected = 'this-is-a-test-title-1';
    actual = slugify(str);
    expect(actual).toEqual(expected);

    str = "Démonstration par l'exemple‘";
    expected = 'demonstration-par-lexemple';
    actual = slugify(str);
    expect(actual).toEqual(expected);

    str = undefined;
    actual = slugify(str);
    expect(actual).toEqual('');
  });

  it('should return the existing files', () => {
    let currentFiles = [];
    let uploadedFiles = [];
    expect(existingUploadedFilenames(uploadedFiles, currentFiles)).toEqual([]);

    currentFiles = undefined;
    uploadedFiles = undefined;
    expect(existingUploadedFilenames(uploadedFiles, currentFiles)).toEqual([]);

    currentFiles = { foo: 'test' };
    uploadedFiles = [{ name: 'test2.html' }];
    expect(existingUploadedFilenames(uploadedFiles, currentFiles)).toEqual([]);

    currentFiles = [{ path: 'test.html' }, { path: 'logo.png' }];
    uploadedFiles = [{ name: 'test2.html' }];
    expect(existingUploadedFilenames(uploadedFiles, currentFiles)).toEqual([]);

    currentFiles = [{ path: 'test.html' }, { path: 'logo.png' }];
    uploadedFiles = [{ name: 'test.html' }];
    expect(existingUploadedFilenames(uploadedFiles, currentFiles)).toEqual([
      'test.html',
    ]);

    currentFiles = [{ path: 'test.html' }, { path: 'logo.png' }];
    uploadedFiles = [
      { name: 'test.html' },
      { name: 'logo.png' },
      { name: 'logo2.html' },
    ];
    expect(existingUploadedFilenames(uploadedFiles, currentFiles)).toEqual([
      'test.html',
      'logo.png',
    ]);
  });

  it('should return the filename from the given path', () => {
    let path = '';
    let expected = '';
    expect(getFilenameFromPath(path)).toEqual(expected);

    path = 'collections/posts/test.md';
    expected = 'test.md';
    expect(getFilenameFromPath(path)).toEqual(expected);

    path = 'test.md';
    expected = 'test.md';
    expect(getFilenameFromPath(path)).toEqual(expected);
  });

  it('should return the extension from the given path', () => {
    let path = '';
    let expected = '';
    expect(getExtensionFromPath(path)).toEqual(expected);

    path = 'foo.yml';
    expected = 'yml';
    expect(getExtensionFromPath(path)).toEqual(expected);

    path = 'foo/bar.yml';
    expected = 'yml';
    expect(getExtensionFromPath(path)).toEqual(expected);

    path = 'foo/baz';
    expected = '';
    expect(getExtensionFromPath(path)).toEqual(expected);

    path = 'foo/.ignore';
    expected = '';
    expect(getExtensionFromPath(path)).toEqual(expected);
  });

  it('should trim whitespaces in object keys and values', () => {
    let obj = {};
    let expected = {};
    expect(trimObject(obj)).toEqual(expected);

    obj = { ' foo ': ' bar ' };
    expected = { foo: 'bar' };
    expect(trimObject(obj)).toEqual(expected);

    obj = {
      foo: ' 10 ',
      bar: ' false ',
      baz: {
        jekyll: 'true    ',
      },
    };
    expected = {
      foo: 10,
      bar: false,
      baz: {
        jekyll: true,
      },
    };
    expect(trimObject(obj)).toEqual(expected);

    obj = {
      foo: ' a "test" string ',
      'baz ': {
        foo: "this is 'also ' a test string      ",
      },
      bar: 10,
    };
    expected = {
      foo: 'a "test" string',
      baz: {
        foo: "this is 'also ' a test string",
      },
      bar: 10,
    };
    expect(trimObject(obj)).toEqual(expected);
  });

  it('should return a formatted document title string', () => {
    const testData = [
      {
        args: {
          type: undefined,
          splat: undefined,
          prefix: undefined,
        },
        expected: '',
      },
      {
        args: {
          type: 'data files',
          splat: undefined,
          prefix: undefined,
        },
        expected: 'Data Files',
      },
      {
        args: {
          type: 'pages',
          splat: '',
          prefix: undefined,
        },
        expected: 'Pages',
      },
      {
        args: {
          type: 'pages',
          splat: 'foodir',
          prefix: undefined,
        },
        expected: 'foodir | Pages',
      },
      {
        args: {
          type: 'pages',
          splat: 'foo/bar',
          prefix: 'New Page',
        },
        expected: 'New Page | foo/bar | Pages',
      },
    ];
    testData.forEach(entry => {
      const { args, expected } = entry;
      expect(getDocumentTitle(...Object.values(args))).toEqual(expected);
    });
  });
});
