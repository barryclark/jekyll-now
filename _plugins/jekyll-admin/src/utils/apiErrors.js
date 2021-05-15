export class BadInputError extends Error {
  constructor(message) {
    super();
    this.name = 'BadInputError';
    this.message = message || 'Bad input';
    this.stack = new Error().stack;
  }
}
