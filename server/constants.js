const HTTP_STATUS_CODES = {
  OK: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  METHOD_NOT_ALLOWED: 405,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
};

const ERROR_MESSAGES = {
  EMPTY_EMAIL: 'Email is required',
  EMPTY_PASSWORD: 'Password is required',
  INVALID_CREDENTIALS: 'Invalid email or password',
  REGISTRATION_ERROR: 'Error during account creation',
  TOKEN_ERROR: 'Wrong token',
  INTERNAL_SERVER_ERROR: 'Internal server error',
};

module.exports = { HTTP_STATUS_CODES, ERROR_MESSAGES };
