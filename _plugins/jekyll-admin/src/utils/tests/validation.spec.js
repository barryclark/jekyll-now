import { validator } from '../validation';

describe('Validation functions:', () => {
  describe('validator', () => {
    it('should not generate error messages if all fields are valid', () => {
      const metadata = {
        title: 'Test Title',
        path: '2016-01-11-awesome-path-test.md',
      };
      const errorMessages = validator(
        metadata,
        {
          path: 'required|date',
          title: 'required',
        },
        {
          'path.required': 'The filename is required.',
          'title.required': 'The title is required.',
        }
      );
      expect(errorMessages).toEqual([]);
    });

    it('should generate error messages if not validated', () => {
      const metadata = {};
      const errorMessages = validator(
        metadata,
        {
          path: 'required',
          title: 'required',
        },
        {
          'path.required': 'The filename is required.',
          'title.required': 'The title is required.',
        }
      );
      expect(errorMessages).toEqual([
        'The filename is required.',
        'The title is required.',
      ]);
    });

    it("should generate an error message if a post's filename does not include date", () => {
      const metadata = {
        path: 'test.md',
      };
      const errorMessages = validator(
        metadata,
        { path: 'required|date' },
        { 'path.date': 'The filename is not valid.' }
      );
      expect(errorMessages).toEqual(['The filename is not valid.']);
    });

    it("should generate an error message if a post's filename does not have a valid date", () => {
      const metadata = {
        path: '2016-33-33-test.md',
      };
      const errorMessages = validator(
        metadata,
        { path: 'required|date' },
        { 'path.date': 'The filename is not valid.' }
      );
      expect(errorMessages).toEqual(['The filename is not valid.']);
    });

    it("should generate an error message if a non-post document's filename does not have an extension", () => {
      const metadata = {
        path: 'test',
      };
      const errorMessages = validator(
        metadata,
        { path: 'required|filename' },
        { 'path.filename': 'The filename is not valid.' }
      );
      expect(errorMessages).toEqual(['The filename is not valid.']);
    });
  });
});
