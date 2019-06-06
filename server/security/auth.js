const jwt = require('jsonwebtoken');
const { tokenMaxAge, JWT_SECRET } = require('../config');
const { HTTP_STATUS_CODES, ERROR_MESSAGES } = require('../constants');

async function verifyJWTToken(token) {
  try {
    return await jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return error;
  }
}

async function verifyJWT(req, res, next) {
  const token = req.headers.token;
  if (!token) {
    res
      .status(HTTP_STATUS_CODES.UNAUTHORIZED)
      .json({ error: ERROR_MESSAGES.TOKEN_ERROR });
    return;
  }
  try {
    await verifyJWTToken(token);
    next();
  } catch (error) {
    res.json({ error: ERROR_MESSAGES.TOKEN_ERROR });
  }
}

function createJWToken({ data }) {
  return jwt.sign({ data }, JWT_SECRET, { expiresIn: tokenMaxAge, algorithm: 'HS256' });
}

module.exports = { createJWToken, verifyJWT };
