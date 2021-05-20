import { BadInputError } from '../apiErrors';

describe('BadInputError', () => {
  it('initializes the class', () => {
    const errorMessage = 'Test Error Message';
    const badInputError = new BadInputError(errorMessage);

    expect(badInputError.name).toEqual('BadInputError');
    expect(badInputError.message).toEqual(errorMessage);
  });
});
