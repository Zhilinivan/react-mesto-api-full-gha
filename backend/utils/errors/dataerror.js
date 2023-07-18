module.exports = class DataError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 409;
  }
};
