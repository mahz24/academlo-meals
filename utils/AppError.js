class AppError extends Error {
  constructor(message, statuscode) {
    super(message);

    this.message = message;
    this.statuscode = statuscode;
    this.status = `${statuscode}`.startsWith(4) ? 'error' : 'fail';

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = { AppError };
